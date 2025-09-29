/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts, formatDate } from '@/lib/posts'

interface Props {
  params: Promise<{ slug: string }>
}

// Custom MDX components with Tailwind styling
const mdxComponents = {
  h1: (props: any) => (
    <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-6 first:mt-0" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3" {...props} />
  ),
  h5: (props: any) => (
    <h5 className="text-lg font-semibold text-gray-900 mt-4 mb-2" {...props} />
  ),
  h6: (props: any) => (
    <h6 className="text-base font-semibold text-gray-900 mt-4 mb-2" {...props} />
  ),
  p: (props: any) => (
    <p className="text-gray-700 leading-relaxed mb-4" {...props} />
  ),
  a: (props: any) => (
    <a className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props} />
  ),
  li: (props: any) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-6 py-4 mb-6 bg-blue-50 italic text-gray-800 rounded-r-lg" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 text-sm" {...props} />
  ),
  img: (props: any) => (
    <img className="rounded-lg shadow-lg mb-6 max-w-full h-auto" {...props} />
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
    <thead className="bg-gray-50" {...props} />
  ),
  tbody: (props: any) => (
    <tbody className="bg-white divide-y divide-gray-200" {...props} />
  ),
  tr: (props: any) => (
    <tr className="hover:bg-gray-50" {...props} />
  ),
  th: (props: any) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" {...props} />
  ),
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt || post.description,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/posts"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to posts
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <time
              className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
              dateTime={post.date}
            >
              {formatDate(post.date)}
            </time>
            {post.author && (
              <span className="text-sm text-gray-500">by {post.author}</span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <div className="text-xl text-gray-600 leading-relaxed mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-500">
              {post.excerpt}
            </div>
          )}

          {/* Tags and Categories */}
          {(post.categories?.length || post.tags?.length) && (
            <div className="flex flex-wrap gap-3 pb-8 border-b border-gray-200">
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map(category => (
                    <span
                      key={category}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
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
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
          />
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <Link
              href="/posts"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Posts
            </Link>

            <div className="text-sm text-gray-500">
              Published on {formatDate(post.date)}
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}