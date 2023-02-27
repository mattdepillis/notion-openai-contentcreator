import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { notion } from "../../utils/notionClient"

export const retrieveDatabase = async (databaseId: string) => {
  const db = await notion.databases.retrieve({ database_id: databaseId })
  return db as DatabaseObjectResponse
}

export const queryDatabase = async (databaseId: string) => {
  const contents = await notion.databases.query({ database_id: databaseId })
  return contents
}