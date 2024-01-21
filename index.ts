import express from 'express';
import dotenv from 'dotenv';
import { initUser } from './models/User';
import { initDish } from './models/Dish';
import { initRating } from './models/Rating';
import userRoutes from './routes/UserRoutes'

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3001;

initUser();
initDish();
initRating();

app.use(express.json());
app.use(userRoutes)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
