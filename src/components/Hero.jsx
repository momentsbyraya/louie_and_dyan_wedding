import React, { useRef, useEffect, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { couple, venues } from '../data'
import { getTimeUntilWedding } from '../utils/countdown'
import { scheduleGsapRevealFallback, shouldUseSafariLiteMode } from '../utils/safariCompat'

const HERO_BG_IMAGE = '/assets/images/prenup/IMG_0048.jpg'

const Hero = () => {
  const invitationTextRef = useRef(null)
  const coupleNamesRef = useRef(null)
  const dateRef = useRef(null)
  const countdownRef = useRef(null)
  const heroImgRef = useRef(null)
  const [countdown, setCountdown] = useState(getTimeUntilWedding())

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    return {
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(),
      month: date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase(),
      day: day.toString().padStart(2, '0'),
      year: date.getFullYear().toString(),
    }
  }

  const dateInfo = useMemo(() => formatDate(couple.wedding.date), [couple.wedding.date])

  const toTitleCase = (value) =>
    value
      ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
      : ''

  const [heroGroomName, heroBrideName] = useMemo(() => {
    return [toTitleCase(couple.groom.firstName), toTitleCase(couple.bride.firstName)]
  }, [couple.groom.firstName, couple.bride.firstName])

  const venue = venues.ceremony
  const safariLite = shouldUseSafariLiteMode()
  const heroSvgFilter = safariLite ? undefined : 'url(#heroTopBlurFilter)'
  const heroBottomSvgFilter = safariLite ? undefined : 'url(#heroBottomBlurFilter)'

  useEffect(() => {
    heroImgRef.current?.setAttribute('fetchpriority', 'high')
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const animatedRefs = [
      invitationTextRef,
      coupleNamesRef,
      dateRef,
      countdownRef,
    ].map((r) => r.current)

    if (invitationTextRef.current) gsap.set(invitationTextRef.current, { opacity: 0, y: 20 })
    if (coupleNamesRef.current) gsap.set(coupleNamesRef.current, { opacity: 0, y: 30 })
    if (dateRef.current) gsap.set(dateRef.current, { opacity: 0, y: 20 })
    if (countdownRef.current) gsap.set(countdownRef.current, { opacity: 0, y: 20 })

    const tl = gsap.timeline({ delay: 0.3 })

    if (invitationTextRef.current) {
      tl.to(invitationTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
    if (coupleNamesRef.current) {
      tl.to(coupleNamesRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
    }
    if (dateRef.current) {
      tl.to(dateRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
    if (countdownRef.current) {
      tl.to(countdownRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    }

    const cancelFallback = scheduleGsapRevealFallback(animatedRefs, { delayMs: 3000 })

    return () => {
      tl.kill()
      cancelFallback()
    }
  }, [])

  const heroAlt = couple.together.replace('&', 'and')

  const heroInk = '#27323B'
  const heroCoupleColor = '#2D4251'
  const heroContrastShadow =
    '0 1px 0 rgba(255, 255, 255, 0.75), 0 1px 10px rgba(238, 244, 247, 0.9)'

  const countdownUnits = [
    { value: countdown.days, label: 'Days' },
    { value: countdown.hours, label: 'Hours' },
    { value: countdown.minutes, label: 'Mins' },
    { value: countdown.seconds, label: 'Secs' },
  ]

  return (
    <div
      data-hero-section="true"
      className="hero-viewport-height relative w-full overflow-x-hidden overflow-y-hidden"
    >
      <img
        ref={heroImgRef}
        src={HERO_BG_IMAGE}
        alt={heroAlt}
        className="h-full w-full object-cover"
        style={{
          objectPosition: '38% center',
          transform: 'scale(1.12)',
          transformOrigin: 'center center',
        }}
        decoding="async"
        draggable={false}
      />

      <svg
        className="pointer-events-none absolute left-0 top-0 z-10 h-64 w-full sm:h-80 md:h-96 lg:h-[28rem]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="heroTopBlurFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <linearGradient id="heroTopCreamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(252, 252, 251, 0.94)" />
            <stop offset="40%" stopColor="rgba(248, 250, 252, 0.82)" />
            <stop offset="68%" stopColor="rgba(220, 232, 239, 0.48)" />
            <stop offset="100%" stopColor="rgba(248, 250, 252, 0)" />
          </linearGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#heroTopCreamGrad)"
          className="hero-svg-blur-rect"
          filter={heroSvgFilter}
        />
      </svg>

      <div className="absolute left-0 right-0 top-0 z-20 px-4 pt-12 sm:px-6 sm:pt-16 md:px-8 md:pt-20 lg-custom:px-2 lg-custom:pt-8 lg:pt-12">
        <div className="mx-auto max-w-4xl text-center">
          <p
            ref={invitationTextRef}
            className="mb-2 text-xs font-semibold uppercase tracking-wider sm:mb-3 sm:text-sm md:mb-4 md:text-base lg:text-lg"
            style={{
              fontFamily: 'Albert Sans, sans-serif',
              color: heroInk,
              textShadow: heroContrastShadow,
            }}
          >
            YOU ARE INVITED TO
            <br />
            THE WEDDING OF
          </p>
          <p
            ref={coupleNamesRef}
            className="mx-auto mb-3 mt-4 max-w-full px-2 text-center text-5xl leading-none whitespace-nowrap sm:mb-4 sm:mt-5 sm:text-6xl md:mb-6 md:mt-6 md:text-7xl lg:mb-8 lg:mt-8 lg:text-8xl lg-custom:text-[clamp(3rem,9vw,5rem)] xl:text-[clamp(4rem,10vw,8rem)]"
            style={{
              fontFamily: '"Pinyon Script", cursive',
              color: heroCoupleColor,
              textShadow: heroContrastShadow,
            }}
          >
            {heroBrideName} & {heroGroomName}
          </p>
        </div>
      </div>

      <svg
        className="pointer-events-none absolute bottom-[-1rem] left-0 z-10 h-64 w-full sm:h-80 md:h-96 lg:h-[28rem]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="heroBottomBlurFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <linearGradient id="heroBottomForestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(65, 91, 111, 0)" />
            <stop offset="32%" stopColor="rgba(65, 91, 111, 0.52)" />
            <stop offset="62%" stopColor="rgba(45, 66, 81, 0.85)" />
            <stop offset="100%" stopColor="rgba(39, 50, 59, 0.92)" />
          </linearGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#heroBottomForestGrad)"
          className="hero-svg-blur-rect"
          filter={heroBottomSvgFilter}
        />
      </svg>

      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-8 sm:px-6 sm:pb-12 md:px-8 md:pb-16 lg:pb-12">
        <div className="mx-auto max-w-4xl text-center">
          <div ref={dateRef}>
            <div
              className="mb-2 text-center text-base tracking-wider sm:mb-3 sm:text-lg md:text-xl lg-custom:mb-2 lg-custom:text-base"
              style={{ color: '#FFFFFF', fontFamily: 'Alice, serif', fontWeight: 'bold' }}
            >
              {dateInfo.month}
            </div>
            <div className="mx-auto flex max-w-md items-center justify-center gap-4 sm:gap-6 md:gap-8 lg-custom:gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="mb-0 h-px w-16 sm:w-20 md:w-24 lg:w-28 lg-custom:w-16"
                  style={{ backgroundColor: '#FFFFFF' }}
                />
                <div
                  className="mb-1 mt-1 text-sm tracking-wider sm:text-base md:text-lg lg-custom:text-sm"
                  style={{ color: '#FFFFFF', fontFamily: 'Alice, serif', fontWeight: 'bold' }}
                >
                  {dateInfo.dayOfWeek}
                </div>
                <div
                  className="mt-0 h-px w-16 sm:w-20 md:w-24 lg:w-28 lg-custom:w-16"
                  style={{ backgroundColor: '#FFFFFF' }}
                />
              </div>
              <div
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg-custom:text-5xl"
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Alice, serif',
                  fontWeight: 'bold',
                  textShadow:
                    '0 0 10px rgba(141, 174, 196, 0.8), 0 0 20px rgba(111, 146, 170, 0.5), 0 0 30px rgba(111, 146, 170, 0.35)',
                }}
              >
                {dateInfo.day}
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="mb-0 h-px w-16 sm:w-20 md:w-24 lg:w-28 lg-custom:w-16"
                  style={{ backgroundColor: '#FFFFFF' }}
                />
                <div
                  className="mb-1 mt-1 text-sm tracking-wider sm:text-base md:text-lg lg-custom:text-sm"
                  style={{ color: '#FFFFFF', fontFamily: 'Alice, serif', fontWeight: 'bold' }}
                >
                  {(venue.time || couple.wedding.time || '').replace(/\s/g, '').toUpperCase()}
                </div>
                <div
                  className="mt-0 h-px w-16 sm:w-20 md:w-24 lg:w-28 lg-custom:w-16"
                  style={{ backgroundColor: '#FFFFFF' }}
                />
              </div>
            </div>
          </div>

          <div
            ref={countdownRef}
            className="mx-auto mt-6 flex max-w-2xl items-end justify-center gap-2.5 sm:mt-8 sm:gap-3.5 md:mt-10 md:gap-5 lg-custom:mt-5"
          >
            {countdownUnits.map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <div className="flex min-w-[3.75rem] items-center justify-center rounded-md border border-white/35 bg-black/25 px-3 py-2.5 backdrop-blur-[2px] sm:min-w-[4.5rem] sm:px-3.5 sm:py-3 md:min-w-[5.25rem] md:px-4 md:py-3.5">
                  <span className="font-albert text-2xl font-semibold tabular-nums leading-none text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    {unit.value}
                  </span>
                </div>
                <span className="mt-2 font-albert text-[10px] font-medium uppercase tracking-wider text-white/85 sm:text-xs md:text-sm">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
