const express = require('express')

import * as getController from "../../controllers/notion/getController"
import * as treeController from "../../controllers/notion/treeController"

const NotionRouter = express.Router()

NotionRouter.get('/roots', getController.getRoots)
NotionRouter.get('/:id/children', getController.getPageChildren)
NotionRouter.get('/tree/:type/:id', treeController.getTreeNode)

NotionRouter.get('/block/:id', getController.getBlock)

export default NotionRouter