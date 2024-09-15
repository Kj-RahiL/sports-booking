import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
const port = 3000
const app:Application = express()

// parsers
app.use(express.json())
app.use(cors())


app.use('api/v1', router)

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
  
  

export default app