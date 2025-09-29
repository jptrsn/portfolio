import Navigation from '@/components/Navigation';
import ProjectCard from '@/components/ProjectCard';
import { generateExtendedMetadata } from '@/lib/metadata';
import { getAllProjects, getAllTechnologies } from '@/lib/projects';
import { Metadata } from 'next';

export const metadata: Metadata = generateExtendedMetadata({
  title: 'Projects | EduCoder Dot Dev',
  description: 'Explore my software development projects, from web applications to IoT solutions.',
});



export default function ProjectsPage() {
  const allProjects = getAllProjects();

  // This would typically be handled with client-side state or URL params
  // For now, showing all projects
  const selectedFilter = 'all';
  const filteredProjects = allProjects;

  return (
    <div className="min-h-screen bg-background text-foreground">

      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of software development projects spanning web applications, mobile apps,
            IoT solutions, and hardware integrations. From concept to deployment, from messing around
            to maintaining long-term.
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
    </div>
  );
}