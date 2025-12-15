// server.js (ESM)
import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import fs from 'fs-extra'

const app = express()
const PORT = 3000
const JWT_SECRET = 'super-secret-key'
const DB_FILE = './db.json'

app.use(cors())

app.use(express.json())

// ✅ JWT login
app.post('/login', (req, res) => {
  const { username = 'guest' } = req.body
  //verifica daca exista
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' })
  res.json({ token })
})

// ✅ JWT guard middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Token required' })

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' })
    req.user = user
    next()
  })
}
// ✅ JSON store read/write
async function readFavorites() {
  const db = await fs.readJson(DB_FILE).catch(() => ({ favorites: [] }))
  return db.favorites || []
}

async function writeFavorites(favorites) {
  await fs.writeJson(DB_FILE, { favorites }, { spaces: 2 })
}

// ✅ GET all favorites
app.get('/favorites', authenticateToken, async (req, res) => {
  try {
    const favorites = await readFavorites()

    res.json(favorites)
  } catch {
    res.status(500).json({ error: 'Failed to read favorites' })
  }
})

// ✅ GET one favorite by ID
app.get('/favorites/:id', authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  try {
    const favorites = await readFavorites()
    const item = favorites.find(fav => fav.id === id)

    if (!item) {
      return res.status(404).json({ error: 'Favorite not found' })
    }

    res.json(item)
  } catch (err) {
    console.error('[ERROR] Failed to fetch favorite by ID:', err)
    res.status(500).json({ error: 'Failed to fetch favorite' })
  }
})

// ✅ POST new favorite (typed like SearchResult)
app.post('/favorites', authenticateToken, async (req, res) => {
  const data = req.body

  // console.log('POST DATA', data)
  // ✅ Validate required fields from SearchResult
  const requiredFields = [
    'adult', 'backdrop_path', 'id', 'original_title',
    'release_date', 'poster_path', 'popularity',
    'title', 'vote_average', 'vote_count'
  ]

  const missing = requiredFields.filter(field => !(field in data))

  if (missing.length > 0) {
    return res.status(400).json({ error: `Missing fields: ${missing.join(', ')}` })
  }

  try {
    const favorites = await readFavorites()

    // Check for duplicates by `id`
    const exists = favorites.some(item => item.id === data.id)
    if (exists) {
      return res.status(409).json({ error: 'Movie already in favorites' })
    }

    favorites.push({ ...data, addedBy: req.user.username })
    await writeFavorites(favorites)

    res.status(200).json({ message: 'Favorite added' })
  } catch {
    res.status(500).json({ error: 'Failed to save favorite' })
  }
})

// ✅ DELETE by ID
app.delete('/favorites/:id', authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' })

  try {
    const favorites = await readFavorites()
  console.log('!!!!!!', id,  favorites)
    const updated = favorites.filter(item => item.id !== id)

    if (updated.length === favorites.length) {
      return res.status(404).json({ error: 'Favorite not found' })
    }

    await writeFavorites(updated)
    res.json({ message: `Favorite ${id} removed` })
  } catch {
    res.status(500).json({ error: 'Failed to delete favorite' })
  }
})


// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})