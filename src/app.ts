import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { checkAvailabilityRoutes } from './app/modules/checkAvaility/checkAbailabity.route';
import { paymentRoutes } from './app/modules/payment/payment.routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api', router);
app.use('/api', checkAvailabilityRoutes);
app.use('/api', paymentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send(`
      <html>
        <head>
          <title>Sport Facility Booking Server</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .content {
              text-align: justify;
              font-size: 36px;
              width: 80%; 
            }
          </style>
        </head>
        <body>
          <div class="content">
            Boom💥💥💥!! Sport facility Booking Server is running... ... ...
          </div>
        </body>
      </html>
    `);
});

app.use(globalErrorHandler);

// not found route error
app.use(notFound);

export default app;
