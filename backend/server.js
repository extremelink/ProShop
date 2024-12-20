import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleWare.js';

dotenv.config();

const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));


app.get('/', (req, res) => {
    res.send('API is running...')
  })

app.use('/api/products',productRoutes);

app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log("listening on port:",PORT);
})