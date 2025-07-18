import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

const app = express();
const PORT = process.env.PORT || 3000
connectDB()
connectCloudinary()

app.use(express.json());
app.use(cors());


app.use('/api/admin', adminRouter)
app.get('/', (req, res)=>{
    res.send('API WORKING')
})



app.listen(PORT, ()=>{
    console.log(`Server is listening at PORT: ${PORT}`);
})