import { notion } from '../../utils/notionClient'
import { PageObjectWithParent } from '../../types/notion/notionApiResponses'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

/*
  a method designed to find all the root pages in a user's workspace.
  given the notion search api's limitations for filter params that can be passed as of Version: 2022-06-08,
  we must create a separate filter to return just the root pages of the workspace from the results.
*/
export const findAllRootPages = async (type?: string) => {
  const response = await notion.search({
    query: '',
    filter: {
      property: 'object',
      value: 'page'
    },
    // adjust size depending on how many root pages the workspace has.
    // include a buffer in case root pages aren't all returned first in results.
    page_size: 20
  })
  const pages = type && type === "PageObjectResponse"
    ? (response.results as PageObjectResponse[]).filter(page => page.parent.type === 'workspace')
    : (response.results as PageObjectWithParent[]).filter(page => page.parent.type === 'workspace')

  return pages
}


export const findPageChildren = async(id: string) => {
  const response = await notion.blocks.children.list({
    block_id: id,
    // page_size: 100
  })
  return response.results
}