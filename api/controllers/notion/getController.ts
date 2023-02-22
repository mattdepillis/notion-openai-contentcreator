import { Request, Response } from 'express'

import * as notionSearch from "../../handlers/notion/notionSearch"

export const getRoots = async (req: Request, res: Response) => {
  const rootPages = await notionSearch.findAllRootPages()
  res.json(rootPages)
}

export const getPageChildren = async (req: Request, res: Response) => {
  const pageChildren = await notionSearch.findPageChildren(req.params.id)
  res.json(pageChildren)
}