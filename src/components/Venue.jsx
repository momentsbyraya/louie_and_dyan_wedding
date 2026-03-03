import React, { useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { venues as venuesData } from '../data'

const MapDirections = () => {
  const venue = {
    ...venuesData.ceremony,
    category: 'Venue',
    image: '/assets/images/venues/ceremony.png'
  }

  // List of venue images
  const venueImages = [
    '/assets/images/venues/ceremony.png',
    '/assets/images/venues/reception.png'
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)

  const handlePrevious = () => {
    setIsFading(true)
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev === 0 ? venueImages.length - 1 : prev - 1))
      setIsFading(false)
    }, 300)
  }

  const handleNext = () => {
    setIsFading(true)
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev === venueImages.length - 1 ? 0 : prev + 1))
      setIsFading(false)
    }, 300)
  }

  return (
    <section
      id="map"
      className="relative w-full overflow-hidden mt-20 sm:mt-24 md:mt-32 lg:mt-40 mb-20 sm:mb-24 md:mb-32 lg:mb-40"
    >
      <div className="flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto relative">
          {/* Venue Content */}
          <div className="relative">
            {/* Venue Image */}
            <img 
              src={venueImages[currentImageIndex]} 
              alt={venue.name} 
              className={`w-full h-auto transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Chevron Navigation - Left */}
            {venueImages.length > 1 && (
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 transition-all duration-200 hover:opacity-80"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg" style={{ color: '#edb030' }} />
              </button>
            )}

            {/* Chevron Navigation - Right */}
            {venueImages.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 transition-all duration-200 hover:opacity-80"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg" style={{ color: '#edb030' }} />
              </button>
            )}
            
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
        </div>
      </div>
    </section>
  )
}

export default MapDirections 