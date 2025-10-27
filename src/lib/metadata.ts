/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'
import { SITE_CONFIG } from '@/data/site'

interface MetadataProps {
  title?: string
  description?: string
  keywords?: string[]
  author?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  locale?: string
  alternateLocales?: string[]
  canonical?: string
  noIndex?: boolean
  noFollow?: boolean
  siteName?: string
  twitterHandle?: string
  facebookAppId?: string
}

const DEFAULT_METADATA = {
  siteName: SITE_CONFIG.siteName,
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: ['coding', 'programming', 'tutorials', 'javascript', 'python', 'react', 'web development', 'learn to code'],
  author: 'James Petersen',
  image: SITE_CONFIG.ogImage,
  url: SITE_CONFIG.url,
  type: 'website' as const,
  locale: 'en_CA',
}

export function generateExtendedMetadata({
  title,
  description = DEFAULT_METADATA.description,
  keywords = DEFAULT_METADATA.keywords,
  author = DEFAULT_METADATA.author,
  image = DEFAULT_METADATA.image,
  url = DEFAULT_METADATA.url,
  type = DEFAULT_METADATA.type,
  publishedTime,
  modifiedTime,
  section,
  tags,
  locale = DEFAULT_METADATA.locale,
  alternateLocales = [],
  canonical,
  noIndex = false,
  noFollow = false,
  siteName = DEFAULT_METADATA.siteName,
}: MetadataProps = {}): Metadata {
  // Construct full title
  const fullTitle = title
    ? `${title} | ${siteName}`
    : DEFAULT_METADATA.title

  // Ensure absolute URL for image
  const absoluteImage = image?.startsWith('http')
    ? image
    : `${DEFAULT_METADATA.url}${image?.startsWith('/') ? '' : '/'}${image || 'og-image.jpg'}`

  // Ensure absolute URL
  const absoluteUrl = url?.startsWith('http')
    ? url
    : `${DEFAULT_METADATA.url}${url?.startsWith('/') ? '' : '/'}${url || ''}`

  // Build the other object first to avoid circular reference
  const otherMetadata: Record<string, string> = {
    ...(tags && { 'article:tag': tags.join(',') })
  }

  const metadata: Metadata = {
    // Basic metadata
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: siteName,

    // Robots
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Canonical URL
    alternates: {
      canonical: canonical || absoluteUrl,
      languages: alternateLocales.reduce((acc, locale) => {
        acc[locale] = `${DEFAULT_METADATA.url}/${locale}`
        return acc
      }, {} as Record<string, string>)
    },

    // Open Graph
    openGraph: {
      type: type as 'website' | 'article' | 'profile',
      title: fullTitle,
      description,
      url: absoluteUrl,
      siteName,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: title || DEFAULT_METADATA.title,
        },
      ],
      locale,
      ...(alternateLocales.length > 0 && {
        alternateLocale: alternateLocales
      }),
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        section,
        tags,
        authors: [author]
      })
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: url,
      title: fullTitle,
      description,
      images: [absoluteImage],
    },

    // Additional meta tags for SEO, Facebook, and article tags
    other: otherMetadata,

    // Additional meta tags for better SEO
    formatDetection: {
      telephone: false,
    },

    // Additional structured data hints
    category: section,
  }

  return metadata
}

// Example usage in page components:
/*
// app/page.tsx
export const metadata = generateMetadata({
  title: 'Home',
  description: 'Learn programming with interactive tutorials and hands-on projects',
  keywords: ['coding tutorials', 'programming courses', 'web development'],
  url: '/',
})

// app/tutorials/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Fetch tutorial data
  const tutorial = await getTutorial(params.slug)

  return generateMetadata({
    title: tutorial.title,
    description: tutorial.description,
    keywords: tutorial.tags,
    url: `/tutorials/${params.slug}`,
    type: 'article',
    publishedTime: tutorial.publishedAt,
    modifiedTime: tutorial.updatedAt,
    section: 'Tutorials',
    tags: tutorial.tags,
    image: tutorial.image,
  })
}

// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  return generateMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    url: `/blog/${params.slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    section: 'Blog',
    tags: post.tags,
    image: post.featuredImage,
  })
}
*/

// JSON-LD structured data helper (optional but recommended for rich snippets)
export function generateJsonLd(data: any) {
  return {
    __html: JSON.stringify(data)
  }
}

// Common JSON-LD schemas for educational content
export const createWebsiteJsonLd = (siteName: string, url: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url,
  description,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${url}/search?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
})

export const createOrganizationJsonLd = (name: string, url: string, logo: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name,
  url,
  logo,
  sameAs: [
    // Add your social media profiles
    'https://twitter.com/educoder',
    'https://github.com/educoder',
    'https://linkedin.com/company/educoder'
  ]
})

export const createCourseJsonLd = (course: {
  name: string
  description: string
  provider: string
  url: string
  image?: string
  price?: number
  currency?: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: course.name,
  description: course.description,
  provider: {
    '@type': 'Organization',
    name: course.provider
  },
  url: course.url,
  ...(course.image && { image: course.image }),
  ...(course.price && {
    offers: {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: course.currency || 'USD'
    }
  })
})