import { describe, it, expect } from 'vitest'
import { getSkillsData } from '../skill'

describe('getSkillsData', () => {
  it('returns an array of skills', () => {
    const skills = getSkillsData()
    expect(Array.isArray(skills)).toBe(true)
  })

  it('returns skills with required properties', () => {
    const skills = getSkillsData()

    if (skills.length > 0) {
      const skill = skills[0]
      expect(skill).toHaveProperty('id')
      expect(skill).toHaveProperty('label')
      expect(skill).toHaveProperty('category')
      expect(skill).toHaveProperty('relatedTo')
    }
  })

  it('ensures all skill ids are unique', () => {
    const skills = getSkillsData()
    const ids = skills.map(s => s.id)
    const uniqueIds = new Set(ids)

    expect(uniqueIds.size).toBe(ids.length)
  })

  it('validates category values', () => {
    const skills = getSkillsData()
    const validCategories = ['language', 'framework', 'database', 'tool', 'platform', 'concept']

    skills.forEach(skill => {
      expect(validCategories).toContain(skill.category)
    })
  })

  it('validates proficiency levels when present', () => {
    const skills = getSkillsData()
    const validLevels = ['beginner', 'intermediate', 'advanced', 'expert']

    skills.forEach(skill => {
      if (skill.proficiencyLevel) {
        expect(validLevels).toContain(skill.proficiencyLevel)
      }
    })
  })

  it('ensures relatedTo references valid skill ids', () => {
    const skills = getSkillsData()
    const allIds = new Set(skills.map(s => s.id))

    skills.forEach(skill => {
      skill.relatedTo.forEach(relatedId => {
        expect(allIds.has(relatedId)).toBe(true)
      })
    })
  })
})