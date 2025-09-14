// index.js
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api', require('./routes/routes/appointmentRoutes'))
app.use('/api', require('./routes/siteRoutes'))

app.get('/', (req, res) => {
    res.send('سلام! سرور در حال اجراست.')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`🚀 سرور در http://localhost:${PORT} فعال شد`)
})