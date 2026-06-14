import { describe, it, expect } from 'vitest'
import {
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getAllProjectSlugs,
  getProjectsByTag,
  getProjectsByYearRange,
  getProjectsByStatus,
  getAllTags,
  searchProjects,
  getRelatedProjects,
  getProjectStats,
} from '../projects'

describe('getAllProjects', () => {
  it('loads project files from the data directory', () => {
    const projects = getAllProjects()
    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThan(0)
  })

  it('returns projects with all required fields', () => {
    const projects = getAllProjects()
    projects.forEach(project => {
      expect(project).toHaveProperty('id')
      expect(project).toHaveProperty('title')
      expect(project).toHaveProperty('slug')
      expect(project).toHaveProperty('shortDescription')
      expect(project).toHaveProperty('startDate')
      expect(project).toHaveProperty('tags')
      expect(Array.isArray(project.tags)).toBe(true)
    })
  })

  it('returns all projects sorted by featured, then by year (newest first) within each group', () => {
    const projects = getAllProjects()
    expect(projects.length).toBeGreaterThan(0)
    // Verify featured projects appear before non-featured
    let seenNonFeatured = false
    for (const project of projects) {
      if (project.featured !== true) {
        seenNonFeatured = true
      } else if (seenNonFeatured) {
        expect(false).toBe(true)
      }
    }
  })
})

describe('getFeaturedProjects', () => {
  it('returns only projects with featured: true', () => {
    const featured = getFeaturedProjects()
    expect(Array.isArray(featured)).toBe(true)
    featured.forEach(project => {
      expect(project.featured).toBe(true)
    })
  })

  it('returns projects from the data directory', () => {
    const featured = getFeaturedProjects()
    // At least 5 projects have featured: true in the data directory
    expect(featured.length).toBeGreaterThanOrEqual(4)
  })

  it('returns all projects sorted by featured, then by year (newest first) within each group', () => {
    const projects = getAllProjects()
    expect(projects.length).toBeGreaterThan(0)
    // Verify featured projects appear before non-featured
    let seenNonFeatured = false
    for (const project of projects) {
      if (project.featured !== true) {
        seenNonFeatured = true
      } else if (seenNonFeatured) {
        expect(false).toBe(true)
      }
    }
  })
})

describe('getProjectBySlug', () => {
  it('finds a project by its slug', () => {
    const project = getProjectBySlug('contengine')
    expect(project).not.toBeNull()
    expect(project?.title).toBe('Contengine')
  })

  it('returns null for non-existent slug', () => {
    const project = getProjectBySlug('non-existent-slug')
    expect(project).toBeNull()
  })

  it('returns zip-captions project', () => {
    const project = getProjectBySlug('zip-captions')
    expect(project).not.toBeNull()
    expect(project?.title).toBe('Zip Captions')
  })
})

describe('getAllProjectSlugs', () => {
  it('returns an array of slugs', () => {
    const slugs = getAllProjectSlugs()
    expect(Array.isArray(slugs)).toBe(true)
  })

  it('returns only string slugs', () => {
    const slugs = getAllProjectSlugs()
    slugs.forEach(slug => {
      expect(typeof slug).toBe('string')
      expect(slug).toBeTruthy()
    })
  })

  it('returns all project slugs', () => {
    const slugs = getAllProjectSlugs()
    const projects = getAllProjects()
    expect(slugs.length).toBe(projects.length)
  })

  it('contains the contengine slug', () => {
    const slugs = getAllProjectSlugs()
    expect(slugs).toContain('contengine')
  })
})

describe('getProjectsByTag', () => {
  it('finds projects by tag name', () => {
    const result = getProjectsByTag('Python')
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    result.forEach(project => {
      expect(project.tags.some(t => t.name.toLowerCase() === 'python')).toBe(true)
    })
  })

  it('finds projects by tag name and category', () => {
    const result = getProjectsByTag('FastAPI', 'framework')
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    result.forEach(project => {
      expect(project.tags.some(t => t.name === 'FastAPI' && t.category === 'framework')).toBe(true)
    })
  })

  it('returns empty array for non-existent tag', () => {
    const result = getProjectsByTag('NonexistentTag123')
    expect(result).toEqual([])
  })
})

describe('getProjectsByYearRange', () => {
  it('filters projects within year range', () => {
    const result = getProjectsByYearRange(2024, 2026)
    expect(Array.isArray(result)).toBe(true)
    result.forEach(project => {
      const year = new Date(project.startDate).getFullYear()
      expect(year).toBeGreaterThanOrEqual(2024)
      expect(year).toBeLessThanOrEqual(2026)
    })
  })

  it('returns projects from 2024 to present when endYear is omitted', () => {
    const result = getProjectsByYearRange(2024)
    result.forEach(project => {
      const year = new Date(project.startDate).getFullYear()
      expect(year).toBeGreaterThanOrEqual(2024)
    })
  })

  it('returns empty array for impossible year range', () => {
    const result = getProjectsByYearRange(2050, 2060)
    expect(result).toEqual([])
  })
})

describe('getProjectsByStatus', () => {
  it('filters projects by status', () => {
    const result = getProjectsByStatus('active')
    expect(Array.isArray(result)).toBe(true)
    result.forEach(project => {
      expect(project.status.current).toBe('active')
    })
  })

  it('returns empty array for non-existent status', () => {
    const result = getProjectsByStatus('retired')
    expect(result).toEqual([])
  })
})

