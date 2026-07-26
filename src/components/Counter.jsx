import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sectionTitleStyle } from '../config/themeConfig'
import { weddingConfig } from '../config/weddingConfig'

gsap.registerPlugin(ScrollTrigger)

const Counter = ({ countdown }) => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const detailsRef = useRef(null)
  const countdownRef = useRef(null)

  const { dayOfWeek, month, day, year, time } = weddingConfig.wedding
  const weddingDate = [dayOfWeek, `${month} ${day}, ${year}`].filter(Boolean).join(' · ')
  const venueName =
    weddingConfig.venue?.ceremony?.shortName ||
    weddingConfig.venue?.ceremony?.name ||
    ''
  const venueTime = time || weddingConfig.venue?.ceremony?.time || ''

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )

    if (detailsRef.current) {
      tl.fromTo(
        detailsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
    }

    tl.fromTo(
      countdownRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power2.out' },
      '-=0.35'
    )

    tl.fromTo(
      '.countdown-number',
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.15,
      },
      '-=0.45'
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const textShadow = { textShadow: '0 1px 3px rgba(0,0,0,0.45)' }

  return (
    <section
      ref={sectionRef}
      id="details"
      className="relative w-full overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/images/prenup/B.D&A-EngagementFinal-19.jpg)',
        }}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 bg-black/40" aria-hidden />

      <div className="relative z-20 flex min-h-[70vh] flex-col items-center justify-between px-8 pb-12 pt-16 sm:min-h-[75vh] sm:px-12 sm:pb-14 sm:pt-20 md:min-h-[80vh] md:px-8 md:pb-16 md:pt-24 lg:px-16">
        <div className="w-full max-w-xs text-center sm:max-w-md lg:max-w-xl">
          <h2
            ref={headerRef}
            className="mb-6 whitespace-nowrap pt-4 text-4xl text-white sm:mb-8 sm:pt-6 sm:text-5xl md:text-6xl lg:text-7xl md:pt-8 leading-tight"
            style={{ ...sectionTitleStyle, color: '#FFFFFF' }}
          >
            Save the Date
          </h2>

          <div ref={detailsRef} className="flex flex-col items-center gap-1">
            <p
              className="font-albert text-sm font-thin uppercase tracking-[0.28em] text-white sm:text-base md:text-lg"
              style={textShadow}
            >
              {weddingDate}
            </p>

            <div
              className="my-0.5 h-px w-10 bg-gradient-to-r from-transparent via-[#edb030] to-transparent sm:w-12"
              aria-hidden
            />

            {venueName && (
              <div className="space-y-0.5">
                <p
                  className="font-albert text-base font-thin leading-snug text-white/95 sm:text-lg md:text-xl"
                  style={textShadow}
                >
                  {venueName}
                </p>
                {venueTime && (
                  <p
                    className="font-albert text-xs font-thin uppercase tracking-[0.22em] text-white/75 sm:text-sm"
                    style={textShadow}
                  >
                    {venueTime}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div
          ref={countdownRef}
          className="mt-12 flex items-center justify-center space-x-3 px-4 text-white sm:space-x-4 md:space-x-6"
          style={textShadow}
        >
          <div className="text-center">
            <div className="countdown-number mb-1 font-albert text-3xl font-semibold tabular-nums sm:text-4xl md:text-5xl lg:text-6xl">
              {countdown.days}
            </div>
            <div className="font-albert text-xs font-medium text-white/90 sm:text-sm">Days</div>
          </div>

          <div className="font-albert text-2xl font-thin text-gold sm:text-3xl md:text-4xl">:</div>

          <div className="text-center">
            <div className="countdown-number mb-1 font-albert text-3xl font-semibold tabular-nums sm:text-4xl md:text-5xl lg:text-6xl">
              {countdown.hours}
            </div>
            <div className="font-albert text-xs font-medium text-white/90 sm:text-sm">Hours</div>
          </div>

          <div className="font-albert text-2xl font-thin text-gold sm:text-3xl md:text-4xl">:</div>

          <div className="text-center">
            <div className="countdown-number mb-1 font-albert text-3xl font-semibold tabular-nums sm:text-4xl md:text-5xl lg:text-6xl">
              {countdown.minutes}
            </div>
            <div className="font-albert text-xs font-medium text-white/90 sm:text-sm">Minutes</div>
          </div>

          <div className="font-albert text-2xl font-thin text-gold sm:text-3xl md:text-4xl">:</div>

          <div className="text-center">
            <div className="countdown-number mb-1 font-albert text-3xl font-semibold tabular-nums sm:text-4xl md:text-5xl lg:text-6xl">
              {countdown.seconds}
            </div>
            <div className="font-albert text-xs font-medium text-white/90 sm:text-sm">Seconds</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Counter
