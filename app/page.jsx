"use client";
import LoadingScreen from "../components/LoadingScreen";
import ThemeToggle from "../components/ThemeToggle";
import NotificationClient from "../components/NotificationClient";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // contoh notifikasi awal (bisa dihilangkan)
    if (typeof window !== "undefined") {
      setTimeout(() => window.hdPushNotif?.("Selamat datang di Handi Dev", 4000), 1200);
    }
  }, []);

  return (
    <>
      <LoadingScreen />
      <NotificationClient />
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-[color:var(--card-dark)] rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Dashboard</div>
                <div className="text-xl font-bold">Handi Dev Tools</div>
              </div>
              <ThemeToggle />
            </div>
            <div className="mt-6 text-sm text-gray-400">Tools aktif:</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>• Email Generator (Emailnator)</li>
              <li>• Auto-verification watcher</li>
              <li>• Integrasi API untuk bot / web</li>
            </ul>
          </div>

          <div className="lg:col-span-2 bg-[color:var(--card-dark)] rounded-2xl p-6">
            <h2 className="text-2xl font-bold">Temporary Gmail</h2>
            <p className="text-sm text-gray-400 mt-1">Generate gmail & pantau link verifikasi.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[color:var(--bg-dark)]/30">
                <div className="text-sm text-gray-400">Gmail</div>
                <div id="gmailBox" className="mt-2 font-mono text-lg break-words">-</div>
              </div>
              <div className="p-4 rounded-xl bg-[color:var(--bg-dark)]/30">
                <div className="text-sm text-gray-400">Link Verifikasi</div>
                <div id="linkBox" className="mt-2 break-words text-sm text-gray-400">Belum ada</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button id="genBtn" className="px-4 py-2 rounded-xl bg-[color:var(--accent)] text-black font-semibold">Buat Gmail</button>
              <button id="watchBtn" className="px-4 py-2 rounded-xl border border-[color:var(--accent)] text-[color:var(--accent)]">Pantau</button>
            </div>

            <div className="mt-6 text-sm text-gray-400">Log</div>
            <div id="log" className="mt-2 h-40 overflow-auto bg-[color:var(--bg-dark)]/20 p-3 rounded-md text-sm"></div>
          </div>
        </div>
      </main>

      <script dangerouslySetInnerHTML={{
        __html: `
        (function(){
          const API_BASE = '';
          const genBtn = document.getElementById('genBtn');
          const watchBtn = document.getElementById('watchBtn');
          const gmailBox = document.getElementById('gmailBox');
          const linkBox = document.getElementById('linkBox');
          const log = document.getElementById('log');

          function pushLog(t){ log.innerHTML = '<div class="text-xs text-gray-400">['+new Date().toLocaleTimeString()+']</div><div>'+t+'</div>' + log.innerHTML }

          async function createGmail(){
            pushLog('memanggil /api/gmail');
            const res = await fetch('/api/gmail');
            const data = await res.json();
            if(data?.gmail){
              gmailBox.innerText = data.gmail;
              linkBox.innerHTML = '<span class="text-gray-400">Menunggu verifikasi...</span>';
              window.hdPushNotif?.('Gmail dibuat: ' + data.gmail, 3500);
              pushLog('gmail dibuat: ' + data.gmail);
            } else {
              pushLog('gagal membuat gmail');
              window.hdPushNotif?.('Gagal membuat gmail', 3000);
            }
          }

          async function checkVerification(){
            const gmail = gmailBox.innerText;
            if(!gmail || gmail === '-' ) return window.hdPushNotif?.('Belum ada gmail', 2000);
            pushLog('cek verification untuk ' + gmail);
            for(let i=0;i<15;i++){
              try{
                const r = await fetch('/api/verification?gmail='+encodeURIComponent(gmail));
                const d = await r.json();
                if(d?.link){
                  linkBox.innerHTML = '<a href="'+d.link+'" target="_blank" class="underline">'+d.link+'</a>';
                  window.hdPushNotif?.('Link verifikasi ditemukan', 3500);
                  pushLog('link ditemukan: ' + d.link);
                  return;
                }
              }catch(e){ pushLog('error cek: '+e.message) }
              await new Promise(r=>setTimeout(r,2000));
            }
            window.hdPushNotif?.('Link verifikasi belum ditemukan', 3500);
            pushLog('link verifikasi tidak ditemukan');
          }

          genBtn.addEventListener('click', createGmail);
          watchBtn.addEventListener('click', checkVerification);
          window.addEventListener('keydown', e => {
            if(e.key.toLowerCase() === 'g') createGmail();
            if(e.key.toLowerCase() === 't') document.querySelector('button[aria-label=\"Toggle theme\"]').click();
          })
        })();
        `}} />
    </>
  );
}
