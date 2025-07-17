import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';

const app = express();
const PORT = process.env.PORT || 3000
connectDB()

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('API WORKING')
})



app.listen(PORT, ()=>{
    console.log(`Server is listening at PORT: ${PORT}`);
})