import mongoose from 'mongoose';

let conn =  null;

const uri = process.env.DB_URI;

export const connect = async function() {
  mongoose.set('strictQuery', true);
  if (conn == null) {
    console.log('Creating new connection to the database ...')
    conn = await mongoose.connect(uri, {
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4
    });
    
    return conn;
  }
  console.log('Connection already establish, reuse the connection')

  return conn;
};