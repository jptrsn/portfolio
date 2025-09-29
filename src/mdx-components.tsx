import type { MDXComponents } from 'mdx/types'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components for MDX
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-6 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-4">
        {children}
      </p>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors"
        {...props}
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
        {children}
      </ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-4 mb-6 bg-blue-50 italic text-gray-800 rounded-r-lg">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-neutral-100 text-red-600 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-neutral-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 text-sm">
        {children}
      </pre>
    ),
    // Custom Alert component example
    Alert: ({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'error' | 'success' }) => {
      const styles = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        success: 'bg-green-50 border-green-200 text-green-800',
      }
      return (
        <div className={`p-4 mb-6 rounded-lg border ${styles[type]}`}>
          {children}
        </div>
      )
    },
    // Custom Callout component
    Callout: ({ children, emoji = '💡' }: { children: React.ReactNode; emoji?: string }) => (
      <div className="flex p-4 mb-6 bg-neutral-50 border border-gray-200 rounded-lg">
        <div className="flex-shrink-0 mr-3 text-xl">
          {emoji}
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    ),
    ...components,
  }
}