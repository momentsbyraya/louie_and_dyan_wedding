import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { venues as venuesData, images } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const MapDirections = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const headerContentRef = useRef(null)
  const venueRef = useRef(null)
  const venueContainerRef = useRef(null)
  const [currentVenueIndex, setCurrentVenueIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

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

    // Venue section animation
    tl.fromTo(venueRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])


  const venues = [
    {
      ...venuesData.ceremony,
      type: 'Ceremony',
      image: images.venues.church
    },
    {
      ...venuesData.reception,
      type: 'Reception',
      image: images.venues.reception
    }
  ]

  const currentVenue = venues[currentVenueIndex]

  const nextVenue = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    
    // Fade out current venue
    setTimeout(() => {
      setCurrentVenueIndex((prev) => (prev + 1) % venues.length)
      // Fade in new venue
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 300)
  }

  const prevVenue = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    
    // Fade out current venue
    setTimeout(() => {
      setCurrentVenueIndex((prev) => (prev - 1 + venues.length) % venues.length)
      // Fade in new venue
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 300)
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
              <div className="flex justify-center items-center">
                {/* Left horizontal line */}
                <div className="w-16 h-px bg-[#333333] opacity-40"></div>
                
                <img 
                  src="/assets/images/graphics/graphics-1.svg" 
                  alt="Decorative graphic" 
                  className="w-32 sm:w-40 md:w-48 h-auto mx-4"
                />
                
                {/* Right horizontal line */}
                <div className="w-16 h-px bg-[#333333] opacity-40"></div>
              </div>
            </div>
          </div>

          {/* Venue Information */}
          <div className="relative overflow-visible" ref={venueContainerRef}>
            {/* Previous Venue Button - Positioned relative to venue container */}
            <button
              onClick={prevVenue}
              className="absolute -left-12 sm:-left-16 md:-left-20 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
              aria-label="Previous venue"
              disabled={isTransitioning}
            >
              <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#333333] opacity-60" strokeWidth={1.5} />
            </button>

            {/* Venue Container with Fade Effect */}
            <div className="relative overflow-hidden min-h-[400px]">
              <div 
                ref={venueRef} 
                key={currentVenueIndex}
                className="text-center transition-opacity duration-500 ease-in-out"
                style={{
                  opacity: isTransitioning ? 0 : 1
                }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl alice-regular text-[#333333] mb-2">
                  {currentVenue.name}
                </div>
                <p className="text-base sm:text-lg font-albert font-thin text-[#333333] mb-3 max-w-md mx-auto">
                  {currentVenue.address}, {currentVenue.city}, {currentVenue.state} {currentVenue.zip}
                </p>
                <div className="flex justify-center mb-4">
                  <img 
                    src={currentVenue.image} 
                    alt={currentVenue.name} 
                    className="w-full max-w-md h-auto"
                  />
                </div>
                <div className="flex justify-center items-center">
                  {/* Left horizontal line */}
                  <div className="w-4 h-px bg-[#333333] opacity-40"></div>
                  
                  <a
                    href={currentVenue.googleMapsUrl}
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
                
                {/* Duplicated SVG with horizontal lines, flipped vertically */}
                <div className="flex justify-center items-center mt-6">
                  {/* Left horizontal line */}
                  <div className="w-16 h-px bg-[#333333] opacity-40"></div>
                  
                  <img 
                    src="/assets/images/graphics/graphics-1.svg" 
                    alt="Decorative graphic" 
                    className="w-32 sm:w-40 md:w-48 h-auto mx-4 scale-y-[-1]"
                  />
                  
                  {/* Right horizontal line */}
                  <div className="w-16 h-px bg-[#333333] opacity-40"></div>
                </div>
              </div>
            </div>

            {/* Next Venue Button - Positioned relative to venue container */}
            <button
              onClick={nextVenue}
              className="absolute -right-12 sm:-right-16 md:-right-20 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
              aria-label="Next venue"
              disabled={isTransitioning}
            >
              <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#333333] opacity-60" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapDirections 