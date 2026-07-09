import express, { Application } from 'express';
import { authRouter } from './modules/auth/auth.route';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRouter);

export default app;

