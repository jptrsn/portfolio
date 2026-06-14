import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/types/types';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface FeaturedProjectsGridProps {
  projects: Project[];
}

export default function FeaturedProjectsGrid({ projects }: FeaturedProjectsGridProps) {
  return (
    <section id="projects" className="py-20 px-6 bg-primary-900/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Side Projects</span>
          </h2>
          <p className="text-primary-400 max-w-2xl mx-auto mb-4">
            A selection of recent work and play showcasing full-stack development,
            system design, and problem-solving capabilities.
          </p>
          <Link
            href={'/projects'}
            className="inline-flex flex-row gap-3 cursor-pointer bg-neutral-900/50 border rounded-lg p-4 transition-all duration-300 hover:scale-105 border-primary-700 ring-2 ring-primary-500/20 hover:border-primary-500"
          >
            <span>View All Projects</span>
            <ChevronRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0,3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
