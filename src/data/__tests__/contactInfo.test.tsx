import { describe, it, expect } from 'vitest'
import { contactInfo } from '../contactInfo'

describe('contactInfo', () => {
  it('exports an array of contact information', () => {
    expect(Array.isArray(contactInfo)).toBe(true)
    expect(contactInfo.length).toBeGreaterThan(0)
  })

  it('contains GitHub contact info', () => {
    const github = contactInfo.find(info => info.label === 'GitHub')
    expect(github).toBeDefined()
    expect(github?.value).toBe('github.com/jptrsn')
    expect(github?.href).toBe('https://github.com/jptrsn')
  })

  it('contains LinkedIn contact info', () => {
    const linkedin = contactInfo.find(info => info.label === 'LinkedIn')
    expect(linkedin).toBeDefined()
    expect(linkedin?.value).toBe('linkedin.com/in/educoder')
    expect(linkedin?.href).toBe('https://linkedin.com/in/educoder')
  })

  it('contains Mastodon contact info', () => {
    const mastodon = contactInfo.find(info => info.label === 'Mastodon')
    expect(mastodon).toBeDefined()
    expect(mastodon?.value).toBe('@educoder@mastodon.online')
    expect(mastodon?.href).toBe('https://mastodon.online/@educoder')
  })

  it('contains Codeberg contact info', () => {
    const codeberg = contactInfo.find(info => info.label === 'Codeberg')
    expect(codeberg).toBeDefined()
    expect(codeberg?.value).toBe('codeberg.org/Edu_Coder')
    expect(codeberg?.href).toBe('https://codeberg.org/Edu_Coder')
  })

  it('has exactly 4 contact methods', () => {
    expect(contactInfo).toHaveLength(4)
  })

  it('all contact info items have required properties', () => {
    contactInfo.forEach(info => {
      expect(info).toHaveProperty('icon')
      expect(info).toHaveProperty('label')
      expect(info).toHaveProperty('value')
      expect(info).toHaveProperty('href')

      expect(typeof info.label).toBe('string')
      expect(typeof info.value).toBe('string')
      expect(typeof info.href).toBe('string')
      expect(info.label).toBeTruthy()
      expect(info.value).toBeTruthy()
      expect(info.href).toBeTruthy()
    })
  })

  it('all href values are valid URLs', () => {
    contactInfo.forEach(info => {
      expect(info.href).toMatch(/^https?:\/\//)
    })
  })

  it('all icons are React elements', () => {
    contactInfo.forEach(info => {
      expect(info.icon).toBeDefined()
      expect(typeof info.icon).toBe('object')
    })
  })
})