import { TreeNode } from '../../types/notion/treeNodeTypes'
import { IconProperty, TitleProperty } from "../../types/notion/pagePropertyTypes"

import * as notionBlocks from "../../handlers/notion/notionBlocks"
import * as notionSearch from "../../handlers/notion/notionSearch"
import { DatabaseObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

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

// recursive method to fetch all the node's children and pass each child to a separate function for stripping out valid props for tree construction 
const getNodeChildren = async (node: TreeNode) : Promise<TreeNode[]> => {

  let children: NodeChild[]

  // handle case where the children are the root pages of the workspace
  // for now -- just pages should be located at root
  // TODO: think about whether or not dbs should be allowed at root as well
  if (node.id === "workspace") {
    children = await notionSearch.findAllRootPages("PageObjectResponse") as NodeChild[]
  } else {
    const validChildren = await notionBlocks.getTreeNodeChildBlocks(node.id)
    children = await Promise.all(validChildren.map(async child => await notionBlocks.getChildBlock(child.type, child.id)))
  }

  // if no children, just return the node as is
  if (children.length === 0) return [] as TreeNode[]

  const nodeChildren = children.map(child => formatChildTreeNode(child)) as TreeNode[]

  for (let child of nodeChildren) {
    // TODO: test this and confirm it's the correct syntax for fetching all
    console.log('fetching children for child', child.title, child.id)
    child.children = await Promise.all(await getNodeChildren(child))
  }

  // nodeChildren.map(async nodeChild => nodeChild.children = await getNodeChildren(nodeChild))

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
  // console.log('rn', rootNode)
  return rootNode
}