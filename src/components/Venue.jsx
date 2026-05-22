import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { venues as venuesData } from '../data'
import theme from '../config/theme.json'
import { sectionTitleStyle } from '../config/themeConfig'
import './Venue.css'

gsap.registerPlugin(ScrollTrigger)

const MapDirections = () => {
  const sectionRef = useRef(null)
  const venueHeaderRef = useRef(null)
  const venueContentRef = useRef(null)
  const venueCardRef = useRef(null)

  const ceremony = venuesData.ceremony
  const reception = venuesData.reception

  const ceremonyImageSrc = '/assets/images/venues/ceremony.png'
  const receptionImageSrc = '/assets/images/venues/reception.png'

  const venueOrder = [
    {
      key: 'ceremony',
      label: 'Ceremony',
      data: ceremony,
      image: ceremonyImageSrc
    },
    {
      key: 'reception',
      label: 'Reception',
      data: reception,
      image: receptionImageSrc
    }
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const activeVenue = venueOrder[activeIndex]

  const goToVenue = (nextIndex) => {
    if (nextIndex === activeIndex) return
    setActiveIndex(nextIndex)
  }

  const goPrev = () => goToVenue((activeIndex - 1 + venueOrder.length) % venueOrder.length)
  const goNext = () => goToVenue((activeIndex + 1) % venueOrder.length)

  useEffect(() => {
    const triggers = []

    const venueTl = gsap.timeline({
      scrollTrigger: {
        trigger: venueHeaderRef.current,
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })
    if (venueHeaderRef.current) {
      venueTl.fromTo(
        venueHeaderRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
    }
    if (venueContentRef.current) {
      venueTl.fromTo(
        venueContentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
    }
    if (venueTl.scrollTrigger) triggers.push(venueTl.scrollTrigger)

    return () => {
      triggers.forEach((t) => t && t.kill())
    }
  }, [])

  useEffect(() => {
    if (!venueCardRef.current) return
    gsap.fromTo(
      venueCardRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    )
  }, [activeIndex])

  return (
    <section ref={sectionRef} id="map" className="relative z-20 w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/assets/images/graphics/calligraphy-bg.png)',
          opacity: 0.15
        }}
      />

      <div className="relative z-10 pb-20 sm:pb-28 md:pb-36 lg:pb-44 mt-20 sm:mt-24 md:mt-32 lg:mt-40">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="flex flex-col items-center w-full">
            <div className="w-full text-center pt-12 sm:pt-16 md:pt-20">
              <h2
                ref={venueHeaderRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 leading-tight whitespace-nowrap"
                style={sectionTitleStyle}
              >
                Location
              </h2>
              <div ref={venueContentRef} className="mb-6 sm:mb-8 md:mb-10">
                <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed">
                  We will be waiting for you at the address
                </p>
              </div>
            </div>

            <div className="relative w-full max-w-md mx-auto">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous venue"
                className="absolute left-0 sm:-left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full transition-opacity duration-200 hover:opacity-70 focus:outline-none"
                style={{ color: theme.text.brown }}
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </button>

              <div className="relative overflow-visible w-full">
                <div className="relative overflow-hidden">
                  <div
                    ref={venueCardRef}
                    key={activeVenue.key}
                    className="text-center"
                  >
                    <div className="flex flex-col gap-6 md:gap-8 lg:gap-6 items-start">
                      <div className="w-full">
                        <div className="w-full relative venue-image-container">
                          <img
                            src={activeVenue.image}
                            alt={activeVenue.data.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      </div>
                      <div className="w-full text-center">
                        <div>
                          <p
                            className="imperial-script-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center"
                            style={{ color: theme.text.brown }}
                          >
                            {activeVenue.label}
                          </p>
                          <div
                            className={`font-albert font-bold text-[#333333] mb-2 text-center ${
                              activeVenue.key === 'reception'
                                ? 'text-xs sm:text-sm md:text-base uppercase tracking-wide'
                                : 'text-sm sm:text-base md:text-lg'
                            }`}
                          >
                            {activeVenue.data.name}
                          </div>
                          <p className="text-[10px] sm:text-xs font-albert font-thin text-[#333333] text-center">
                            {activeVenue.data.address && `${activeVenue.data.address}, `}
                            {activeVenue.data.city}
                            {activeVenue.data.state && `, ${activeVenue.data.state}`}
                            {activeVenue.data.zip && ` ${activeVenue.data.zip}`}
                          </p>
                        </div>
                        <div className="flex justify-center items-center mt-4">
                          <a
                            href={activeVenue.data.googleMapsUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-albert font-thin text-sm sm:text-base underline hover:opacity-80 transition-opacity duration-200 inline-flex items-center gap-2"
                            style={{ color: theme.text.brown }}
                          >
                            View Map
                            <ArrowRight className="w-4 h-4" style={{ color: theme.text.brown }} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next venue"
                className="absolute right-0 sm:-right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full transition-opacity duration-200 hover:opacity-70 focus:outline-none"
                style={{ color: theme.text.brown }}
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </button>
            </div>

            <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8">
              {venueOrder.map((venue, index) => (
                <button
                  key={venue.key}
                  type="button"
                  onClick={() => goToVenue(index)}
                  aria-label={`Show ${venue.label}`}
                  aria-current={index === activeIndex ? 'true' : 'false'}
                  className="h-2 rounded-full transition-all duration-300 focus:outline-none"
                  style={{
                    width: index === activeIndex ? '24px' : '8px',
                    backgroundColor: theme.text.brown,
                    opacity: index === activeIndex ? 1 : 0.35
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapDirections
