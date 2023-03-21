import { Request, Response } from 'express'

import * as notionUsers from "../../handlers/notion/notionUsers"

export const getUser = async (req: Request, res: Response) =>
  res.json(await notionUsers.getUserData())