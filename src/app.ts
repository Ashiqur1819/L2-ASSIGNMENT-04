import express, { Application } from 'express';
import { authRouter } from './modules/auth/auth.route';
import cookieParser from 'cookie-parser';
import { technicianProfileRouter } from './modules/technicianProfile/technicianProfile.route';
import { categoryRouter } from './modules/category/category.route';
import { serviceRouter } from './modules/service/service.route';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/technician-profile", technicianProfileRouter);
app.use("/api/categories", categoryRouter)
app.use("/api/services", serviceRouter);

export default app;

