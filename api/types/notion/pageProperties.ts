interface TitleObject {
  type: string
  plain_text: string
}

export interface TitleProperty {
  type: string
  title: TitleObject[]
}

export interface NameProperty {
  type: string
  id: 'title'
  title: any[]
}

export interface IconProperty {
  type: string
  emoji?: string
}