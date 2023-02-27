import * as notionBlocks from '../../handlers/notion/notionBlocks'
import * as notionDatabases from '../../handlers/notion/notionDatabases'
import * as notionPages from '../../handlers/notion/notionPages'
import * as notionSearch from '../../handlers/notion/notionSearch'

import { Child, ChildrenAsBlocks, NodeChild } from '../../types/notion/notionApiResponses'
import { IconProperty, TitleProperty } from '../../types/notion/pageProperties'
import { TreeNode } from '../../types/notion/TreeNode'
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

/**
 * 
 */
const formatChildTreeNode = (node: NodeChild): TreeNode => {
  let newNode = {
    id: node.id, type: node.object, title: "", children: []
  }

  const icon = (node.icon as IconProperty)
  const emoji = icon && (icon.emoji + " ") || ''

  const title = node.object === "page" ?
    (node.properties.title || node.properties["Title"]) ?
      (node.properties.title) ?
        (node.properties.title as TitleProperty).title[0].plain_text
        : (node.properties["Title"] as TitleProperty).title[0].plain_text
      : ""
    : node.title[0].plain_text

  newNode.title = `${emoji}${title}`


  return newNode
}

/**
 * 
 */
const recurseToFindChildren = async (blockId: string, validChildren: Child[]) => {
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

/**
 * 
 */
const getChildAsFullBlock = async (child: BlockObjectResponse) : Promise<ChildrenAsBlocks> => {

  if (child.type === "column_list") {
    const nestedChildren = await recurseToFindChildren(child.id, [])

    return await Promise.all(nestedChildren.map(
      async nestedChild => await notionBlocks.getChildBlock(nestedChild.type, nestedChild.id)
    ))

  } else if (child.type === "child_database") {
    return await notionDatabases.retrieveDatabase(child.id)
  }
  else return await notionBlocks.getChildBlock(child.type, child.id)
}

const getDatabaseEntries = async(databaseId: string) => {
  const dbContents = (await notionDatabases.queryDatabase(databaseId)).results
    .filter(item => item.object === "page") as PageObjectResponse[]

  return await Promise.all(dbContents.map(
    async dbContents => await notionPages.retrievePage(dbContents.id)
  ))
}

/**
 * 
 */
const getNodeChildren = async (node: TreeNode) : Promise<TreeNode[]> => {

  let children: NodeChild[]

  if (node.id === "workspace") {
    children = await notionSearch.findAllRootPages("PageObjectResponse") as NodeChild[]
  } else {
    const validChildren = node.type === "database"
      ? await getDatabaseEntries(node.id)
      : await Promise.all(
        (await notionBlocks.getTreeNodeChildBlocks(node.id))
          .map(async child => await getChildAsFullBlock(child))
      )

    children = validChildren.flat()
  }

  // if no children, just return the node as is
  if (children.length === 0) return [] as TreeNode[]

  const nodeChildren = children.map(child => formatChildTreeNode(child))

  for (let child of nodeChildren) {
    child.children = await Promise.all(await getNodeChildren(child))
  }

  return nodeChildren
}

/**
 * 
 */
export const buildWorkspaceTree = async () : Promise<TreeNode> => {
  const rootNode: TreeNode = {
    id: "workspace", type: "database", title: "Workspace", children: []
  }

  // const c = await notionPages.retrievePage("e7ed9dfd-7355-4343-9cf4-9de50f34a09b")
  // console.log(c)

  rootNode.children = await getNodeChildren(rootNode)
  return rootNode
}