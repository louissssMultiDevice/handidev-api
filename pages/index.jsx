import React, { useState, useEffect } from 'react'

// HandiDev - Super Duper API Portal (single-file React component) // Tailwind CSS assumed available in host project. // Default export component

export default function HandiDevAPIPortal() { const [status, setStatus] = useState(null) const [loadingStatus, setLoadingStatus] = useState(false) const [selectedEndpoint, setSelectedEndpoint] = useState('status') const [apiKey, setApiKey] = useState('DitssGanteng') const [requestResult, setRequestResult] = useState(null) const [requestLoading, setRequestLoading] = useState(false) const [payload, setPayload] = useState('') const [log, setLog] = useState([]) const [theme, setTheme] = useState('dark')

const endpoints = { status: { method: 'GET', path: '/api/status', desc: 'Check global API health' }, createPayment: { method: 'GET', path: '/orderkuota/createpayment', desc: 'Create a payment (QRIS/Dana/GoPay etc)' }, cekStatus: { method: 'GET', path: '/orderkuota/cekstatus', desc: 'Check payment status' }, tts: { method: 'GET', path: '/TextToSpeech/nami', desc: 'Quick TTS demo (text -> audio)' }, game: { method: 'GET', path: '/api/game/susunkata', desc: 'Game demo endpoints' } }

useEffect(() => { if (theme === 'dark') document.documentElement.classList.add('dark') else document.documentElement.classList.remove('dark') }, [theme])

async function fetchStatus() { setLoadingStatus(true) try { const res = await fetch('https://api-ditss.vercel.app/api/status') const j = await res.json() setStatus(j) pushLog('Fetched /api/status') } catch (e) { setStatus({ error: String(e) }) pushLog('Status check failed') } finally { setLoadingStatus(false) } }

useEffect(() => { fetchStatus() }, [])

function pushLog(text) { setLog(prev => [{ t: new Date().toLocaleTimeString(), m: text }, ...prev].slice(0, 30)) }

async function runRequest() { setRequestResult(null) setRequestLoading(true) setRequestResult(null) pushLog(Request -> ${selectedEndpoint}) try { const ep = endpoints[selectedEndpoint] // build url quickly, allow user to craft query in payload textbox let base = 'https://api-ditss.vercel.app' let url = base + ep.path if (payload.trim()) { // if payload appears to be querystring, use it, else append ?text=... if (payload.includes('=')) url += '?' + payload else url += '?' + payload } else { // append apikey url += ?apikey=${encodeURIComponent(apiKey)} }

const response = await fetch(url)
  const json = await response.json()
  setRequestResult({ url, json })
  pushLog(`OK ${selectedEndpoint}`)
} catch (e) {
  setRequestResult({ error: String(e) })
  pushLog(`ERR ${selectedEndpoint}`)
} finally {
  setRequestLoading(false)
}

}

function pretty(obj) { try { return JSON.stringify(obj, null, 2) } catch { return String(obj) } }

return ( <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-gray-100 p-6"> <div className="max-w-6xl mx-auto"> <header className="flex items-center justify-between mb-6"> <div className="flex items-center gap-4"> <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-yellow-400 rounded-xl flex items-center justify-center shadow-2xl"> <span className="font-black text-2xl text-white">HD</span> </div> <div> <h1 className="text-2xl font-extrabold">HandiDev API Portal — Level Dewa</h1> <p className="text-sm opacity-80">Interaktif, realtime, TTS-ready, payment & game explorer</p> </div> </div>

<div className="flex items-center gap-3">
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20">Theme</button>
        <a className="px-3 py-2 rounded-md bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold" href="#try">Try Now</a>
      </div>
    </header>

    <main className="grid grid-cols-12 gap-6">
      <section className="col-span-12 lg:col-span-5 bg-black/40 rounded-2xl p-5 shadow-xl">
        <h2 className="text-xl font-bold mb-3">Status & Health</h2>
        <div className="flex gap-3 items-center mb-4">
          <button onClick={fetchStatus} className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700">Refresh</button>
          <div className="text-sm opacity-80">Live check: <strong className="ml-2">{loadingStatus ? 'Checking...' : (status?.status ? status.result?.status || 'OK' : 'Unknown')}</strong></div>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl bg-white/5 p-3 font-mono text-xs">
            {status ? <pre className="whitespace-pre-wrap">{pretty(status)}</pre> : <div className="opacity-70">No status yet — click Refresh</div>}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-white/5 rounded">API Uptime: <strong>{status?.result?.runtime || '-'}</strong></div>
            <div className="p-3 bg-white/5 rounded">Requests: <strong>{status?.result?.totalrequest || '-'}</strong></div>
            <div className="p-3 bg-white/5 rounded">Fitur: <strong>{status?.result?.totalfitur || '-'}</strong></div>
            <div className="p-3 bg-white/5 rounded">IP: <strong>{status?.result?.ip_address || '-'}</strong></div>
          </div>

          <div className="mt-3 p-3 bg-gradient-to-br from-pink-600 to-purple-600 rounded-lg shadow-lg">
            <h3 className="font-semibold">Quick Actions</h3>
            <div className="flex gap-2 mt-2">
              <button onClick={() => { setSelectedEndpoint('status'); setPayload('apikey=' + apiKey) }} className="px-3 py-2 bg-white/10 rounded">/api/status</button>
              <button onClick={() => { setSelectedEndpoint('tts'); setPayload('text=Halo%20Handi') }} className="px-3 py-2 bg-white/10 rounded">TTS Demo</button>
              <button onClick={() => { setSelectedEndpoint('createPayment'); setPayload('amount=15000') }} className="px-3 py-2 bg-white/10 rounded">CreatePayment</button>
            </div>
          </div>
        </div>
      </section>

      <section className="col-span-12 lg:col-span-7 bg-black/40 rounded-2xl p-5 shadow-xl">
        <h2 className="text-xl font-bold mb-3">API Explorer — Try endpoints</h2>

        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1">
            <label className="text-xs opacity-80">Select Endpoint</label>
            <select value={selectedEndpoint} onChange={(e) => setSelectedEndpoint(e.target.value)} className="w-full mt-2 p-3 rounded bg-white/5">
              {Object.keys(endpoints).map(k => (
                <option key={k} value={k}>{endpoints[k].path} — {endpoints[k].desc}</option>
              ))}
            </select>
          </div>

          <div className="w-48">
            <label className="text-xs opacity-80">API Key</label>
            <input value={apiKey} onChange={e => setApiKey(e.target.value)} className="mt-2 w-full p-3 rounded bg-white/5" />
          </div>
        </div>

        <label className="text-xs opacity-80">Query / Payload (simple querystring)</label>
        <input placeholder="e.g. apikey=DitssGanteng&amount=15000" value={payload} onChange={e => setPayload(e.target.value)} className="mt-2 w-full p-3 rounded bg-white/5 font-mono text-sm" />

        <div className="flex items-center gap-3 mt-3">
          <button id="try" onClick={runRequest} className="px-4 py-2 rounded bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold">Run Request</button>
          <button onClick={() => { setRequestResult(null); setPayload('') }} className="px-3 py-2 rounded bg-white/10">Reset</button>
          <div className="ml-auto text-sm opacity-80">Logs: <strong>{log.length}</strong></div>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 p-3 rounded-lg font-mono text-sm overflow-auto max-h-64">
            <h3 className="font-semibold mb-2">Request Result</h3>
            {requestLoading ? <div>Loading...</div> : (
              requestResult ? (
                <>
                  <div className="text-xs opacity-80 mb-2">URL: {requestResult.url}</div>
                  <pre className="whitespace-pre-wrap text-xs">{pretty(requestResult.json)}</pre>
                </>
              ) : <div className="opacity-60">No result yet — try Run Request</div>
            )}
          </div>

          <div className="bg-white/5 p-3 rounded-lg font-mono text-sm">
            <h3 className="font-semibold mb-2">TTS Preview & Player</h3>
            <p className="text-sm opacity-80">Quick TTS demo (api-ditss TTS)</p>
            <div className="mt-3 flex gap-2">
              <input placeholder="Type text to speak" className="flex-1 p-2 rounded bg-white/10 text-sm" id="ttstext" />
              <button className="px-3 py-2 rounded bg-indigo-600" onClick={() => {
                const v = document.getElementById('ttstext').value || 'Halo Handi Dev'
                const u = `https://api-ditss.vercel.app/TextToSpeech/nami?text=${encodeURIComponent(v)}`
                const audio = new Audio(u)
                audio.play()
                pushLog('TTS played')
              }}>Play</button>
            </div>

            <div className="mt-4">
              <h4 className="font-medium">Recent Logs</h4>
              <ul className="text-xs mt-2 space-y-1 opacity-80">
                {log.map(l => (<li key={l.t}><strong>{l.t}</strong> — {l.m}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="col-span-12 bg-gradient-to-br from-slate-900/60 to-black/30 rounded-2xl p-5 mt-4">
        <h3 className="font-bold text-lg mb-3">Endpoint Showcase — Fantastical & Interactive</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {Object.keys(endpoints).map(k => (
            <div key={k} className="p-4 rounded-lg bg-gradient-to-br from-purple-800 to-indigo-800 border border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-80">{endpoints[k].method}</div>
                  <div className="font-semibold">{endpoints[k].path}</div>
                </div>
                <button onClick={() => { setSelectedEndpoint(k); document.getElementById('ttstext').value = ''; pushLog(`picked ${k}`) }} className="px-2 py-1 bg-white/10 rounded">Use</button>
              </div>
              <p className="text-xs opacity-70 mt-3">{endpoints[k].desc}</p>
            </div>
          ))}
        </div>
      </section>

    </main>

    <footer className="mt-8 text-center text-sm opacity-80">© {new Date().getFullYear()} HandiDev • Built with ⚡ fantasy & a bit of chaos</footer>
  </div>
</div>

) }

