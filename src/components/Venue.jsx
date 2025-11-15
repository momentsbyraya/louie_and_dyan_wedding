import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { venues as venuesData, images } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const MapDirections = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const headerContentRef = useRef(null)
  const ceremonyRef = useRef(null)
  const receptionRef = useRef(null)

  useEffect(() => {
    // Scroll-triggered animations for individual elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Header (heading) animation first
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Header content (description and graphics) animation
    tl.fromTo(headerContentRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
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
      ref={sectionRef}
      id="map"
      className="relative py-20 w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/assets/images/graphics/textured-bg.png)'
      }}
    >
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-xs sm:max-w-md lg:max-w-xl w-full mx-auto px-8 sm:px-12 md:px-8 lg:px-16">
          {/* Header Section */}
          <div className="text-center">
            <h2 ref={headerRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#333333] mb-3 font-lavishly italic">
              Location
            </h2>
            <div ref={headerContentRef}>
              <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed">
                We will be waiting for you at the address
              </p>
              <div className="flex justify-center">
                <img 
                  src="/assets/images/graphics/graphics-1.svg" 
                  alt="Decorative graphic" 
                  className="w-32 sm:w-40 md:w-48 h-auto"
                />
              </div>
            </div>
          </div>

          {/* Venue Information */}
          <div className="space-y-16">
            {/* Ceremony Venue */}
            <div ref={ceremonyRef} className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-lavishly italic text-[#333333] mb-2">
                {venues.ceremony.name}
              </div>
              <p className="text-base sm:text-lg font-albert font-thin text-[#333333] mb-3 max-w-md mx-auto">
                {venues.ceremony.address}, {venues.ceremony.city}, {venues.ceremony.state} {venues.ceremony.zip}
              </p>
              <div className="flex justify-center mb-4">
                <img 
                  src={images.venues.church} 
                  alt={venues.ceremony.name} 
                  className="w-full max-w-md h-auto"
                />
              </div>
              <div className="flex justify-center items-center">
                {/* Left horizontal line */}
                <div className="w-4 h-px bg-[#333333] opacity-40"></div>
                
                <a
                  href={venues.ceremony.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center hover:opacity-80 transition-all duration-300 group px-4 pb-2 pt-0"
                  style={{ 
                    borderRadius: '25px'
                  }}
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#333333] opacity-80 flex-shrink-0" />
                </a>
                
                {/* Right horizontal line */}
                <div className="w-4 h-px bg-[#333333] opacity-40"></div>
              </div>
            </div>

            {/* Reception Venue */}
            <div ref={receptionRef} className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-lavishly italic text-[#333333] mb-2">
                {venues.reception.name}
              </div>
              <p className="text-base sm:text-lg font-albert font-thin text-[#333333] mb-3 max-w-md mx-auto">
                {venues.reception.address}, {venues.reception.city}, {venues.reception.state} {venues.reception.zip}
              </p>
              <div className="flex justify-center mb-4">
                <img 
                  src={images.venues.reception} 
                  alt={venues.reception.name} 
                  className="w-full max-w-md h-auto"
                />
              </div>
              <div className="flex justify-center items-center">
                {/* Left horizontal line */}
                <div className="w-4 h-px bg-[#333333] opacity-40"></div>
                
                <a
                  href={venues.reception.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center hover:opacity-80 transition-all duration-300 group px-4 pb-2 pt-0"
                  style={{ 
                    borderRadius: '25px'
                  }}
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#333333] opacity-80 flex-shrink-0" />
                </a>
                
                {/* Right horizontal line */}
                <div className="w-4 h-px bg-[#333333] opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapDirections 