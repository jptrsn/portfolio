import { getRelatedProjects } from "@/lib/projects";
import { Project } from "@/types/types";
import { Link } from "lucide-react";
import Image from 'next/image';

interface RelatedProjectsProps {
  currentProject: Project
}

// Related projects component
export default function RelatedProjects({ currentProject }: RelatedProjectsProps) {
  const relatedProjects = getRelatedProjects(currentProject, 3);

  if (relatedProjects.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Related Projects
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProjects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-lg"
          >
            <div className="overflow-hidden rounded-t-lg">
              {project.images.length > 0 ? (
                <Image
                  src={project.images.find(img => img.isHero)?.url || project.images[0].url}
                  alt={project.images.find(img => img.isHero)?.alt || project.images[0].alt}
                  width={300}
                  height={180}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600" />
              )}
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                {project.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={`${tag.name}-${tag.category}-${index}`}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}