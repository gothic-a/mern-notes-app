import express from 'express'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.get('/', (req, res) => {
    res.send('notes app API')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`port running on ${ PORT }`))