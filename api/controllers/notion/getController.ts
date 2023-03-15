import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { Request, Response } from 'express'

import * as notionBlocks from '../../handlers/notion/notionBlocks'
import * as notionSearch from "../../handlers/notion/notionSearch"

import { buildTreeNode } from '../../handlers/notion/notionTree'

export const getRoots = async (req: Request, res: Response) => {
  const rootPages = await notionSearch.findAllRootPages()
  res.json(rootPages)
}

export const getPageChildren = async (req: Request, res: Response) => {
  const pageChildren = await notionSearch.findPageChildren(req.params.id)
  res.json(pageChildren)
}

export const getBlock = async (req: Request, res: Response) => {
  const block = await notionBlocks.getBlock(req.params.id) as BlockObjectResponse
  // console.log('b', block)
  const c = await buildTreeNode(block.id, block.type)
  // console.log('c', c)
  res.json(block)
}