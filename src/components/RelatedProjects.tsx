import { getRelatedProjects } from "@/lib/projects";
import { Project } from "@/types/types";
import Image from 'next/image';
import Link from "next/link";

interface RelatedProjectsProps {
  currentProject: Project
}

// Related projects component
export default function RelatedProjects({ currentProject }: RelatedProjectsProps) {
  const relatedProjects = getRelatedProjects(currentProject, 3);
  console.log('relatedProjects', relatedProjects)

  if (relatedProjects.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-gray-200 bg-gradient-primary">
      <h3 className="text-2xl font-bold text-neutral-500 mb-8">
        Related Projects
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProjects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group block bg-neutral-700 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg"
          >
            <div className="rounded-t-lg">
              {project.images.length > 0 ? (
                <Image
                  src={project.images.find(img => img.isHero)?.url || project.images[0].url}
                  alt={project.images.find(img => img.isHero)?.alt || project.images[0].alt}
                  width={300}
                  height={180}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200" />
              )}
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors mb-2">
                {project.title}
              </h4>
              <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={`${tag.name}-${tag.category}-${index}`}
                    className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded"
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