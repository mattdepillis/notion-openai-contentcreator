import {
  ChildDatabaseBlockObjectResponse,
  ChildPageBlockObjectResponse,
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialPageObjectResponse
} from '@notionhq/client/build/src/api-endpoints'

export interface PageObjectWithParent extends PartialPageObjectResponse {
  parent: {
    type: 'database_id' | 'page_id' | 'workspace'
    database_id?: 'string'
    page_id?: 'string'
    workspace?: 'boolean'
  }
}

export type Child = ChildPageBlockObjectResponse | ChildDatabaseBlockObjectResponse
export type ChildrenAsBlocks = DatabaseObjectResponse | PageObjectResponse | (DatabaseObjectResponse | PageObjectResponse)[]
export type NodeChild = DatabaseObjectResponse | PageObjectResponse