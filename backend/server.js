import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'

import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import notesRoutes from './routes/notesRoutes.js'
import tagsRoutes from './routes/tagsRoutes.js'

import errorMidd from './middlewears/errorMidd.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
if(process.env.MODE === 'development') app.use(morgan('dev'))

app.use('/api/users', userRoutes)
app.use('/api/notes', notesRoutes)
app.use('/api/tags', tagsRoutes)

const __dirname = path.resolve()

if(process.env.MODE === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('notes app API')
    })
}

app.use(errorMidd)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running on ${ PORT }`))