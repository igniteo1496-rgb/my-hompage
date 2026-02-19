import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

export interface NotionPost {
  id: string
  title: string
  slug: string
  category: string
  date: string
  published: boolean
  excerpt?: string
}

export interface NotionPostWithContent extends NotionPost {
  blocks: BlockObjectResponse[]
}

export type NotionPropertyValue = PageObjectResponse['properties'][string]

export interface PostProperties {
  title: { title: RichTextItemResponse[] }
  slug: { rich_text: RichTextItemResponse[] }
  category: { select: { name: string } | null }
  date: { date: { start: string } | null }
  published: { checkbox: boolean }
}

export type NotionBlock = BlockObjectResponse
