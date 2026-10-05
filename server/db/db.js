import { MongoClient } from "mongodb";
import 'dotenv/config'

let client = null;
let db = null;

const mongoUri = process.env.MONGO_URI

export const connectDB = async () => {
    if (db) return db
    try {
        client = new MongoClient(mongoUri)
        await client.connect()

        db = client.db('alert-map')
        console.log('Connected to mongo DB')
        return db
    } catch (error) {
        console.log(`DB connection error: ${error}`)
        process.exit(1)
    }
}

export const getDB = () => {
    if (db) return db
    console.log('You must connect db first')
}