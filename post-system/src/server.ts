import express from 'express';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", postRoutes);
app.use('/posts', commentRoutes);


app.listen(3000, () => console.log('Server is running on port 3000'));