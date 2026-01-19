import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, ExternalLink } from 'lucide-react';
import { BrandIcon } from '@/components/BrandIcon';
import { FeaturedProject } from '@/types/types';

interface ProjectsSectionProps {
  projects: FeaturedProject[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
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
            className={`inline-flex flex-row gap-3 cursor-pointer bg-neutral-900/50 border rounded-lg p-4 transition-all duration-300 hover:scale-105 border-primary-700 ring-2 ring-primary-500/20 hover:border-primary-500`}
            >
              <span>View All Projects</span>
              <ChevronRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={project.title} className="group">
              <div className="relative h-full bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105">
                {/* Background image for entire card */}
                {project.cover && (
                  <Image
                    src={project.cover}
                    alt={`${project.title} cover image`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                )}

                {/* Overlay to ensure content readability */}
                <div className="absolute inset-0 bg-neutral-900/80 group-hover:bg-neutral-900/70 transition-all duration-300" />

                {/* Content container - positioned relative to stay above background */}
                <div className="relative z-10 min-h-[500px] flex flex-col justify-between">
                  {/* Decorative gradient overlay */}
                  <div className="h-48 gradient-secondary opacity-20 group-hover:opacity-30 transition-opacity" />

                  {/* Project content */}
                  <div className="p-6 bg-neutral-800/75">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-neutral-400 text-sm mb-4">{project.description}</p>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="bg-secondary-500/10 text-secondary-400 px-2 py-1 rounded text-xs border border-secondary-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action links */}
                    <div className="flex items-center gap-4">
                      <Link
                        href={project.link}
                        className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center transition-colors"
                      >
                        View Details <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>

                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Project <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      )}

                      {project.github && (
                        <Link
                          href={project.github}
                          className="text-neutral-400 hover:text-neutral-300 transition-colors ml-auto"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <BrandIcon name="github" className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}