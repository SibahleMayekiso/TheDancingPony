import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    `postgres://${process.env.POSTGRES_USER!}:${process.env.POSTGRES_PASSWORD!}@localhost:5432/${process.env.POSTGRES_DB!}`
);

sequelize.authenticate().then(() => {
    console.log('Connection to database has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to database:', err);
});

sequelize.sync({ alter: true })
    .then(() => {
        console.log('All models synced successfully');
    })
    .catch((error) => {
        console.error('An error occurred while syncing models:', error);
    });

export default sequelize