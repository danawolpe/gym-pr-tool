// Minimal service worker: lets the diary show system notifications on mobile
// and reopens the diary when a notification is tapped.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const open = all.find(c => c.url.includes('diary.html'));
    if (open) return open.focus();
    return self.clients.openWindow('diary.html');
  })());
});
