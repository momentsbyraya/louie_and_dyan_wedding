import { couple } from '../data'

// YYYY-MM-DD must be parsed as a local calendar date.
// `new Date('2026-12-20')` is UTC midnight, which becomes the previous day
// in timezones west of UTC (e.g. US/Canada).
export const parseCalendarDate = (dateString) => {
  const [year, month, day] = String(dateString).split('T')[0].split('-').map(Number)
  return new Date(year, month - 1, day)
}

const applyTimeOfDay = (date, timeString) => {
  if (!timeString) return date
  const match = String(timeString).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i)
  if (!match) return date

  let hours = Number(match[1])
  const minutes = Number(match[2])
  const period = match[3]?.toUpperCase()
  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0
  date.setHours(hours, minutes, 0, 0)
  return date
}

export const parseWeddingDateTime = (dateString, timeString) => {
  return applyTimeOfDay(parseCalendarDate(dateString), timeString)
}

// Countdown utility functions
export const getTimeUntilWedding = () => {
  const weddingDate = parseWeddingDateTime(couple.wedding.date, couple.wedding.time)

  const now = new Date()
  const difference = weddingDate - now

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return {
    days,
    hours,
    minutes,
    seconds
  }
} 