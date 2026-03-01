// Kingdom Kids: Bible Adventure - Service Worker
// Enables offline play and asset caching

const CACHE_NAME = 'kingdom-kids-v1.0.0';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

const CDN_ASSETS = [
  'https://cdn.babylonjs.com/babylon.js',
  'https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js',
  'https://cdn.babylonjs.com/gui/babylon.gui.min.js',
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing Kingdom Kids Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      // Cache local assets
      await cache.addAll(STATIC_ASSETS);
      // Try to cache CDN assets (may fail if offline during install)
      try {
        await cache.addAll(CDN_ASSETS);
        console.log('[SW] CDN assets cached!');
      } catch (e) {
        console.log('[SW] CDN caching failed (OK if offline):', e.message);
      }
      console.log('[SW] Static assets cached!');
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating Kingdom Kids Service Worker...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip Firebase and Stripe requests (must be online)
  const url = event.request.url;
  if (url.includes('firebase') || url.includes('stripe') || url.includes('googleapis')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Return cached version
        return cachedResponse;
      }
      
      // Fetch from network and cache
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        
        // Clone and cache successful responses
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          // Only cache same-origin and CDN assets
          if (url.startsWith(self.location.origin) || url.includes('babylonjs.com') || url.includes('cdnjs.cloudflare.com')) {
            cache.put(event.request, responseToCache);
          }
        });
        
        return networkResponse;
      }).catch(() => {
        // Network failed - return offline fallback
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
        return new Response('Offline - check your connection', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'text/plain' },
        });
      });
    })
  );
});

// Message handler for cache management
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SAVE_GAME') {
    // Store game progress in IndexedDB via SW
    console.log('[SW] Game save received');
  }
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync for offline saves
self.addEventListener('sync', event => {
  if (event.tag === 'sync-game-progress') {
    console.log('[SW] Syncing game progress...');
    event.waitUntil(syncGameProgress());
  }
});

async function syncGameProgress() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const savedData = await cache.match('/game-save');
    if (savedData) {
      const data = await savedData.json();
      console.log('[SW] Game progress synced:', data);
    }
  } catch (e) {
    console.error('[SW] Sync failed:', e);
  }
}

console.log('[SW] Kingdom Kids Service Worker loaded! "I can do everything through Christ!" - Phil 4:13');
