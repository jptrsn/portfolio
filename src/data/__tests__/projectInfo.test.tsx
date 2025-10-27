import { describe, it, expect } from 'vitest'
import { sideProjects } from '../projectInfo'

describe('sideProjects', () => {
  it('exports an array of featured projects', () => {
    expect(Array.isArray(sideProjects)).toBe(true)
    expect(sideProjects.length).toBeGreaterThan(0)
  })

  it('has exactly 3 featured projects', () => {
    expect(sideProjects).toHaveLength(3)
  })

  it('contains Zip Captions project', () => {
    const zipCaptions = sideProjects.find(p => p.title === 'Zip Captions')
    expect(zipCaptions).toBeDefined()
    expect(zipCaptions?.description).toContain('captioning')
    expect(zipCaptions?.github).toBe('https://github.com/jptrsn/zip-captions')
    expect(zipCaptions?.liveUrl).toBe('https://zipcaptions.app')
    expect(zipCaptions?.link).toBe('/projects/zip-captions')
  })

  it('contains Quaid Dot Army project', () => {
    const quaidArmy = sideProjects.find(p => p.title === 'Quaid Dot Army')
    expect(quaidArmy).toBeDefined()
    expect(quaidArmy?.description).toContain('podcast')
    expect(quaidArmy?.liveUrl).toBe('https://quaid.army')
    expect(quaidArmy?.link).toBe('/projects/quaid-army')
  })

  it('contains S-G-H project', () => {
    const sgh = sideProjects.find(p => p.title === 'S-G-H')
    expect(sgh).toBeDefined()
    expect(sgh?.description).toContain('Cross-Platform')
    expect(sgh?.liveUrl).toBe('https://sushigloryhole.app')
    expect(sgh?.link).toBe('/projects/sushi-glory-hole')
  })

  it('all projects have required properties', () => {
    sideProjects.forEach(project => {
      expect(project).toHaveProperty('title')
      expect(project).toHaveProperty('description')
      expect(project).toHaveProperty('tech')
      expect(project).toHaveProperty('link')

      expect(typeof project.title).toBe('string')
      expect(typeof project.description).toBe('string')
      expect(Array.isArray(project.tech)).toBe(true)
      expect(typeof project.link).toBe('string')

      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.tech.length).toBeGreaterThan(0)
      expect(project.link).toBeTruthy()
    })
  })

  it('all projects have at least one technology', () => {
    sideProjects.forEach(project => {
      expect(project.tech.length).toBeGreaterThan(0)
      project.tech.forEach(tech => {
        expect(typeof tech).toBe('string')
        expect(tech).toBeTruthy()
      })
    })
  })

  it('all project links start with /projects/', () => {
    sideProjects.forEach(project => {
      expect(project.link).toMatch(/^\/projects\//)
    })
  })

  it('all projects with liveUrl have valid URLs', () => {
    sideProjects.forEach(project => {
      if (project.liveUrl) {
        expect(project.liveUrl).toMatch(/^https?:\/\//)
      }
    })
  })

  it('all projects with github have valid GitHub URLs', () => {
    sideProjects.forEach(project => {
      if (project.github) {
        expect(project.github).toMatch(/^https:\/\/github\.com\//)
      }
    })
  })

  it('all projects with cover have valid paths', () => {
    sideProjects.forEach(project => {
      if (project.cover) {
        expect(project.cover).toMatch(/^\//)
        expect(typeof project.cover).toBe('string')
      }
    })
  })
})