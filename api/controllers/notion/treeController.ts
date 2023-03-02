import { Request, Response } from 'express'

import * as notionTree from "../../handlers/notion/notionTree"

export const getTree = async (req: Request, res: Response) => {
  const tree = await notionTree.buildWorkspaceTree()
  res.json(tree)
}

// new method for generating a tree node
export const getTreeNode = async(req: Request, res: Response) => {
  const { id, type } = req.params
  const treeNode = await notionTree.buildTreeNode(id, type)
  res.json(treeNode)
}