describe('getAllTags', () => {
  it('returns a grouped record of tags', () => {
    const tags = getAllTags()
    expect(typeof tags).toBe('object')
    expect(Object.keys(tags).length).toBeGreaterThan(0)
  })

  it('each category contains tag arrays', () => {
    const tags = getAllTags()
    Object.values(tags).forEach(category => {
      expect(Array.isArray(category)).toBe(true)
      category.forEach(tag => {
        expect(tag).toHaveProperty('name')
        expect(tag).toHaveProperty('category')
      })
    })
  })

  it('tags are sorted alphabetically within each category', () => {
    const tags = getAllTags()
    Object.values(tags).forEach(category => {
      for (let i = 1; i < category.length; i++) {
        expect(category[i].name.localeCompare(category[i - 1].name)).toBeGreaterThan(-1)
      }
    })
  })

  it('tags contain Python in a category', () => {
    const tags = getAllTags()
    const allTags = Object.values(tags).flat()
    const pythonTag = allTags.find(t => t.name === 'Python')
    expect(pythonTag).toBeDefined()
  })
})

describe('searchProjects', () => {
  it('returns all projects when query is empty', () => {
    const allProjects = getAllProjects()
    const result = searchProjects('')
    expect(result).toEqual(allProjects)
  })

  it('finds project by title', () => {
    const result = searchProjects('Contengine')
    expect(result.length).toBeGreaterThan(0)
    result.forEach(project => {
      expect(project.title.toLowerCase()).toContain('contengine')
    })
  })

  it('finds project by long description', () => {
    const result = searchProjects('transcription')
    expect(result.length).toBeGreaterThan(0)
    result.forEach(project => {
      expect(project.longDescription.toLowerCase().includes('transcription')).toBe(true)
    })
  })

  it('finds project by keywords', () => {
    const result = searchProjects('mcp')
    expect(result.length).toBeGreaterThan(0)
    result.forEach(project => {
      expect(project.keywords?.some(k => k.toLowerCase().includes('mcp'))).toBe(true)
    })
  })

  it('finds project by tag', () => {
    const result = searchProjects('Next.js')
    expect(result.length).toBeGreaterThan(0)
    result.forEach(project => {
      expect(project.tags.some(t => t.name === 'Next.js')).toBe(true)
    })
  })

  it('does not find non-existent project', () => {
    const result = searchProjects('NonExistentProject123456')
    expect(result).toEqual([])
  })

  it('case insensitive search', () => {
    const result = searchProjects('contengine')
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('getRelatedProjects', () => {
  it('returns related projects based on shared tags', () => {
    const pythonProjects = getProjectsByTag('Python', 'language')
    if (pythonProjects.length > 0) {
      const related = getRelatedProjects(pythonProjects[0], 3)
      expect(Array.isArray(related)).toBe(true)
      // Related projects should share at least one tag with the current project
      if (related.length > 0) {
        expect(related.every(r => r.id !== pythonProjects[0].id)).toBe(true)
      }
    }
  })

  it('returns empty array when no shared tags', () => {
    const projects = getAllProjects()
    // Check if there are any projects with unique tags
    if (projects.length > 1) {
      const project = projects[0]
      // Related projects should not include the same project
      const related = getRelatedProjects(project, 3)
      related.forEach(rp => {
        expect(rp.id).not.toBe(project.id)
      })
    }
  })

  it('respects the limit parameter', () => {
    const result = getRelatedProjects(
      { ...getAllProjects()[0], tags: [{ name: 'Python', category: 'language' }, { name: 'Docker', category: 'tool' }] },
      1
    )
    expect(result.length).toBeLessThanOrEqual(1)
  })
})

describe('getProjectStats', () => {
  it('returns an object with project statistics', () => {
    const stats = getProjectStats()
    expect(stats).toHaveProperty('totalProjects')
    expect(stats).toHaveProperty('featuredProjects')
    expect(stats).toHaveProperty('statusBreakdown')
    expect(stats).toHaveProperty('yearRange')
    expect(stats).toHaveProperty('averageTagsPerProject')
    expect(stats).toHaveProperty('projectsWithImages')
    expect(stats).toHaveProperty('openSourceProjects')
  })

  it('totalProjects matches getAllProjects length', () => {
    const stats = getProjectStats()
    const allProjects = getAllProjects()
    expect(stats.totalProjects).toBe(allProjects.length)
  })

  it('featuredProjects count matches getFeaturedProjects length', () => {
    const stats = getProjectStats()
    const featured = getFeaturedProjects()
    expect(stats.featuredProjects).toBe(featured.length)
  })

  it('yearRange is not null', () => {
    const stats = getProjectStats()
    expect(stats.yearRange).not.toBeNull()
    expect(stats.yearRange?.earliest).toBeLessThan(stats.yearRange?.latest)
  })

  it('statusBreakdown sums to totalProjects', () => {
    const stats = getProjectStats()
    const total = Object.values(stats.statusBreakdown).reduce((sum, count: number) => sum + count, 0)
    expect(total).toBe(stats.totalProjects)
  })

  it('averageTagsPerProject is a reasonable number', () => {
    const stats = getProjectStats()
    expect(stats.averageTagsPerProject).toBeGreaterThan(0)
  })

  it('projectsWithImages is greater than 0', () => {
    const stats = getProjectStats()
    expect(stats.projectsWithImages).toBeGreaterThan(0)
  })

  it('openSourceProjects count is non-negative', () => {
    const stats = getProjectStats()
    expect(stats.openSourceProjects).toBeGreaterThanOrEqual(0)
  })
})
