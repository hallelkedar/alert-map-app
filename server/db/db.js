import { MongoClient } from "mongodb";
import 'dotenv/config'

let client = null;
let db = null;

export const connectDB = async () => {
  if (db) return db;
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("uri is missing from .env");

    client = new MongoClient(uri);
    await client.connect();

    db = client.db("alerts-map");
    console.log("Mongo DB connected successfully.");
    return db
  } catch (error) {
    console.log(`DB connection error: ${error}`);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("db is not connected yet.");
  }
  return db;
};
