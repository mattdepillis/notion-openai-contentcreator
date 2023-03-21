const express = require('express')

import * as getController from "../../controllers/notion/getController"
import * as treeController from "../../controllers/notion/treeController"
import * as usersController from "../../controllers/notion/usersController"

const NotionRouter = express.Router()

NotionRouter.get('/roots', getController.getRoots)
NotionRouter.get('/:id/children', getController.getPageChildren)
NotionRouter.get('/tree/:type/:id', treeController.getTreeNode)

NotionRouter.get('/block/:id', getController.getBlock)
NotionRouter.get('/users', usersController.getUser)

export default NotionRouter