import { describe, it, expect } from 'vitest'
import { calculateCycle, getDatePeriodType } from './cycle-calculator'

describe('calculateCycle', () => {
  it('should calculate next period start correctly', () => {
    const data = {
      lastPeriodStart: new Date('2026-01-01'),
      cycleLength: 28,
      periodLength: 5,
    }
    const result = calculateCycle(data)
    expect(result.nextPeriodStart.toDateString()).toBe(new Date('2026-01-29').toDateString())
  })

  it('should calculate next period end correctly', () => {
    const data = {
      lastPeriodStart: new Date('2026-01-01'),
      cycleLength: 28,
      periodLength: 5,
    }
    const result = calculateCycle(data)
    expect(result.nextPeriodEnd.toDateString()).toBe(new Date('2026-02-02').toDateString())
  })

  it('should calculate ovulation date 14 days before next period', () => {
    const data = {
      lastPeriodStart: new Date('2026-01-01'),
      cycleLength: 28,
      periodLength: 5,
    }
    const result = calculateCycle(data)
    expect(result.ovulationDate.toDateString()).toBe(new Date('2026-01-15').toDateString())
  })

  it('should calculate fertile window correctly', () => {
    const data = {
      lastPeriodStart: new Date('2026-01-01'),
      cycleLength: 28,
      periodLength: 5,
    }
    const result = calculateCycle(data)
    expect(result.fertileWindowStart.toDateString()).toBe(new Date('2026-01-10').toDateString())
    expect(result.fertileWindowEnd.toDateString()).toBe(new Date('2026-01-16').toDateString())
  })

  it('should calculate PMS start 7 days before next period', () => {
    const data = {
      lastPeriodStart: new Date('2026-01-01'),
      cycleLength: 28,
      periodLength: 5,
    }
    const result = calculateCycle(data)
    expect(result.pmsStart.toDateString()).toBe(new Date('2026-01-22').toDateString())
  })
})

describe('getDatePeriodType', () => {
  const prediction = {
    nextPeriodStart: new Date('2026-01-29'),
    nextPeriodEnd: new Date('2026-02-02'),
    ovulationDate: new Date('2026-01-15'),
    fertileWindowStart: new Date('2026-01-10'),
    fertileWindowEnd: new Date('2026-01-16'),
    pmsStart: new Date('2026-01-22'),
  }

  it('should return "period" for dates within period range', () => {
    expect(getDatePeriodType(new Date('2026-01-29'), prediction)).toBe('period')
    expect(getDatePeriodType(new Date('2026-01-31'), prediction)).toBe('period')
    expect(getDatePeriodType(new Date('2026-02-02'), prediction)).toBe('period')
  })

  it('should return "ovulation" for ovulation date', () => {
    expect(getDatePeriodType(new Date('2026-01-15'), prediction)).toBe('ovulation')
  })

  it('should return "fertile" for dates within fertile window', () => {
    expect(getDatePeriodType(new Date('2026-01-10'), prediction)).toBe('fertile')
    expect(getDatePeriodType(new Date('2026-01-12'), prediction)).toBe('fertile')
    expect(getDatePeriodType(new Date('2026-01-16'), prediction)).toBe('fertile')
  })

  it('should return "pms" for dates in PMS period', () => {
    expect(getDatePeriodType(new Date('2026-01-22'), prediction)).toBe('pms')
    expect(getDatePeriodType(new Date('2026-01-26'), prediction)).toBe('pms')
  })

  it('should return null for dates outside all periods', () => {
    expect(getDatePeriodType(new Date('2026-01-05'), prediction)).toBeNull()
    expect(getDatePeriodType(new Date('2026-01-08'), prediction)).toBeNull()
  })
})
