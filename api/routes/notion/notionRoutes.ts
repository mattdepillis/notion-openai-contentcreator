const express = require('express')

import * as getController from "../../controllers/notion/getController"
import * as treeController from "../../controllers/notion/treeController"

const NotionRouter = express.Router()

NotionRouter.get('/roots', getController.getRoots)
NotionRouter.get('/:id/children', getController.getPageChildren)
NotionRouter.get('/tree', treeController.getTree)
NotionRouter.get('/tree/:type/:id', treeController.getTreeNode)

export default NotionRouter