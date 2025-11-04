//src/app/types/types.ts
import { JSX } from "react";

export interface ContactInfo {
  icon: JSX.Element;
  label: string;
  value: string;
  href: string;
}

export interface Skill {
  icon: JSX.Element;
  name: string;
  description: string;
  relatedTech?: string[];
}

export interface TechnicalUnderstanding {
  icon: JSX.Element;
  id: string;
  name: string;
  description: string;
}

export interface FeaturedProject {
  title: string;
  cover?: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
  liveUrl?: string;
}

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
  startDate: string; // ISO date string for more precision
  endDate?: string; // For projects with defined end dates

  // Visual assets
  images: ProjectImage[];
  thumbnailUrl?: string; // Fallback if no hero image

  // Technical details
  tags: ProjectTag[];

  // Links and availability
  links: ProjectLink[];

  // Project context
  status: ProjectStatus;
  metadata: ProjectMetadata;

  // Additional content
  challenges?: string; // What problems you solved
  learnings?: string; // What you learned from the project
  futureImprovements?: string; // What you'd do differently

  // SEO and discovery
  keywords?: string[]; // For search functionality
  featured?: boolean; // Highlight on main projects page

  // Content flags
  hasCustomHardware?: boolean;
  requiresSpecialSetup?: boolean;
  isOpenSource?: boolean;
}

// Root schema for the projects data file
export interface PortfolioData {
  projects: Project[];
  lastUpdated: string; // ISO date string
  version: string; // Schema version for migrations
}

// Example usage and validation helpers
export const validateProject = (project: Project): boolean => {
  return !!(
    project.id &&
    project.title &&
    project.slug &&
    project.startDate &&
    project.shortDescription &&
    project.longDescription &&
    project.tags.length > 0
  );
};

// Utility types for filtering and display
export type ProjectCategory = ProjectTag['category'];
export type ProjectStatusType = ProjectStatus['current'];

export interface SkillNode {
  id: string;
  label: string;
  category: 'framework' | 'language' | 'database' | 'tool' | 'platform' | 'concept';
  proficiencyLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  relatedTo: string[]; // Array of skill IDs this node connects to
  description?: string;
}