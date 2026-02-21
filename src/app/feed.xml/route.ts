import { getAllPosts } from '@/lib/posts'
import { getPostContentAsHtml } from '@/lib/posts'
import { SITE_CONFIG } from '@/data/site'

export const dynamic = 'force-static'

export async function GET() {
  const posts = await getAllPosts()

  const items = await Promise.all(
    posts.map(async (post) => {
      const content = await getPostContentAsHtml(post.slug)
      const url = `${SITE_CONFIG.url}/posts/${post.slug}`

      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          ${post.description ? `<description><![CDATA[${post.description}]]></description>` : ''}
          <content:encoded><![CDATA[${content}]]></content:encoded>
          ${post.categories?.map(c => `<category>${c}</category>`).join('\n      ') ?? ''}
        </item>`
    })
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title><![CDATA[${SITE_CONFIG.title}]]></title>
        <link>${SITE_CONFIG.url}</link>
        <description><![CDATA[${SITE_CONFIG.description}]]></description>
        <language>en-ca</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${SITE_CONFIG.url}/feed.xml" rel="self" type="application/rss+xml"/>
        ${items.join('')}
      </channel>
    </rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}