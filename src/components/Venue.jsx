import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { venues as venuesData } from '../data'

const MapDirections = () => {
  const venues = [
    {
      ...venuesData.ceremony,
      category: 'Ceremony',
      image: '/assets/images/venues/ceremony.png'
    },
    {
      ...venuesData.reception,
      category: 'Reception',
      image: '/assets/images/venues/reception.png'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextVenue = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % venues.length)
      setIsTransitioning(false)
    }, 500) // Match transition duration
  }

  const prevVenue = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + venues.length) % venues.length)
      setIsTransitioning(false)
    }, 500) // Match transition duration
  }

  return (
    <section
      id="map"
      className="relative w-full overflow-hidden"
    >
      <div className="flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto relative">
          {/* Left Chevron */}
          <button
            onClick={prevVenue}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 hover:opacity-70 transition-opacity"
            aria-label="Previous venue"
          >
            <ChevronLeft className="w-8 h-8 text-[#333333]" />
          </button>

          {/* Venue Content - Stacked */}
          <div className="relative">
            {venues.map((venue, index) => {
              const isCurrent = index === currentIndex
              const isNext = index === (currentIndex + 1) % venues.length
              const isPrev = index === (currentIndex - 1 + venues.length) % venues.length
              
              // Current venue is on top, others are behind
              // During transition, current fades out to reveal the one behind
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    isCurrent ? 'opacity-100 z-20' : 'opacity-100 z-10'
                  }`}
                  style={{
                    opacity: isCurrent ? (isTransitioning ? 0 : 1) : 1
                  }}
                >
                  {/* Venue Image */}
                  <img 
                    src={venue.image} 
                    alt={venue.name} 
                    className="w-full h-auto"
                  />
                  
                  {/* All text elements at the top - overlaid on image */}
                  <div className="absolute top-0 left-0 right-0 text-center pt-16 sm:pt-20 md:pt-24 lg:pt-32 px-4">
                    {/* Venue Name */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gilliequest capitalize mb-2 px-4 sm:px-6 md:px-8" style={{ color: '#edb030' }}>
                      {venue.name}
                    </h2>
                    
                    {/* Location */}
                    <p className="text-sm sm:text-base font-albert font-thin mb-2 mx-auto" style={{ color: '#A0826D', width: '75%' }}>
                      {venue.address}, {venue.city}, {venue.state} {venue.zip}
                    </p>
                    
                    {/* Category */}
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-script lowercase" style={{ color: '#D4A574' }}>
                      {venue.category.toLowerCase()}
                    </p>
                  </div>
                  
                  {/* Open Maps Button at the bottom */}
                  <div className="absolute bottom-0 left-0 right-0 text-center pb-8 sm:pb-12 md:pb-16 px-4">
                    <a
                      href={venue.googleMapsUrl || venue.directionsUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-4 py-2 rounded-full hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.50)' }}
                    >
                      <span className="text-base sm:text-lg font-albert font-thin underline" style={{ color: '#333333' }}>
                        Open Maps
                      </span>
                      <div className="rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', width: '32px', height: '32px' }}>
                        <ArrowRight className="w-4 h-4" style={{ color: '#333333' }} />
                      </div>
                    </a>
                  </div>
                </div>
              )
            })}
            {/* Spacer to maintain height */}
            <div className="relative opacity-0 pointer-events-none">
              <img 
                src={venues[0].image} 
                alt="" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Chevron */}
          <button
            onClick={nextVenue}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 hover:opacity-70 transition-opacity"
            aria-label="Next venue"
          >
            <ChevronRight className="w-8 h-8 text-[#333333]" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default MapDirections 