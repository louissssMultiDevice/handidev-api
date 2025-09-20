"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen({ time = 2200 }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), time);
    return () => clearTimeout(t);
  }, [time]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "var(--bg-dark)" }}>
      <div className="w-56 h-56 rounded-2xl relative flex items-center justify-center shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border-4 border-white/5 animate-spin" />
            <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-[color:var(--accent)] rounded-full -translate-x-1/2 -translate-y-1/2 shadow" />
          </div>
        </div>
        <div className="relative z-10 text-center">
          <div className="font-bold">HANDI DEV</div>
          <div className="text-xs text-gray-400">initializing tools…</div>
        </div>
      </div>
    </div>
  );
}
