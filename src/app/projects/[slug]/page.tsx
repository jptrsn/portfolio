import ProjectImageGallery from '@/components/ProjectImageGallery';
import ProjectLinkButton from '@/components/ProjectLink';
import RelatedProjects from '@/components/RelatedProjects';
import { generateExtendedMetadata } from '@/lib/metadata';
import { dateStringToYear } from '@/lib/posts';
import { getAllProjectSlugs, getProjectBySlug } from '@/lib/projects';
import { Metadata } from 'next';

import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const heroImage = project.images.find(img => img.isHero) || project.images[0];

  return generateExtendedMetadata({
    title: `${project.title} | Projects`,
    description: project.shortDescription,
    image: heroImage ? heroImage.url : undefined,
  });
}


export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-neutral-500 mb-8">
        <Link href="/projects" className="hover:text-neutral-200">
          Projects
        </Link>
        <span>/</span>
        <span className="text-neutral-600">{project.title}</span>
      </nav>

      {/* Project Header */}
      <header className="mb-12">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-primary-500 mb-2">
              {project.title}
            </h1>
            <p className="text-xl text-neutral-500 ">
              {project.shortDescription}
            </p>
          </div>
          <div className="text-right flex-shrink-0 ml-6">
            <div className="text-2xl font-bold text-neutral-600">
              {dateStringToYear(project.startDate)}
            </div>
            {project.metadata.duration && (
              <div className="text-sm text-neutral-700">
                {project.metadata.duration}
              </div>
            )}
          </div>
        </div>

        {/* Status and metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`px-3 py-1 text-sm rounded-full font-medium ${
            project.status.current === 'active'
              ? 'bg-primary-100 text-primary-800'
              : project.status.current === 'completed'
              ? 'bg-neutral-100 text-neutral-800'
              : 'bg-secondary-100 text-secondary-800'
          }`}>
            {project.status.current.charAt(0).toUpperCase() + project.status.current.slice(1)}
          </span>

          {project.hasCustomHardware && (
            <span className="px-3 py-1 text-sm rounded-full font-medium bg-purple-100 text-purple-800">
              Custom Hardware
            </span>
          )}

          {project.isOpenSource && (
            <span className="px-3 py-1 text-sm rounded-full font-medium bg-emerald-100 text-emerald-800">
              Open Source
            </span>
          )}

          {project.metadata.teamSize && project.metadata.teamSize > 1 && (
            <span className="px-3 py-1 text-sm rounded-full font-medium bg-indigo-100 text-indigo-800">
              Team of {project.metadata.teamSize}
            </span>
          )}
        </div>

        {/* Project links */}
        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            {project.links.map((link, index) => (
              <ProjectLinkButton key={index} link={link} />
            ))}
          </div>
        )}
      </header>

      {/* Image Gallery */}
      <ProjectImageGallery project={project} />

      {/* Project Description */}
      <div className="prose prose-lg max-w-none mb-12">
        <div className="whitespace-pre-wrap">
          {project.longDescription}
        </div>
      </div>

      {/* Technologies */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-secondary-500 mb-6">
          Technologies Used
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tags grouped by category */}
          {Object.entries(
            project.tags.reduce((acc, tag) => {
              if (!acc[tag.category]) acc[tag.category] = [];
              acc[tag.category].push(tag);
              return acc;
            }, {} as Record<string, typeof project.tags>)
          ).map(([category, tags]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-secondary-200 mb-3 capitalize">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={`${tag.name}-${index}`}
                    className="px-3 py-1 bg-neutral-700 text-neutral-200 rounded-full text-sm font-medium"
                    style={tag.color ? { backgroundColor: tag.color + '20', color: tag.color } : undefined}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {project.challenges && (
          <div className="bg-primary-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-primary-900 mb-3">
              Challenges
            </h3>
            <p className="text-primary-800">
              {project.challenges}
            </p>
          </div>
        )}

        {project.learnings && (
          <div className="bg-secondary-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-secondary-900 mb-3">
              Key Learnings
            </h3>
            <p className="text-secondary-800">
              {project.learnings}
            </p>
          </div>
        )}
      </div>

      {project.futureImprovements && (
        <div className="bg-blue-50 p-6 rounded-lg mb-12">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Future Improvements
          </h3>
          <p className="text-blue-800">
            {project.futureImprovements}
          </p>
        </div>
      )}

      {/* Project Metadata */}
      {project.metadata && (
        <div className="bg-neutral-200 p-6 rounded-lg mb-12">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            Project Details
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <dt className="font-medium text-neutral-500">Difficulty</dt>
              <dd className="mt-1 text-neutral-900 capitalize">{project.metadata.difficulty}</dd>
            </div>
            {project.metadata.teamSize && project.metadata.teamSize > 1 && (
              <div>
                <dt className="font-medium text-neutral-500">Team Size</dt>
                <dd className="mt-1 text-neutral-900 ">{project.metadata.teamSize}</dd>
              </div>
            )}
            {project.metadata.duration && (
              <div>
                <dt className="font-medium text-neutral-500">Duration</dt>
                <dd className="mt-1 text-neutral-900 ">{project.metadata.duration}</dd>
              </div>
            )}
            {project.metadata.role && (
              <div>
                <dt className="font-medium text-neutral-500">Role</dt>
                <dd className="mt-1 text-gray-900">{project.metadata.role}</dd>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Related Projects */}
      <RelatedProjects currentProject={project} />

      {/* Back to projects link */}
      <div className="mt-12 pt-8 border-t border-gray-20">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all projects
        </Link>
      </div>
    </div>
  );
}