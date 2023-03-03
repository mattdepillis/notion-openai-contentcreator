import { Request, Response } from 'express'

import * as notionTree from "../../handlers/notion/notionTree"

// new method for generating a tree node
export const getTreeNode = async(req: Request, res: Response) => {
  const { id, type } = req.params
  const treeNode = await notionTree.buildTreeNode(id, type)
  res.json(treeNode)
}