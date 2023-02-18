import express, { Request, Response } from 'express'

const cors = require('cors')
require('dotenv').config()

import { findAllRootPages } from './routes/notion/notionGet'

const app = express()
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  const allPages = findAllRootPages()
  res.json(allPages)
  // res.json('hello world from server!')
});

app.listen(3001, () => {
  console.log('Server running on port 3001')
});