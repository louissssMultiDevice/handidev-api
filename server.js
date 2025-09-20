const express = require('express')
const cors = require('cors')
const EmailFetcher = require('./emailFetcher')

const app = express()
const emailFetcher = new EmailFetcher()

app.use(cors())
app.use(express.json())

// Endpoint ambil email baru
app.get('/api/gmail', async (req, res) => {
  try {
    const gmail = await emailFetcher.getGmail()
    if (!gmail) return res.status(500).json({ error: 'Gagal membuat Gmail' })
    res.json({ gmail })
  } catch (err) {
    console.error('Error getGmail:', err)
    res.status(500).json({ error: 'Terjadi kesalahan server' })
  }
})

// Endpoint ambil link verifikasi
app.get('/api/verification', async (req, res) => {
  try {
    const { gmail } = req.query
    if (!gmail) return res.status(400).json({ error: 'Email tidak diberikan' })

    const link = await emailFetcher.getVerificationLink(gmail)
    res.json({ link: link || null })
  } catch (err) {
    console.error('Error getVerification:', err)
    res.status(500).json({ error: 'Terjadi kesalahan server' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 Server berjalan di http://localhost:${PORT}`))
