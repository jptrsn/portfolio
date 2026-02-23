/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts, formatDate, Post, toSnakeCase, extractHeadings } from '@/lib/posts'
import { generateExtendedMetadata } from '@/lib/metadata'
import { Rss } from 'lucide-react'
import TableOfContents from '@/components/TableOfContents'
import rehypeSlug from 'rehype-slug'
import ScrollToTop from '@/components/ScrollToTop'

interface Props {
  params: Promise<{ slug: string }>
}

// Custom MDX components with Tailwind styling
const mdxComponents = {
  h1: (props: any) => (
    <h1 className="text-4xl font-bold text-neutral-400 mt-8 mb-6 first:mt-0" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold text-neutral-400 mt-8 mb-4 pb-2 border-b border-gray-200" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-semibold text-neutral-400 mt-6 mb-4" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-xl font-semibold text-neutral-400 mt-6 mb-3" {...props} />
  ),
  h5: (props: any) => (
    <h5 className="text-lg font-semibold text-neutral-400 mt-4 mb-2" {...props} />
  ),
  h6: (props: any) => (
    <h6 className="text-base font-semibold text-neutral-400 mt-4 mb-2" {...props} />
  ),
  p: (props: any) => (
    <p className="text-gray-200 leading-relaxed mb-4" {...props} />
  ),
  a: (props: any) => (
    <a className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-200" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-200" {...props} />
  ),
  li: (props: any) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 whitespace-pre border-primary-500 pl-6 !py-0 bg-neutral-800 italic text-neutral-100 rounded-r-lg" {...props} />
  ),
  Details: (props: any) => (
    <details className="my-4" {...props} />
  ),
  Summary: (props: any) => (
    <summary className="text-primary-500 font-bold cursor-pointer" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-neutral-900 text-primary-50 px-2 py-1 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-neutral-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 text-sm" {...props} />
  ),
  hr: (props: any) => (
    <hr className="border-gray-300 my-8" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-neutral-50" {...props} />
  ),
  tbody: (props: any) => (
    <tbody className="bg-neutral-700 divide-y divide-gray-200" {...props} />
  ),
  tr: (props: any) => (
    <tr className="hover:bg-neutral-50" {...props} />
  ),
  th: (props: any) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider" {...props} />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400" {...props} />
  ),
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts()
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for posts:', error)
    return []
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post: Post | null = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return generateExtendedMetadata({
    title: post.title,
    description: post.excerpt || post.description,
    tags: post.tags,
    url: `/posts/${slug}`,  // Add this line
    type: 'article',        // Also good to set this for blog posts
  })
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const headings = extractHeadings(post.content)

  return (
    <div className="min-h-screen bg-secondary-900/50">
      {/* Back Navigation */}
      <div className="bg-neutral-500/20 border-b border-neutral-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-row justify-between">
          <Link
            href="/posts"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to posts
          </Link>
          <Link
            href="/feed.xml"
          >
            <Rss size={"22"} />
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Article Header */}
        <header className="mb-4">
          <div className="flex items-center justify-between mb-2 sm:mb-6">
            <time
              className="text-xs sm:text-sm sm:font-medium text-primary-600 bg-neutral-400 px-3 py-1 rounded-full"
              dateTime={post.date}
            >
              {formatDate(post.date)}
            </time>
            {post.author && (
              <span className="text-sm text-neutral-500">by {post.author}</span>
            )}
          </div>

          <h1 className="text-2xl sm:text-5xl font-bold text-neutral-200 mb-3 sm:mb-6 leading-tight break-all">
            {toSnakeCase(post.title)}
          </h1>

          {post.excerpt && (
            <div className="text-md sm:text-xl text-secondary-300 leading-relaxed mb-3 sm:mb-8 p-3 sm:p-6 bg-neutral-600 rounded-lg border-l-4 border-secondary-600">
              {post.excerpt}
            </div>
          )}

          {/* Tags and Categories */}
          {(post.categories?.length || post.tags?.length) && (
            <div className="flex flex-wrap gap-3 pb-4 sm:pb-8 border-b border-gray-200">
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map(category => (
                    <span
                      key={category}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm sm:font-medium text-secondary-200 bg-secondary-800"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm sm:font-medium text-secondary-200 bg-secondary-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          <TableOfContents headings={headings} />
        </header>

        {/* Article Content */}
        <div className="text-sm sm:text-md max-w-none">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeSlug],
              }
            }}
          />
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <Link
              href="/posts"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-200 bg-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Posts
            </Link>

            <div className="text-sm text-neutral-500">
              Published on {formatDate(post.date)}
            </div>
          </div>
        </footer>
      </article>
      <ScrollToTop />
    </div>
  )
}