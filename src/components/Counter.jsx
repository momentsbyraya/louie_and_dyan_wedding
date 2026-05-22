import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import theme from '../config/theme.json'
import { sectionTitleStyle } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const rsvpStyleDivider = (
  <div className="flex w-full max-w-md justify-center items-center sm:max-w-lg">
    <div className="h-px w-16 flex-shrink-0 bg-[#333333] opacity-40 sm:w-20" />
    <img
      src="/assets/images/graphics/graphics-1.svg"
      alt=""
      className="mx-4 h-auto w-24 flex-shrink-0 sm:w-32 md:w-36"
    />
    <div className="h-px w-16 flex-shrink-0 bg-[#333333] opacity-40 sm:w-20" />
  </div>
)

const Counter = ({ countdown }) => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const countdownRef = useRef(null)
  useEffect(() => {
    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Header animation first
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Countdown container animation
    tl.fromTo(countdownRef.current, 
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.4"
    )

    // Countdown numbers stagger animation
    tl.fromTo(".countdown-number", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        stagger: 0.2
      },
      "-=0.5"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="details"
      className="relative w-full overflow-hidden"
    >
      {/* Background — old book (same asset as Entourage modal) */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)',
        }}
        aria-hidden
      />

      {/* Gold banner — top (same as Entourage modal list) */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center">
        <img
          src="/assets/images/graphics/gold-banner-2.png"
          alt=""
          className="h-auto w-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center px-8 pb-24 pt-28 sm:px-12 sm:pb-28 sm:pt-32 md:px-8 md:pb-32 md:pt-36 lg:px-16">
        <div className="mx-auto w-full max-w-xs sm:max-w-md lg:max-w-xl">
          {/* Header Section */}
          <div className="text-center">
            <h2
              ref={headerRef}
              className="mb-3 whitespace-nowrap pt-4 text-4xl sm:pt-6 sm:text-5xl md:text-6xl lg:text-7xl md:pt-8 leading-tight"
              style={sectionTitleStyle}
            >
              Save the Date
            </h2>
            <div ref={countdownRef}>
              <p className="mx-auto max-w-3xl font-albert text-base font-thin leading-relaxed text-[#333333] sm:text-lg">
                Mark your calendar for<br />our special day
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 flex justify-center sm:mt-12">
            {rsvpStyleDivider}
          </div>

          {/* Countdown Timer */}
          <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-4 px-4 sm:mt-10 sm:gap-6 md:gap-8">
            <div className="text-center">
              <div
                className="countdown-number mb-1 font-gilliequest text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ color: theme.text.brown }}
              >
                {countdown.days}
              </div>
              <div className="text-xs font-medium text-[#333333]/85 sm:text-sm">Days</div>
            </div>
            
            <div className="text-center">
              <div
                className="countdown-number mb-1 font-gilliequest text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ color: theme.text.brown }}
              >
                {countdown.hours}
              </div>
              <div className="text-xs font-medium text-[#333333]/85 sm:text-sm">Hours</div>
            </div>
            
            <div className="text-center">
              <div
                className="countdown-number mb-1 font-gilliequest text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ color: theme.text.brown }}
              >
                {countdown.minutes}
              </div>
              <div className="text-xs font-medium text-[#333333]/85 sm:text-sm">Minutes</div>
            </div>
            
            <div className="text-center">
              <div
                className="countdown-number mb-1 font-gilliequest text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ color: theme.text.brown }}
              >
                {countdown.seconds}
              </div>
              <div className="text-xs font-medium text-[#333333]/85 sm:text-sm">Seconds</div>
            </div>
          </div>

          <div className="mx-auto mt-8 flex justify-center sm:mt-10">
            {rsvpStyleDivider}
          </div>
        </div>
      </div>

      {/* Gold banner — bottom, flipped (same as Entourage modal list) */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center">
        <img
          src="/assets/images/graphics/gold-banner-2.png"
          alt=""
          className="h-auto w-full scale-y-[-1]"
        />
      </div>
    </section>
  )
}

export default Counter
