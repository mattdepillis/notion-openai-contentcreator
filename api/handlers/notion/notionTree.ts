import * as notionBlocks from '../../handlers/notion/notionBlocks'
import * as notionDatabases from '../../handlers/notion/notionDatabases'
import * as notionPages from '../../handlers/notion/notionPages'
import * as notionSearch from '../../handlers/notion/notionSearch'

import { Child, Node } from '../../types/notion/notionApiResponses'
import { IconProperty, TitleProperty } from '../../types/notion/pageProperties'
import { NodeChild, TreeNode } from '../../types/notion/Nodes'
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

/**
 * 
 */
const formatNodeTitle = (node: Node): string => {
  const icon = (node.icon as IconProperty)
  const emoji = icon && (icon.emoji + " ") || ''

  const title = node.object === "page" ?
    (node.properties.title || node.properties["Title"]) ?
      (node.properties.title) ?
        (node.properties.title as TitleProperty).title[0].plain_text
        : (node.properties["Title"] as TitleProperty).title[0].plain_text
      : ""
    : node.title[0].plain_text

  return `${emoji}${title}`
}

/**
 * 
 */
const recurseToFindChildren = async (blockId: string, validChildren: Child[]) : Promise<Child[]> => {

  const children = (await notionBlocks.getChildBlocks(blockId)).results as BlockObjectResponse[]

  for (let child of children) {
    if (child.type === "column" || child.type === "column_list") {
      await recurseToFindChildren(child.id, validChildren)
    } else if (child.type === "child_page" || child.type === "child_database") {
      validChildren.push(child as Child)
    }
  }
  return validChildren
}

const modifyType = (type: string): string =>
  type === "child_page"
    ? "page"
    : "database"

/**
 * 
 */
const getChildAsFullBlock = async (child: BlockObjectResponse) : Promise<NodeChild[]> => {
  if (child.type === "column_list") {
    const nestedChildren = await recurseToFindChildren(child.id, [])
    return nestedChildren.map((nestedChild: Child) =>
      ({ id: nestedChild.id, type: modifyType(nestedChild.type) }) as NodeChild
    )
  }
  return [{ id: child.id, type: modifyType(child.type) }] as NodeChild[]
}

/**
 * 
*/
const getDatabaseEntries = async(databaseId: string): Promise<NodeChild[]> => {
  const dbContents = (await notionDatabases.queryDatabase(databaseId)).results
    .filter(item => item.object === "page") as PageObjectResponse[]

  return dbContents.map(dbChild => ({ id: dbChild.id, type: dbChild.object })) as NodeChild[]
}

/**
 * 
*/
// TODO: figure out why certain page titles aren't properly returned (do they even have them?)
const getNodeChildren = async (node: TreeNode) : Promise<NodeChild[]> => {
  let children: NodeChild[]

  if (node.id === "workspace") {
    const rootPages = await notionSearch.findAllRootPages()
    children = rootPages.map(page => ({ id: page.id, type: page.object }))
  } else {
    const validChildren = node.type === "database"
      ? await getDatabaseEntries(node.id)
      : await Promise.all(
        (await notionBlocks.getTreeNodeChildBlocks(node.id))
          .map(async child => await getChildAsFullBlock(child))
      )

    children = validChildren.flat()
  }

  return children
}

/**
 * 
*/
export const getNodeBlock = async (node: TreeNode): Promise<Node> => {
  const block = node.type === "page"
    ? await notionPages.retrievePage(node.id)
    : await notionDatabases.retrieveDatabase(node.id)
  return block
}

export const buildTreeNode = async (id: string, type: string): Promise<TreeNode> => {
  let node: TreeNode = {
    id, type, title: "", children: []
  }

  if (node.id !== "workspace") {
    const asBlock = await getNodeBlock(node)
    node.title = formatNodeTitle(asBlock)
  } else node.title = "Workspace"

  node.children = await getNodeChildren(node)

  // console.log('n', node)
  return node
}