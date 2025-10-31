import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { venues as venuesData } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const MapDirections = () => {
  const headerRef = useRef(null)
  const ceremonyRef = useRef(null)
  const receptionRef = useRef(null)

  useEffect(() => {
    // Scroll-triggered animations for individual elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Header animation
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Ceremony section animation
    tl.fromTo(ceremonyRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )

    // Reception section animation
    tl.fromTo(receptionRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const venues = {
    ceremony: {
      ...venuesData.ceremony,
      type: 'Ceremony'
    },
    reception: {
      ...venuesData.reception,
      type: 'Reception'
    }
  }

  return (
    <section
      id="map"
      className={`relative py-20 w-full overflow-hidden ${themeConfig.calendar.background}`}
    >
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 md:px-8 lg:px-16">
          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white/90 mb-6 font-leckerli font-light">
              Location
            </h2>
            <p className="text-lg sm:text-xl font-albert font-thin text-white/80 max-w-3xl mx-auto leading-relaxed">
              We will be waiting for you at the address
            </p>
          </div>

          {/* Venue Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ceremony Venue */}
            <div ref={ceremonyRef} className="text-center">
              <h3 className="text-xl sm:text-2xl font-albert font-thin text-white mb-2">
                {venues.ceremony.name}
              </h3>
              <p className="text-base sm:text-lg font-albert font-thin text-white/80 mb-4">
                {venues.ceremony.address}, {venues.ceremony.city}, {venues.ceremony.state} {venues.ceremony.zip}
              </p>
              <a
                href={venues.ceremony.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-sm sm:text-base font-albert font-thin text-white/70 hover:text-white transition-colors duration-200 border border-white px-4 py-2 rounded text-center"
              >
                Open map
              </a>
            </div>

            {/* Reception Venue */}
            <div ref={receptionRef} className="text-center">
              <h3 className="text-xl sm:text-2xl font-albert font-thin text-white mb-2">
                {venues.reception.name}
              </h3>
              <p className="text-base sm:text-lg font-albert font-thin text-white/80 mb-4">
                {venues.reception.address}, {venues.reception.city}, {venues.reception.state} {venues.reception.zip}
              </p>
              <a
                href={venues.reception.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-sm sm:text-base font-albert font-thin text-white/70 hover:text-white transition-colors duration-200 border border-white px-4 py-2 rounded text-center"
              >
                Open map
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapDirections 