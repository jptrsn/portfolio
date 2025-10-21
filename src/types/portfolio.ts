// TypeScript interfaces for the portfolio schema
export interface ProjectTag {
  name: string;
  category: 'language' | 'framework' | 'database' | 'tool' | 'platform' | 'hardware' | 'other';
  color?: string; // Optional hex color for UI display
}

export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
  isHero?: boolean; // Main project image
}

export interface ProjectLink {
  type: 'github' | 'demo' | 'download' | 'documentation' | 'blog' | 'video' | 'other';
  url: string;
  label: string;
  isAvailable: boolean; // For handling aged-out or unavailable links
  note?: string; // Explanation if not available
}

export interface ProjectStatus {
  current: 'active' | 'completed' | 'archived' | 'concept';
  deploymentStatus?: 'live' | 'offline' | 'local-only' | 'requires-hardware';
  maintenanceLevel?: 'maintained' | 'legacy' | 'deprecated';
}

export interface ProjectMetadata {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  teamSize?: number;
  duration?: string; // e.g., "2 months", "1 week"
  role?: string; // Your role if team project
}

export interface Project {
  id: string; // Unique identifier for routing
  title: string;
  slug: string; // URL-friendly version for Next.js dynamic routing

  // Descriptions
  shortDescription: string; // For project list/cards (1-2 sentences)
  longDescription: string; // Detailed description (supports markdown)

  // Temporal info
  year: number;
  startDate?: string; // ISO date string for more precision
  endDate?: string; // For projects with defined end dates

  // Visual assets
  images: ProjectImage[];
  thumbnailUrl?: string; // Fallback if no hero image

  // Technical details
  tags: ProjectTag[];
  technologies: string[]; // Flat array for simpler filtering

  // Links and availability
  links: ProjectLink[];

  // Project context
  status: ProjectStatus;
  metadata: ProjectMetadata;

  featured?: boolean;

  // Additional content
  challenges?: string; // What problems you solved
  learnings?: string; // What you learned from the project
  futureImprovements?: string; // What you'd do differently

  // SEO and discovery
  keywords?: string[]; // For search functionality

  // Content flags
  hasCustomHardware?: boolean;
  requiresSpecialSetup?: boolean;
  isOpenSource?: boolean;
}

// Root schema for the projects data file (if you prefer a single file approach)
export interface PortfolioData {
  projects: Project[];
  lastUpdated: string; // ISO date string
  version: string; // Schema version for migrations
}

// Utility types for filtering and display
export type ProjectCategory = ProjectTag['category'];
export type ProjectStatusType = ProjectStatus['current'];
export type ProjectDifficulty = ProjectMetadata['difficulty'];

// Search and filter types
export interface ProjectFilters {
  status?: ProjectStatusType[];
  categories?: ProjectCategory[];
  technologies?: string[];
  yearRange?: {
    start: number;
    end: number;
  };
  difficulty?: ProjectDifficulty[];
  hasHardware?: boolean;
  isOpenSource?: boolean;
  featured?: boolean;
}

export interface ProjectSearchParams {
  query?: string;
  filters?: ProjectFilters;
  sortBy?: 'year' | 'title' | 'featured';
  sortOrder?: 'asc' | 'desc';
}