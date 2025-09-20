"use client";
import { useState } from "react";

export default function ContactPage(){
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const body = {
      name: form.get('name'),
      email: form.get('email'),
      message: form.get('message')
    }
    try{
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if(data.success) setSent(true);
    }catch(err){
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-[color:var(--card-dark)] rounded-2xl p-6">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="text-sm text-gray-400 mt-1">Kirim pesan ke Handi Dev</p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input name="name" required placeholder="Nama" className="w-full p-3 rounded-md bg-[color:var(--bg-dark)]/20" />
            <input name="email" type="email" required placeholder="Email" className="w-full p-3 rounded-md bg-[color:var(--bg-dark)]/20" />
            <textarea name="message" required placeholder="Pesan" className="w-full p-3 rounded-md bg-[color:var(--bg-dark)]/20 h-32"></textarea>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-[color:var(--accent)] rounded-xl text-black">Kirim</button>
              {loading && <div className="text-sm text-gray-400">Mengirim...</div>}
            </div>
          </form>
        ) : (
          <div className="mt-6 text-green-400 font-semibold">✅ Pesan terkirim. Terima kasih!</div>
        )}
      </div>
    </main>
  );
}
