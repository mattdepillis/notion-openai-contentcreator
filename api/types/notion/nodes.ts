export interface NodeChild {
  id: string
  type: "page" | "database"
}

export interface TreeNode {
  id: string
  type: string
  title: string
  children?: NodeChild[]
}