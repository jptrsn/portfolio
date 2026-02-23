import Link from 'next/link'
import { getAllPosts, formatDate, toSnakeCase } from '@/lib/posts'
import Navigation from '@/components/Navigation'
import { Rss } from 'lucide-react'

export const metadata = {
  title: 'Blog Posts',
  description: 'All blog posts',
}

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-18 sm:pt-24 pb-6 sm:pb-12">
        {/* Header */}
        <div className="flex justify-center w-full mb-4 sm:mb-16 gap-2">
          <div className="text-xl text-gray-500">
            Thoughts on web development and technology
          </div>
          <Link href="/feed.xml">
            <Rss className="text-gray-500" />
          </Link>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-primary-700 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-primary-500 mb-2">No posts yet</h3>
            <p className="text-gray-500">Create your first post in the src/content/posts directory</p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-primary-300/10 rounded-xl shadow-sm border border-primary-700 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <Link href={`/posts/${post.slug}`} className="block">
                  <div className="p-3 sm:p-8">
                    {/* Post Header */}
                    <div className="flex items-center justify-between mb-4">
                      <time
                        className="text-xs sm:text-sm font-medium text-secondary-200 bg-secondary-800 px-3 py-1 rounded-full"
                        dateTime={post.date}
                      >
                        {formatDate(post.date)}
                      </time>
                      {post.author && (
                        <span className="text-xs sm:text-sm text-secondary-700">by {post.author}</span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-3xl font-bold text-primary-200 mb-4 hover:text-primary-100 transition-colors duration-200">
                      {toSnakeCase(post.title)}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-400 text-sm sm:text-lg leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Tags and Categories */}
                    <div className="flex flex-wrap gap-3">
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.categories.map(category => (
                            <span
                              key={category}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm sm:font-medium bg-purple-100 text-purple-800"
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
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm sm:font-medium text-secondary-200 bg-secondary-800 hover:bg-secondary-600 hover:text-primary-900 transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Read More Indicator */}
                    <div className="flex items-center mt-6 text-blue-600 font-medium">
                      <span>Read more</span>
                      <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}