import { notion } from "../../utils/notionClient"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export const retrievePage = async (id: string) => {
  const page = await notion.pages.retrieve({
    page_id: id
  })
  return page as PageObjectResponse
}