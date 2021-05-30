import mongoose from 'mongoose'

const connectDB = async () => {

    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })

        console.log(`mongoDb connected: ${connection.connection.host}`)
    } catch(err) {
        console.error(`error ${err}`)
        process.exit(1)
    }
}

export default connectDB

