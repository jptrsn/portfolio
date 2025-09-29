import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProjectSlugs, getProjectBySlug, getRelatedProjects } from '@/lib/projects';
import { Project, ProjectLink } from '@/types/portfolio';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const heroImage = project.images.find(img => img.isHero) || project.images[0];

  return {
    title: `${project.title} | Projects`,
    description: project.shortDescription,
    keywords: project.keywords?.join(', '),
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: heroImage ? [heroImage.url] : undefined,
    },
  };
}

// Project link component
function ProjectLinkButton({ link }: { link: ProjectLink }) {
  const getIcon = (type: ProjectLink['type']) => {
    switch (type) {
      case 'github':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'demo':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        );
      case 'video':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M6 10a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1z" />
          </svg>
        );
      case 'documentation':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
    }
  };

  const baseClasses = "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";

  if (!link.isAvailable) {
    return (
      <div className={`${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed`}>
        {getIcon(link.type)}
        {link.label}
        {link.note && (
          <span className="text-xs opacity-75">({link.note})</span>
        )}
      </div>
    );
  }

  const linkClasses = link.type === 'github'
    ? `${baseClasses} bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600`
    : `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClasses}
    >
      {getIcon(link.type)}
      {link.label}
    </a>
  );
}

// Image gallery component
function ImageGallery({ project }: { project: Project }) {
  if (project.images.length === 0) return null;

  const heroImage = project.images.find(img => img.isHero) || project.images[0];
  const galleryImages = project.images.filter(img => img !== heroImage);

  return (
    <div className="mb-12">
      {/* Hero image */}
      <div className="mb-6">
        <Image
          src={heroImage.url}
          alt={heroImage.alt}
          width={800}
          height={450}
          className="w-full h-64 md:h-96 object-cover rounded-lg"
          priority
        />
        {heroImage.caption && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            {heroImage.caption}
          </p>
        )}
      </div>

      {/* Additional images */}
      {galleryImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="aspect-video">
              <Image
                src={image.url}
                alt={image.alt}
                width={300}
                height={200}
                className="w-full h-full object-cover rounded-lg"
              />
              {image.caption && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Related projects component
function RelatedProjects({ currentProject }: { currentProject: Project }) {
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

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/projects" className="hover:text-gray-700 dark:hover:text-gray-200">
          Projects
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">{project.title}</span>
      </nav>

      {/* Project Header */}
      <header className="mb-12">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {project.shortDescription}
            </p>
          </div>
          <div className="text-right flex-shrink-0 ml-6">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {project.year}
            </div>
            {project.metadata.duration && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {project.metadata.duration}
              </div>
            )}
          </div>
        </div>

        {/* Status and metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`px-3 py-1 text-sm rounded-full font-medium ${
            project.status.current === 'active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : project.status.current === 'completed'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}>
            {project.status.current.charAt(0).toUpperCase() + project.status.current.slice(1)}
          </span>

          {project.featured && (
            <span className="px-3 py-1 text-sm rounded-full font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              Featured
            </span>
          )}

          {project.hasCustomHardware && (
            <span className="px-3 py-1 text-sm rounded-full font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              Custom Hardware
            </span>
          )}

          {project.isOpenSource && (
            <span className="px-3 py-1 text-sm rounded-full font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              Open Source
            </span>
          )}

          {project.metadata.teamSize && project.metadata.teamSize > 1 && (
            <span className="px-3 py-1 text-sm rounded-full font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
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
      <ImageGallery project={project} />

      {/* Project Description */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <div className="whitespace-pre-wrap">
          {project.longDescription}
        </div>
      </div>

      {/* Technologies */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Technologies Used
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tags grouped by category */}
          {Object.entries(
            project.tags.reduce((acc, tag) => {
              if (!acc[tag.category]) acc[tag.category] = [];
              acc[tag.category].push(tag);
              return acc;
            }, {} as Record<string, typeof project.tags>)
          ).map(([category, tags]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 capitalize">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={`${tag.name}-${index}`}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
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
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3">
              Challenges
            </h3>
            <p className="text-red-800 dark:text-red-200">
              {project.challenges}
            </p>
          </div>
        )}

        {project.learnings && (
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
              Key Learnings
            </h3>
            <p className="text-green-800 dark:text-green-200">
              {project.learnings}
            </p>
          </div>
        )}
      </div>

      {project.futureImprovements && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-12">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Future Improvements
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            {project.futureImprovements}
          </p>
        </div>
      )}

      {/* Project Metadata */}
      {project.metadata && (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Project Details
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <dt className="font-medium text-gray-500 dark:text-gray-400">Difficulty</dt>
              <dd className="mt-1 text-gray-900 dark:text-white capitalize">{project.metadata.difficulty}</dd>
            </div>
            {project.metadata.teamSize && (
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Team Size</dt>
                <dd className="mt-1 text-gray-900 dark:text-white">{project.metadata.teamSize}</dd>
              </div>
            )}
            {project.metadata.duration && (
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Duration</dt>
                <dd className="mt-1 text-gray-900 dark:text-white">{project.metadata.duration}</dd>
              </div>
            )}
            {project.metadata.role && (
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Role</dt>
                <dd className="mt-1 text-gray-900 dark:text-white">{project.metadata.role}</dd>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Related Projects */}
      <RelatedProjects currentProject={project} />

      {/* Back to projects link */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
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