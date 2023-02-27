import { TreeNode } from '../../types/notion/treeNodeTypes'
import { IconProperty, TitleProperty } from "../../types/notion/pagePropertyTypes"

import * as notionBlocks from "../../handlers/notion/notionBlocks"
import * as notionSearch from "../../handlers/notion/notionSearch"
import { BlockObjectResponse, ChildDatabaseBlockObjectResponse, ChildPageBlockObjectResponse, ColumnListBlockObjectResponse, DatabaseObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const formatChildTreeNode = (node: NodeChild): TreeNode => {
  let newNode = {
    id: node.id, type: node.object, title: "", children: []
  }

  const icon = (node.icon as IconProperty)
  const emoji = icon && icon.emoji || ''

  const title = node.object === "page"
    ? (node.properties.title as TitleProperty).title[0].plain_text
    : node.title[0].plain_text

  newNode.title = `${emoji} ${title}`

  return newNode
}

type NodeChild = DatabaseObjectResponse | PageObjectResponse
type Child = ChildPageBlockObjectResponse | ChildDatabaseBlockObjectResponse

const recurseToFindChildrenInColumn = async (blockId: string, validChildren: Child[]) => {
  const children = (await notionBlocks.getChildBlocks(blockId)).results as BlockObjectResponse[]
  console.log('children', children)
  for (let child of children) {
    if (child.type === "column" || child.type === "column_list") {
      await recurseToFindChildrenInColumn(child.id, validChildren)
    } else if (child.type === "child_page" || child.type === "child_database") {
      validChildren.push(child as Child)
    }
  }
  return validChildren
}


// recursive method to fetch all the node's children and pass each child to a separate function for stripping out valid props for tree construction 
const getNodeChildren = async (node: TreeNode) : Promise<TreeNode[]> => {

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
  let children: NodeChild[]

  if (node.id === "workspace") {
    children = await notionSearch.findAllRootPages("PageObjectResponse") as NodeChild[]
  } else {
    const validChildren = await notionBlocks.getTreeNodeChildBlocks(node.id)

    const childrenAsBlocks = await Promise.all(validChildren.map(async child => {
      if (child.type === "column_list") {
        const nestedChildren = await recurseToFindChildrenInColumn(child.id, [])

        return await Promise.all(nestedChildren.map(async nestedChild =>
          await notionBlocks.getChildBlock(nestedChild.type, nestedChild.id)
        ))
      }
      else return await notionBlocks.getChildBlock(child.type, child.id)
    }))

    children = childrenAsBlocks.flat()
  }

  // if no children, just return the node as is
  if (children.length === 0) return [] as TreeNode[]

  const nodeChildren = children.map(child => formatChildTreeNode(child))

  // TODO: make this work for pages inside DBs (for example, Essays within Personal Site page)
  for (let child of nodeChildren) child.children = await Promise.all(await getNodeChildren(child))

  return nodeChildren
}

// overarching method -- preps root node and then passes to recursive methods to get all child dbs + pages in the tree
// TODO: want to achieve this piecewise for performance reasons
// ? fetch incrementally so we don't force the frontend to process one huge request?
// * this way, might avoid rate limiting as well - this may be a factor already
export const buildWorkspaceTree = async () : Promise<TreeNode> => {
  const rootNode: TreeNode = {
    id: "workspace", type: "database", title: "Workspace", children: []
  }

  rootNode.children = await getNodeChildren(rootNode)
  return rootNode
}