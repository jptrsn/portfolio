import { Heading } from '@/lib/posts'
import Link from 'next/link'

interface TableOfContentsProps {
  headings?: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  if (!headings || headings.length === 0) return null

  return (
    <nav aria-label="Table of contents" className="p-4 bg-neutral-800 rounded-lg">
      <details open>
        <summary>Contents</summary>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
            >
              <Link
                href={`#${heading.id}`}
                className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </nav>
  )
}