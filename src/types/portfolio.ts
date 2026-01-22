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

// Utility types for filtering and display
export type ProjectCategory = ProjectTag['category'];
export type ProjectStatusType = ProjectStatus['current'];
export type ProjectDifficulty = ProjectMetadata['difficulty'];

// Search and filter types
export interface ProjectFilters {
  status?: ProjectStatusType[];
  categories?: ProjectCategory[];
  yearRange?: {
    start: number;
    end: number;
  };
  difficulty?: ProjectDifficulty[];
  hasHardware?: boolean;
  isOpenSource?: boolean;
  featured?: boolean;
}

