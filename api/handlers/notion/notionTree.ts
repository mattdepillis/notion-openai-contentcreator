import * as notionBlocks from '../../handlers/notion/notionBlocks'
import * as notionDatabases from '../../handlers/notion/notionDatabases'
import * as notionPages from '../../handlers/notion/notionPages'
import * as notionSearch from '../../handlers/notion/notionSearch'

import { Child, Node } from '../../types/notion/notionApiResponses'
import { IconProperty, NameProperty, TitleProperty} from '../../types/notion/pageProperties'
import { NodeChild, TreeNode } from '../../types/notion/nodes'
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

/**
 * 
 */
const formatNodeTitle = async (node: Node): Promise<string> => {
  const icon = (node.icon as IconProperty)
  const emoji = icon && (icon.emoji + " ") || ''

  let title = node.object === "page" ?
    (node.properties.title || node.properties["Title"] || node.properties["Name"]) ?
      (node.properties.title) ?
        (node.properties.title as TitleProperty).title[0]?.plain_text
        : (node.properties["Name"]) ?
          (node.properties["Name"] as NameProperty).title[0]?.plain_text
        : (node.properties["Title"] as TitleProperty).title[0]?.plain_text
    : ""
  : node.title[0].plain_text

  if (node.object === "page" && !(/[a-zA-Z0-9]/.test(title))) {
    // console.log("retrieving child_page name from BlockObjectResponse for page id", node.id)
    title += `${await getChildPageNameFromBlock(node.id)}`
  }

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
export const getNodeChildren = async (node: TreeNode) : Promise<NodeChild[]> => {
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
const getNodeAsPageOrDatabase = async (node: TreeNode): Promise<Node> => {
  const block = ["page", "child_page"].indexOf(node.type) >= 0
    ? await notionPages.retrievePage(node.id)
    : await notionDatabases.retrieveDatabase(node.id)
  return block
}

/**
 * 
*/
const getChildPageNameFromBlock = async (id: string): Promise<string> => {
  const block = await notionBlocks.getBlock(id) as BlockObjectResponse
  return block.type === "child_page"
    ? block.child_page.title
    : ""
}

export const buildTreeNode = async (id: string, type: string): Promise<TreeNode|void> => {
  let node: TreeNode = {
    id, type, title: "", children: []
  }
  if (node.type === "external_object_instance_page") {
    console.log(`block ${id} is an external_object_instance_page`)
    return node
  }

  if (node.id !== "workspace") {
    let asBlock: Node
    try {
      asBlock = await getNodeAsPageOrDatabase(node)
    } catch(e) {
      console.log(`error fetching block ${id}: ${e}`)
      return
    }
    
    node.title = await formatNodeTitle(asBlock)
  } else node.title = "Workspace"

  node.children = await getNodeChildren(node)

  return node
}