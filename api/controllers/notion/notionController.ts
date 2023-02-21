import { Request, Response } from 'express'

import { findAllRootPages } from "../../handlers/notion/notionGet"

export const getRoots = async (req: Request, res: Response) => {
  const rootPages = await findAllRootPages()
  res.json(rootPages)
}