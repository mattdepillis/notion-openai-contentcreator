import { ListUsersResponse, UserObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notion } from '../../utils/notionClient'

interface userInfo {
  "avatar_url": string | null
  "name": string| null
}

export const getUserData = async (): Promise<userInfo> => {
  const users: ListUsersResponse = await notion.users.list({})
  const rootUser: UserObjectResponse = users.results[0]
  
  const userData: userInfo = {
    "avatar_url": rootUser.avatar_url,
    "name": rootUser.name
  }
  return userData
}