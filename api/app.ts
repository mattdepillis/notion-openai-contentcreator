import express, { Request, Response } from 'express'

const cors = require('cors')
require('dotenv').config()

import { findAllRootPages } from './routes/notion/notionGet'

const app = express()
app.use(cors())

app.get('/', async (req: Request, res: Response) => {
  const allPages = await findAllRootPages()
  const rootPages = allPages.filter(page => page.parent.type === 'workspace')
  console.log(allPages)
  res.json(rootPages)
});

app.listen(3001, () => {
  console.log('Server running on port 3001')
});