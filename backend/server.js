import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import errorMidd from './middlewears/errorMidd.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('notes app API')
})
app.use('/users', userRoutes)

app.use(errorMidd)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running on ${ PORT }`))