import { TreeNode } from '../../types/notion/treeNodeTypes'
import { IconProperty, TitleProperty } from "../../types/notion/pagePropertyTypes"

import * as notionBlocks from "../../handlers/notion/notionBlocks"
import * as notionPages from "../../handlers/notion/notionPages"
import * as notionSearch from "../../handlers/notion/notionSearch"
import { DatabaseObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'


// async function getNode(id: string): Promise<TreeNode> {
async function getNode(id: string, rootNode: TreeNode | null): Promise<any> {
  const page = await notionPages.retrievePage(id)

  // handle rootNode (workspace)
  if (page.parent.type === "workspace" && rootNode) {
    const title = page.properties.title as TitleProperty
    const emoji = page.icon as IconProperty
    rootNode.children = [
      { id, type: "page", title: `${emoji.emoji} ${title.title[0].plain_text}`, children: [] }
    ]
    return rootNode.children
  } else if (page.parent.type === "page_id") {
    // const parent = await getNode(page.parent.page_id, null)
    // if (parent.children) console.log(page.properties.title)
    // if (parent.children) {
    //   const title = (page.properties.title && page.properties.title[0].text.content) || '';
    //   parent.children.push({ id, type: "page", title: page.properties.title?.title || "" })
    // } else {
    //   parent.children = [{ id, type: "page", title: page.properties.title.title }]
    // }
    return parent
  } else if (page.parent.type === "database_id") {
    // const database = await notion.databases.retrieve({ database_id: page.parent.database_id })
    // console.log(page.properties.title)
    // console.log(database.properties.title)
    // const properties = page.properties as { [key: string]: { title: { title: string } } }
    // const item = { id, type: "page", title: page.properties.title.title }
    // const children = await notion.databases.query({
    //   database_id: database.id,
    //   filter: {
    //     property: "Parent",
    //     page: {
    //       id: page.id,
    //     },
    //   },
    // })
    // if (children.results.length > 0) {
    //   item.children = await Promise.all(children.results.map((child) => getNode(child.id)))
    // }
    // return { id: database.id, type: "database", title: database.title[0].plain_text, children: [item] }
    }
  else {
    throw new Error(`Unexpected parent type: ${page.parent.type}`)
  }
}

const formatChildTreeNode = (node: DatabaseObjectResponse | PageObjectResponse): TreeNode => {
  let newNode = {
    id: node.id, type: node.object, title: "", children: []
  }
  const emoji = node.icon as IconProperty
  const title = node.object === "page"
    ? (node.properties.title as TitleProperty).title[0].plain_text
    : node.title[0].plain_text

  newNode.title = `${emoji.emoji} ${title}`

  return newNode
}

// recursive method to fetch all the node's children and pass each child to a separate function for stripping out valid props for tree construction 
const getNodeChildren = async (node: TreeNode) : Promise<TreeNode[]> => {

  let children: any[]

  // handle case where the children are the root pages of the workspace
  // for now -- just pages should be located at root
  // TODO: think about whether or not dbs should be allowed at root as well
  if (node.id === "workspace") {
    children = await notionSearch.findAllRootPages()
  } else {
    const validChildren = await notionBlocks.getTreeNodeChildBlocks(node.id)
    children = await Promise.all(validChildren.map(
      child => notionBlocks.getChildBlock(child.type, child.id)
    ))
  }

  // if no children, just return the node as is
  if (children.length > 0) {
    children = children.map(child => formatChildTreeNode(child))
    // TODO: children.forEach(child => await Promise.all(child => getNodeChildren(child)))
  }

  return children
}

// overarching method -- preps root node and then passes to recursive methods to get all child dbs + pages in the tree
export const buildWorkspaceTree = async () : Promise<TreeNode> => {
  const rootNode: TreeNode = {
    id: "workspace", type: "database", title: "Workspace", children: []
  }

  rootNode.children = await getNodeChildren(rootNode)

  console.log('rn', rootNode)
    
  return rootNode
}