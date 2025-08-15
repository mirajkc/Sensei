import mongoose from "mongoose";
import 'dotenv/config'

const connDb = async() =>{
  try {
    mongoose.connection.on('connected', ()=>console.log("Database is connected"))
    await mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}/sensei`)
  } catch (error) {
    console.log("Error Occured While Connecting To The Databse",  error.message);
  }
}
export default connDb
