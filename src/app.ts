import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

// Updated CORS configuration
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://miracle-pilot-project-frontend.vercel.app',
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Miracle pilot project start successfully.');
});

// handle global error
app.use(globalErrorHandler);
app.use(notFound);
export default app;
