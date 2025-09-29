import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/portfolio';

export default function ProjectCard({ project }: { project: Project }) {
  const heroImage = project.images.find(img => img.isHero) || project.images[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-lg"
    >
      <div className="overflow-hidden rounded-t-lg">
        {heroImage ? (
          <Image
            src={heroImage.url}
            alt={heroImage.alt}
            width={400}
            height={240}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center">
            <div className="text-blue-600 dark:text-blue-300">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
            {project.year}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Status indicators */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-1 text-xs rounded-full ${
            project.status.current === 'active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : project.status.current === 'completed'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}>
            {project.status.current}
          </span>

          {project.featured && (
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              Featured
            </span>
          )}

          {project.hasCustomHardware && (
            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              Hardware
            </span>
          )}
        </div>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 4).map((tag, index) => (
            <span
              key={`${tag.name}-${tag.category}-${index}`}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
              style={tag.color ? { backgroundColor: tag.color + '20', color: tag.color } : undefined}
            >
              {tag.name}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}