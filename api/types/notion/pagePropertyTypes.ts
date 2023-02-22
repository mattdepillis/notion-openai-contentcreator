interface TitleObject {
  type: string
  plain_text: string
}

export interface TitleProperty {
  type: string
  title: TitleObject[]
}

export interface IconProperty {
  type: string
  emoji?: string
}