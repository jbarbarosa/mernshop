import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMIddleware.js'

dotenv.config()
connectDB();

const app = express()
app.get('/', (req, res) => {
  res.send('Hello!')
})

app.use('/api/products', productRoutes);

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV
app.listen(PORT, console.log(`Server running in ${ MODE } mode on port ${PORT}`
.yellow.bold))