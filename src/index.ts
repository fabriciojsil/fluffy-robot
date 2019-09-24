import dotenv from 'dotenv';
import express from 'express';
import { Routes } from './routes/routes';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

const routes = new Routes(app);
routes.initRoutes();

app.listen(Number(port), (err: Error) => {
  if (err) console.error('opss', err);
  console.log(`Application running http://localhost:${port}`);
});
