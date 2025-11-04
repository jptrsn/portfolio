import { Project, ProjectTag } from '@/types/portfolio'; // Adjust import path as needed
import fs from 'fs';
import path from 'path';

const PROJECTS_DIRECTORY = path.join(process.cwd(), 'src/data/projects');

/**
 * Get all project files from the data directory
 */
function getProjectFiles(): string[] {
  try {
    const files = fs.readdirSync(PROJECTS_DIRECTORY);
    return files.filter(file => file.endsWith('.json'));
  } catch (error) {
    console.error('Error reading projects directory:', error);
    return [];
  }
}

/**
 * Load and parse a single project file
 */
function loadProjectFile(filename: string): Project | null {
  try {
    const filePath = path.join(PROJECTS_DIRECTORY, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const projectData = JSON.parse(fileContents) as Project;

    // Basic validation
    if (!projectData.id || !projectData.title || !projectData.slug) {
      console.error(`Invalid project data in ${filename}: missing required fields`);
      return null;
    }

    return projectData;
  } catch (error) {
    console.error(`Error loading project file ${filename}:`, error);
    return null;
  }
}

/**
 * Get all projects, sorted by year (newest first) and featured status
 */
export function getAllProjects(): Project[] {
  const projectFiles = getProjectFiles();
  const projects: Project[] = [];

  for (const filename of projectFiles) {
    const project = loadProjectFile(filename);
    if (project) {
      projects.push(project);
    }
  }

  // Sort by featured status first, then by year (newest first)
  return projects.sort((a, b) => {
    // Featured projects first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    // Then by year (newest first)
    const aYear = new Date(a.startDate).getFullYear();
    const bYear = new Date(b.startDate).getFullYear();
    return bYear - aYear;
  });
}

/**
 * Get featured projects only
 */
export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter(project => project.featured === true);
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | null {
  const projectFiles = getProjectFiles();

  for (const filename of projectFiles) {
    const project = loadProjectFile(filename);
    if (project && project.slug === slug) {
      return project;
    }
  }

  return null;
}

/**
 * Get all unique project slugs for static generation
 */
export function getAllProjectSlugs(): string[] {
  const projects = getAllProjects();
  return projects.map(project => project.slug);
}

/**
 * Get projects filtered by tag name or category
 */
export function getProjectsByTag(tagName: string, category?: string): Project[] {
  const projects = getAllProjects();

  return projects.filter(project =>
    project.tags.some(tag => {
      const nameMatch = tag.name.toLowerCase() === tagName.toLowerCase();
      const categoryMatch = !category || tag.category === category;
      return nameMatch && categoryMatch;
    })
  );
}

/**
 * Get projects filtered by year range
 */
export function getProjectsByYearRange(startYear: number, endYear?: number): Project[] {
  const projects = getAllProjects();
  const end = endYear || new Date().getFullYear();

  return projects.filter(project => {
    const projYear = new Date(project.startDate).getFullYear();
    return (projYear >= startYear && projYear <= end);
  }
  );
}

/**
 * Get projects filtered by status
 */
export function getProjectsByStatus(status: Project['status']['current']): Project[] {
  const projects = getAllProjects();
  return projects.filter(project => project.status.current === status);
}

/**
 * Get all unique tags across all projects, grouped by category
 */
export function getAllTags(): Record<string, ProjectTag[]> {
  const projects = getAllProjects();
  const tagsMap = new Map<string, ProjectTag>();

  projects.forEach(project => {
    project.tags.forEach(tag => {
      const key = `${tag.name}-${tag.category}`;
      if (!tagsMap.has(key)) {
        tagsMap.set(key, tag);
      }
    });
  });

  const allTags = Array.from(tagsMap.values());

  // Group by category
  const groupedTags: Record<string, ProjectTag[]> = {};
  allTags.forEach(tag => {
    if (!groupedTags[tag.category]) {
      groupedTags[tag.category] = [];
    }
    groupedTags[tag.category].push(tag);
  });

  // Sort tags within each category
  Object.keys(groupedTags).forEach(category => {
    groupedTags[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  return groupedTags;
}

/**
 * Search projects by title, description, or keywords
 */
export function searchProjects(query: string): Project[] {
  const projects = getAllProjects();
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) return projects;

  return projects.filter(project => {
    const titleMatch = project.title.toLowerCase().includes(searchTerm);
    const shortDescMatch = project.shortDescription.toLowerCase().includes(searchTerm);
    const longDescMatch = project.longDescription.toLowerCase().includes(searchTerm);
    const keywordMatch = project.keywords?.some(keyword =>
      keyword.toLowerCase().includes(searchTerm)
    ) || false;
    const tagMatch = project.tags.some(tag =>
      tag.name.toLowerCase().includes(searchTerm)
    );

    return titleMatch || shortDescMatch || longDescMatch || keywordMatch || tagMatch;
  });
}

/**
 * Get related projects based on shared tags
 */
export function getRelatedProjects(currentProject: Project, limit: number = 3): Project[] {
  const allProjects = getAllProjects().filter(p => p.id !== currentProject.id);

  // Score projects based on shared tags
  const scoredProjects = allProjects.map(project => {
    let score = 0;

    // Score for shared tags (weighted by category)
    const tagWeights = {
      framework: 3,
      language: 2,
      platform: 2,
      database: 1,
      tool: 1,
      hardware: 3,
      other: 1
    };

    project.tags.forEach(tag => {
      if (currentProject.tags.some(currentTag =>
        currentTag.name === tag.name && currentTag.category === tag.category
      )) {
        score += tagWeights[tag.category] || 1;
      }
    });

    return { project, score };
  });

  // Sort by score and return top results
  return scoredProjects
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ project }) => project);
}

/**
 * Get project statistics
 */
export function getProjectStats() {
  const projects = getAllProjects();

  const statusCounts = projects.reduce((acc, project) => {
    const status = project.status.current;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const yearRange = projects.reduce((acc, project) => {
    const projectYear = new Date(project.startDate).getFullYear();
    return {
      earliest: Math.min(acc.earliest, projectYear),
      latest: Math.max(acc.latest, projectYear)
    };
  }, { earliest: Infinity, latest: -Infinity });

  const averageTagsPerProject = projects.reduce((sum, project) =>
    sum + project.tags.length, 0) / projects.length;

  return {
    totalProjects: projects.length,
    featuredProjects: projects.filter(p => p.featured).length,
    statusBreakdown: statusCounts,
    yearRange: yearRange.earliest === Infinity ? null : yearRange,
    averageTagsPerProject: Math.round(averageTagsPerProject * 10) / 10,
    projectsWithImages: projects.filter(p => p.images.length > 0).length,
    openSourceProjects: projects.filter(p => p.isOpenSource).length
  };
}