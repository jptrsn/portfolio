import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProjects, getAllTags, getAllTechnologies } from '@/lib/projects';
import { Project } from '@/types/portfolio';

export const metadata: Metadata = {
  title: 'Projects | Your Portfolio',
  description: 'Explore my software development projects, from web applications to IoT solutions.',
};

// Project card component
function ProjectCard({ project }: { project: Project }) {
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

// Filter component
function ProjectFilters({
  projects,
  selectedFilter,
  onFilterChange
}: {
  projects: Project[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}) {
  const statusCounts = projects.reduce((acc, project) => {
    const status = project.status.current;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filters = [
    { key: 'all', label: 'All Projects', count: projects.length },
    { key: 'featured', label: 'Featured', count: projects.filter(p => p.featured).length },
    { key: 'active', label: 'Active', count: statusCounts.active || 0 },
    { key: 'completed', label: 'Completed', count: statusCounts.completed || 0 },
    { key: 'hardware', label: 'Hardware', count: projects.filter(p => p.hasCustomHardware).length },
  ].filter(filter => filter.count > 0);

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedFilter === filter.key
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const allProjects = getAllProjects();

  // This would typically be handled with client-side state or URL params
  // For now, showing all projects
  const selectedFilter = 'all';
  const filteredProjects = allProjects;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          My Projects
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A collection of software development projects spanning web applications, mobile apps,
          IoT solutions, and hardware integrations. From concept to deployment.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {allProjects.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Total Projects</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {allProjects.filter(p => p.featured).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Featured</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {allProjects.filter(p => p.hasCustomHardware).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Hardware Projects</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {getAllTechnologies().length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Technologies</div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No projects found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}