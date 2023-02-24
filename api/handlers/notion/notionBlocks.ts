import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

import { notion } from "../../utils/notionClient"
import { retrievePage } from "../../handlers/notion/notionPages"
import { retrieveDatabase } from "./notionDatabases"

// retrieves all child blocks for a given parent block with the notion api
export const getChildBlocks = async(blockId: string, pageSize?: number) =>
  await notion.blocks.children.list({
    block_id: blockId,
    page_size: pageSize
  })

// gets all child blocks and returns just child pages and dbs for tree construction
export const getTreeNodeChildBlocks = async (blockId: string) => {
  const childBlocks = await getChildBlocks(blockId)
    .then(allBlocks => allBlocks.results as BlockObjectResponse[])
    .then(blockObjs => blockObjs.filter(
      block => block.type === "child_page" || block.type === "child_database"
    ))
  return childBlocks
}

export const getChildBlock = async (blockType: string, blockId: string) =>
  blockType === "child_page"
    ? await retrievePage(blockId)
    : await retrieveDatabase(blockId)