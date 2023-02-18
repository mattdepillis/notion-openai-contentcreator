import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export const findAllRootPages = async () => {
  const response = await notion.search({})
  console.log('notionResponse: ', response)
  return response
}