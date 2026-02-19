'use client'

import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { Fragment } from 'react'

interface RichTextItem {
  type: string
  plain_text: string
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
  }
  href: string | null
}

function renderRichText(richText: RichTextItem[]): React.ReactNode {
  return richText.map((item, index) => {
    let content: React.ReactNode = item.plain_text

    if (item.annotations.bold) {
      content = <strong key={`bold-${index}`}>{content}</strong>
    }
    if (item.annotations.italic) {
      content = <em key={`italic-${index}`}>{content}</em>
    }
    if (item.annotations.strikethrough) {
      content = <del key={`strike-${index}`}>{content}</del>
    }
    if (item.annotations.underline) {
      content = <u key={`underline-${index}`}>{content}</u>
    }
    if (item.annotations.code) {
      content = <code key={`code-${index}`}>{content}</code>
    }
    if (item.href) {
      content = (
        <a
          key={`link-${index}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      )
    }

    return <Fragment key={index}>{content}</Fragment>
  })
}

interface BlockRendererProps {
  block: BlockObjectResponse
}

function BlockRenderer({ block }: BlockRendererProps) {
  const { type } = block

  switch (type) {
    case 'paragraph': {
      const paragraph = block as BlockObjectResponse & {
        paragraph: { rich_text: RichTextItem[] }
      }
      return <p>{renderRichText(paragraph.paragraph.rich_text)}</p>
    }

    case 'heading_1': {
      const heading = block as BlockObjectResponse & {
        heading_1: { rich_text: RichTextItem[] }
      }
      return <h1>{renderRichText(heading.heading_1.rich_text)}</h1>
    }

    case 'heading_2': {
      const heading = block as BlockObjectResponse & {
        heading_2: { rich_text: RichTextItem[] }
      }
      return <h2>{renderRichText(heading.heading_2.rich_text)}</h2>
    }

    case 'heading_3': {
      const heading = block as BlockObjectResponse & {
        heading_3: { rich_text: RichTextItem[] }
      }
      return <h3>{renderRichText(heading.heading_3.rich_text)}</h3>
    }

    case 'bulleted_list_item': {
      const listItem = block as BlockObjectResponse & {
        bulleted_list_item: { rich_text: RichTextItem[] }
      }
      return <li>{renderRichText(listItem.bulleted_list_item.rich_text)}</li>
    }

    case 'numbered_list_item': {
      const listItem = block as BlockObjectResponse & {
        numbered_list_item: { rich_text: RichTextItem[] }
      }
      return <li>{renderRichText(listItem.numbered_list_item.rich_text)}</li>
    }

    case 'quote': {
      const quote = block as BlockObjectResponse & {
        quote: { rich_text: RichTextItem[] }
      }
      return <blockquote>{renderRichText(quote.quote.rich_text)}</blockquote>
    }

    case 'code': {
      const codeBlock = block as BlockObjectResponse & {
        code: { rich_text: RichTextItem[]; language: string }
      }
      const code = codeBlock.code.rich_text
        .map((item) => item.plain_text)
        .join('')
      return (
        <pre>
          <code className={`language-${codeBlock.code.language}`}>{code}</code>
        </pre>
      )
    }

    case 'divider':
      return <hr className="my-8 border-t border-gray-200" />

    case 'image': {
      const imageBlock = block as BlockObjectResponse & {
        image:
          | { type: 'external'; external: { url: string } }
          | { type: 'file'; file: { url: string } }
      }
      const src =
        imageBlock.image.type === 'external'
          ? imageBlock.image.external.url
          : imageBlock.image.file.url
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" loading="lazy" />
        </figure>
      )
    }

    default:
      return null
  }
}

function renderList(
  type: 'ul' | 'ol',
  items: React.ReactNode[],
  key: string
): React.ReactNode {
  if (type === 'ul') {
    return <ul key={key}>{items}</ul>
  }
  return <ol key={key}>{items}</ol>
}

interface NotionRendererProps {
  blocks: BlockObjectResponse[]
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  const groupedBlocks: React.ReactNode[] = []
  let currentListType: 'ul' | 'ol' | null = null
  let currentListItems: React.ReactNode[] = []

  const flushList = (key: string) => {
    if (currentListType && currentListItems.length > 0) {
      groupedBlocks.push(renderList(currentListType, currentListItems, key))
      currentListItems = []
      currentListType = null
    }
  }

  blocks.forEach((block, index) => {
    if (block.type === 'bulleted_list_item') {
      if (currentListType !== 'ul') {
        flushList(`list-${index}`)
        currentListType = 'ul'
      }
      currentListItems.push(<BlockRenderer key={block.id} block={block} />)
    } else if (block.type === 'numbered_list_item') {
      if (currentListType !== 'ol') {
        flushList(`list-${index}`)
        currentListType = 'ol'
      }
      currentListItems.push(<BlockRenderer key={block.id} block={block} />)
    } else {
      flushList(`list-${index}`)
      groupedBlocks.push(<BlockRenderer key={block.id} block={block} />)
    }
  })

  flushList('list-final')

  return <div className="notion-content">{groupedBlocks}</div>
}
