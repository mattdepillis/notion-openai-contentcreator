import { Request, Response } from 'express'

import * as notionTree from "../../handlers/notion/notionTree"

export const getTree = async (req: Request, res: Response) => {
  const tree = await notionTree.buildWorkspaceTree()
  res.json(tree)
}