import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './configure/Database.js'
import router from './Routes/routes.js'
import cookieParser from 'cookie-parser'
import path from 'path'


const __dirname = path.resolve();

dotenv.config()

const app = express()
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
// app.use(cors({credentials:true,origin:'https://findyourminyan.herokuapp.com'}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extend:true}))

app.use(router)




// app.use(express.static(path.join(__dirname, "./client/build")));
app.use("/", express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});



app.listen(process.env.PORT||5000 , () => {
     console.log(`we are running on ${process.env.PORT||5000}`);
})

try {
    db.authenticate()
    console.log('Database is connected...');
} catch (error) {
    console.log(error);
    
}