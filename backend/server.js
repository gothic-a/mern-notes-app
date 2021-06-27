import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import notesRoutes from './routes/notesRoutes.js'
import tagsRoutes from './routes/tagsRoutes.js'

import errorMidd from './middlewears/errorMidd.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('notes app API')
})

app.use('/api/users', userRoutes)
app.use('/api/notes', notesRoutes)
app.use('/api/tags', tagsRoutes)

app.use(errorMidd)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running on ${ PORT }`))