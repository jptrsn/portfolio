import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/types';
import { dateStringToYear } from '@/lib/posts';

export default function ProjectCard({ project }: { project: Project }) {
  const heroImage = project.images.find(img => img.isHero) || project.images[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-lg overflow-hidden border border-neutral-700 hover:border-neutral-600 transition-all duration-200 hover:shadow-lg hover:scale-[1.05]"
    >
      <div className="min-h-[350] h-full relative flex flex-col">
        { heroImage && (
          <>
          <Image
            src={heroImage.url}
            alt={heroImage.alt}
            fill={true}
            className="object-cover object-top"
           />
           <div className="basis-1/2 min-h-48"></div>
           </>
        )}
        <div className="p-6 bg-neutral-700/80 hover:bg-neutral-700/95 relative flex flex-col basis-full justify-between">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-neutral-300 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <span className="text-sm ml-2 flex-shrink-0">
              {dateStringToYear(project.startDate)}
            </span>
          </div>

          <p className="text-neutral-200 text-sm mb-4 line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Status indicators */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2 py-1 text-xs rounded-full ${
              project.status.current === 'active'
                ? 'bg-secondary-100 text-secondary-800'
                : project.status.current === 'completed'
                ? 'bg-primary-100 text-primary-800 '
                : 'bg-neutral-100 text-neutral-800 '
            }`}>
              {project.status.current}
            </span>

            {project.hasCustomHardware && (
              <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 ">
                Hardware
              </span>
            )}
          </div>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 4).map((tag, index) => (
              <span
                key={`${tag.name}-${tag.category}-${index}`}
                className="px-2 py-1 text-xs bg-secondary-900 text-secondary-200 rounded"
                style={tag.color ? { backgroundColor: tag.color + '20', color: tag.color } : undefined}
              >
                {tag.name}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-1 text-xs bg-neutral-100 text-neutral-500 rounded">
                +{project.tags.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}