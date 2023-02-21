import express from 'express'

const cors = require('cors')
require('dotenv').config()

import NotionRouter from './routes/notion/notionRoutes'

const app = express()
app.use(cors())

app.use('/notion', NotionRouter)

app.listen(3001, () => {
  console.log('Server running on port 3001')
});