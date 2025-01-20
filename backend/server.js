import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleWare.js';
import cookieParser from 'cookie-parser';
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config();

const PORT = process.env.PORT;

connectDB();

const app = express();

// middleware for parsing body data!
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Cookie parser middleware
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:3000'
}));


app.get('/', (req, res) => {
    res.send('API is running...')
  })

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes)
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal',(req,res)=>res.send({clientId:process.env.PAYPAL_CLIENT_ID}))

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log("listening on port:",PORT);
})