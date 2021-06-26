import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import contentLength from 'content-length'
import compression from 'compression'

import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import tagsRoutes from './routes/tagsRoutes.js'

import errorMidd from './middlewears/errorMidd.js'

dotenv.config()

connectDB()

const app = express()

// const shouldCompress = (req, res) => {
//     if(req.headers['x-no-comprassion']) {
//         return false
//     } 

//     return compression.filter(req, res)
// }

// app.use(compression({threshold: 5, filter: shouldCompress}))

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('notes app API')
})

app.use('/api/users', userRoutes)
app.use('/api/tags', tagsRoutes)

app.use(errorMidd)



const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running on ${ PORT }`))