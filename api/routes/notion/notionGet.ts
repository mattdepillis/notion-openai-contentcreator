import { Client } from '@notionhq/client'
import { PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

interface PageObjectWithParent extends PartialPageObjectResponse {
  parent: {
    type: 'database_id' | 'page_id' | 'workspace'
    database_id?: 'string'
    page_id?: 'string'
    workspace?: 'boolean'
  }
}

/*
  a method designed to find all the root pages in a user's workspace.
  given the notion search api's limitations for filter params that can be passed as of Version: 2022-06-08,
  we must create a separate filter to return just the root pages of the workspace from the results.
*/
export const findAllRootPages = async () => {
  const response = await notion.search({
    query: '',
    filter: {
      property: 'object',
      value: 'page'
    },
    // adjust size depending on how many root pages the workspace has.
    // include a buffer in case root pages aren't all returned first in results.
    // page_size: 20
  })
  return response.results as PageObjectWithParent[]
}