const express = require('express')

import { getRoots } from "../../controllers/notion/notionController"

const NotionRouter = express.Router()

NotionRouter.get('/roots', getRoots)

export default NotionRouter