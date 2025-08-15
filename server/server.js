import express from 'express'
import 'dotenv/config'
import connDb from './configs/connectdb.js'
import userRouter from './routes/UserRoute.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT_NUMBER
app.use()

const multipleOrigins = ["http://localhost:5173"]

await connDb(cors({
  origin : multipleOrigins,
  credentials : true
}))



app.use('/api/user' , userRouter )


app.get('/', (req,res)=>{
  res.send("Sever is working fine")
})

app.listen(PORT , ()=>{
  console.log(`Server is Listening On PORT ${PORT} `);
})




