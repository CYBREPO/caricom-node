import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connrctionstring = process.env.mongodb
if (!connrctionstring) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }
  
  /**
   * Global is used here to maintain a cached connection across hot reloads
   * in development. This prevents connections growing exponentially
   * during API Route usage.
   */
  let cached = global.mongoose;
  
  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }
  
  const dbConnect = async () => {
    try {
      
      if (cached.conn) {
        
        return cached.conn;
      }
      
      if (!cached.promise) {
        const opts = {
          bufferCommands: false,
        };
  
        cached.promise =  mongoose.connect(connrctionstring,opts).then((mongoose) => {
            return mongoose;
        });
      }
      cached.conn = await cached.promise;
      console.log(cached.conn.connection.host)
    }
    catch (ex) {
    }
  
    return cached.conn;
  }

export default dbConnect;