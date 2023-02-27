interface PageNode {
  id: string
  type: "page"
  title: string
  children?: TreeNode[]
}

interface DatabaseNode {
  id: string
  type: "database"
  title: string
  children?: TreeNode[]
}

export type TreeNode = PageNode | DatabaseNode