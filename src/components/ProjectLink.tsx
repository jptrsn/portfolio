import { ProjectLink } from "@/types/types";

interface ProjectLinkButtonProps {
  link: ProjectLink
}

// Project link component
export default function ProjectLinkButton({ link }: ProjectLinkButtonProps) {
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
      <div className={`${baseClasses} bg-neutral-100 dark:bg-neutral-700 text-gray-400 dark:text-gray-500 cursor-not-allowed`}>
        {getIcon(link.type)}
        {link.label}
        {link.note && (
          <span className="text-xs opacity-75">({link.note})</span>
        )}
      </div>
    );
  }

  const linkClasses = link.type === 'github'
    ? `${baseClasses} bg-neutral-900 dark:bg-neutral-700 text-white hover:bg-neutral-800 dark:hover:bg-neutral-600`
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