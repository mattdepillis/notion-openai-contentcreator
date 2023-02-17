import express, { Request, Response } from 'express';
import { logMessage } from "./routes/test"

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log(`additional content: ${logMessage}`)
});