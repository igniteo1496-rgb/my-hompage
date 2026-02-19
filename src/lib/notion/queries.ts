import { notion, databaseId } from './client'
import type { NotionPost, NotionPostWithContent } from '@/types/notion'
import type {
  PageObjectResponse,
  BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

// Notion 속성명 매핑 (한글)
const PROPERTY_NAMES = {
  title: '이름',
  slug: 'URL',
  category: '선택',
  date: '등록일',
  published: '체크박스',
} as const

function extractTextFromRichText(
  richText: { plain_text: string }[]
): string {
  return richText.map((item) => item.plain_text).join('')
}

function getPropertyValue(properties: Record<string, unknown>, key: string): unknown {
  return properties[key]
}

function parsePost(page: PageObjectResponse): NotionPost {
  const properties = page.properties as Record<string, unknown>

  const titleProp = getPropertyValue(properties, PROPERTY_NAMES.title) as {
    title?: { plain_text: string }[]
  } | undefined
  const title = titleProp?.title
    ? extractTextFromRichText(titleProp.title)
    : 'Untitled'

  const slugProp = getPropertyValue(properties, PROPERTY_NAMES.slug) as {
    rich_text?: { plain_text: string }[]
    url?: string
  } | undefined
  const slug = slugProp?.rich_text
    ? extractTextFromRichText(slugProp.rich_text)
    : slugProp?.url || page.id

  const categoryProp = getPropertyValue(properties, PROPERTY_NAMES.category) as {
    select?: { name: string }
  } | undefined
  const category = categoryProp?.select?.name || 'Uncategorized'

  const dateProp = getPropertyValue(properties, PROPERTY_NAMES.date) as {
    date?: { start: string }
  } | undefined
  const date = dateProp?.date?.start || new Date().toISOString()

  const publishedProp = getPropertyValue(properties, PROPERTY_NAMES.published) as {
    checkbox?: boolean
  } | undefined
  const published = publishedProp?.checkbox ?? false

  return {
    id: page.id,
    title,
    slug,
    category,
    date,
    published,
  }
}

export async function getAllPosts(): Promise<NotionPost[]> {
  if (!databaseId) {
    return []
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: PROPERTY_NAMES.published,
        checkbox: { equals: true },
      },
      sorts: [
        {
          property: PROPERTY_NAMES.date,
          direction: 'descending',
        },
      ],
    })

    return response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map(parsePost)
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error}`)
  }
}

export async function getPostBySlug(
  slug: string
): Promise<NotionPostWithContent | null> {
  if (!databaseId) {
    return null
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: PROPERTY_NAMES.slug,
            rich_text: { equals: slug },
          },
          {
            property: PROPERTY_NAMES.published,
            checkbox: { equals: true },
          },
        ],
      },
    })

    const page = response.results[0]
    if (!page || !('properties' in page)) {
      return null
    }

    const post = parsePost(page as PageObjectResponse)
    const blocks = await getPageBlocks(page.id)

    return { ...post, blocks }
  } catch (error) {
    throw new Error(`Failed to fetch post '${slug}': ${error}`)
  }
}

async function getPageBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = []
  let cursor: string | undefined

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    })

    const blockObjects = response.results.filter(
      (block): block is BlockObjectResponse => 'type' in block
    )
    blocks.push(...blockObjects)
    cursor = response.next_cursor ?? undefined
  } while (cursor)

  return blocks
}

export async function getCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories)
}
