"use client";
import { useState } from "react";

export default function NotificationClient() {
  const [notifs, setNotifs] = useState([]);

  function push(message, duration = 3500) {
    const id = Date.now();
    setNotifs(s => [{ id, message, duration }, ...s]);
    setTimeout(() => {
      setNotifs(s => s.filter(n => n.id !== id));
    }, duration);
  }

  // expose to window for quick dev usage
  if (typeof window !== "undefined") window.hdPushNotif = push;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-4 z-50 w-[min(880px,92%)] pointer-events-none">
      <div className="space-y-3">
        {notifs.map(n => (
          <div key={n.id} className="pointer-events-auto mx-auto bg-black/80 text-white rounded-xl p-3 shadow-lg overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[color:var(--accent)] flex items-center justify-center font-bold text-black">OK</div>
              <div>
                <div className="font-semibold">{n.message}</div>
                <div className="text-xs text-gray-400">Notifikasi otomatis</div>
                <div className="mt-2 bg-white/10 rounded-full h-1 overflow-hidden">
                  <div className="bg-[color:var(--accent)] h-1 animate-[shrink_3s_linear_forwards]" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
