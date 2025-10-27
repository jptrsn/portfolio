import { describe, it, expect } from 'vitest'
import { skills, skillsData } from '../skills'

describe('skills', () => {
  it('exports an array of skills', () => {
    expect(Array.isArray(skills)).toBe(true)
    expect(skills.length).toBeGreaterThan(0)
  })

  it('has exactly 5 skill categories', () => {
    expect(skills).toHaveLength(5)
  })

  it('all skills have required properties', () => {
    skills.forEach(skill => {
      expect(skill).toHaveProperty('icon')
      expect(skill).toHaveProperty('name')
      expect(skill).toHaveProperty('description')

      expect(typeof skill.name).toBe('string')
      expect(typeof skill.description).toBe('string')
      expect(skill.name).toBeTruthy()
      expect(skill.description).toBeTruthy()
    })
  })

  it('all icons are React elements', () => {
    skills.forEach(skill => {
      expect(skill.icon).toBeDefined()
      expect(typeof skill.icon).toBe('object')
    })
  })

  it('contains Full Stack Development skill', () => {
    const fullStack = skills.find(s => s.name === 'Full Stack Development')
    expect(fullStack).toBeDefined()
    expect(fullStack?.description).toContain('React')
  })

  it('contains Cross-Platform Compatibility skill', () => {
    const crossPlatform = skills.find(s => s.name === 'Cross-Platform Compatibility')
    expect(crossPlatform).toBeDefined()
    expect(crossPlatform?.description).toContain('Web')
  })
})

describe('skillsData', () => {
  it('exports an array of skill nodes', () => {
    expect(Array.isArray(skillsData)).toBe(true)
    expect(skillsData.length).toBeGreaterThan(0)
  })

  it('all skill nodes have required properties', () => {
    skillsData.forEach(skill => {
      expect(skill).toHaveProperty('id')
      expect(skill).toHaveProperty('label')
      expect(skill).toHaveProperty('category')
      expect(skill).toHaveProperty('relatedTo')

      expect(typeof skill.id).toBe('string')
      expect(typeof skill.label).toBe('string')
      expect(typeof skill.category).toBe('string')
      expect(Array.isArray(skill.relatedTo)).toBe(true)

      expect(skill.id).toBeTruthy()
      expect(skill.label).toBeTruthy()
      expect(skill.category).toBeTruthy()
    })
  })

  it('all skill categories are valid', () => {
    const validCategories = ['framework', 'language', 'database', 'tool', 'platform', 'concept']
    skillsData.forEach(skill => {
      expect(validCategories).toContain(skill.category)
    })
  })

  it('all proficiency levels are valid when present', () => {
    const validLevels = ['beginner', 'intermediate', 'advanced', 'expert']
    skillsData.forEach(skill => {
      if (skill.proficiencyLevel) {
        expect(validLevels).toContain(skill.proficiencyLevel)
      }
    })
  })

  it('contains TypeScript skill', () => {
    const typescript = skillsData.find(s => s.id === 'typescript')
    expect(typescript).toBeDefined()
    expect(typescript?.label).toBe('TypeScript')
    expect(typescript?.category).toBe('language')
    expect(typescript?.proficiencyLevel).toBe('expert')
  })

  it('contains React skill', () => {
    const react = skillsData.find(s => s.id === 'react')
    expect(react).toBeDefined()
    expect(react?.label).toBe('React')
    expect(react?.category).toBe('framework')
  })

  it('all skill IDs are unique', () => {
    const ids = skillsData.map(s => s.id)
    const uniqueIds = new Set(ids)
    expect(ids.length).toBe(uniqueIds.size)
  })

  it('all relatedTo references point to existing skills', () => {
    const allIds = new Set(skillsData.map(s => s.id))

    skillsData.forEach(skill => {
      skill.relatedTo.forEach(relatedId => {
        expect(allIds.has(relatedId)).toBe(true)
      })
    })
  })

  it('has skills in multiple categories', () => {
    const categories = new Set(skillsData.map(s => s.category))
    expect(categories.size).toBeGreaterThan(1)
    expect(categories.has('framework')).toBe(true)
    expect(categories.has('language')).toBe(true)
    expect(categories.has('database')).toBe(true)
  })

  it('has at least one expert level skill', () => {
    const expertSkills = skillsData.filter(s => s.proficiencyLevel === 'expert')
    expect(expertSkills.length).toBeGreaterThan(0)
  })
})