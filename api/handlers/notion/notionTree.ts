import { TreeNode } from '../../types/notion/treeNodeTypes'
import { IconProperty, TitleProperty } from "../../types/notion/pagePropertyTypes"

import * as notionBlocks from "../../handlers/notion/notionBlocks"
import * as notionPages from "../../handlers/notion/notionPages"
import * as notionSearch from "../../handlers/notion/notionSearch"


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

  console.log('c', children)

  // if no children, just return the node as is
  if (children.length === 0) return children

  /*
    * now that we have all children, we want to map each child element to fit our desired format
    * for TreeNode, which is PageNode | DatabaseNode.
    * we'll do this by passing each node to the prep function.
    * then, to test, we'll send back the root children and log out to output.
    * if this succeeds, we'll test the construction of the entire tree.
  */

  return children
}

// overarching method -- preps root node and then passes to recursive methods to get all child dbs + pages in the tree
export const buildWorkspaceTree = async () : Promise<TreeNode> => {
  const rootPages = await notionSearch.findAllRootPages()

  const rootNode: TreeNode = {
    id: "workspace", type: "database", title: "Workspace", children: []
  }

  /* 
    * should be more like getNodeChildren(root)
      * top root: TreeNode = { id: "workspace", type: "database", title: "Workspace", children: [] }
      * if (root.id === "workspace") blocks = notionSearch.findAllRootPages()
      * if a db or page, different logic
      * FETCH ALL CHILDREN, then filter for just child DBs and pages -- might want to just fetch all child blocks
      * then, for each child -> getNode(id, type, parent)
        * treat page_id and database_id differently
        * 
  */
  // rootNode.children = await Promise.all(rootPages.map(root => getNode(root.id, rootNode)))
  //   .then(children => children.map(child => child[0]))

  rootNode.children = await getNodeChildren(rootNode)
  
  // if (rootNode.children) console.log('h', await getNodeChildren(rootNode.children[0]))
  
  return rootNode
}