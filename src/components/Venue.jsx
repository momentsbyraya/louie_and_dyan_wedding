import React, { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { venues as venuesData } from '../data'
import { sectionTitleStyle } from '../config/themeConfig'
import AutoplayYouTube from './AutoplayYouTube'
import './Venue.css'

gsap.registerPlugin(ScrollTrigger)

const LOCATION_VIDEO_ID = 'SnT_AxeTPM8'

const MapDirections = () => {
  const sectionRef = useRef(null)
  const venueHeaderRef = useRef(null)
  const venueContentRef = useRef(null)
  const venueCardRef = useRef(null)

  const venue = venuesData.ceremony

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

  return (
    <section
      ref={sectionRef}
      id="map"
      className="relative z-20 w-full overflow-hidden"
      style={{ backgroundColor: '#6f4e37' }}
    >
      <div className="relative z-10 pb-20 sm:pb-28 md:pb-36 lg:pb-44 mt-20 sm:mt-24 md:mt-32 lg:mt-40">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="flex flex-col items-center w-full">
            <div className="w-full text-center pt-12 sm:pt-16 md:pt-20">
              <h2
                ref={venueHeaderRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 leading-tight whitespace-nowrap"
                style={{ ...sectionTitleStyle, color: '#f5f0eb' }}
              >
                Location
              </h2>
              <div ref={venueContentRef} className="mb-6 sm:mb-8 md:mb-10">
                <p className="text-base sm:text-lg font-albert font-thin text-white/90 max-w-3xl mx-auto leading-relaxed">
                  We will be waiting for you at the address
                </p>
              </div>
            </div>

            <div className="relative w-full max-w-md mx-auto">
              <div ref={venueCardRef} className="text-center">
                <div className="flex flex-col gap-6 md:gap-8 lg:gap-6 items-start">
                  <div className="w-full">
                    <div className="w-full relative venue-image-container overflow-hidden rounded">
                      <AutoplayYouTube
                        videoId={LOCATION_VIDEO_ID}
                        title="Venue video"
                        className="h-full rounded"
                      />
                    </div>
                  </div>
                  <div className="w-full text-center">
                    <div>
                      <p
                        className="imperial-script-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center text-[#f5f0eb]"
                      >
                        Ceremony & Reception
                      </p>
                      <div className="font-albert font-bold text-white mb-2 text-center text-sm sm:text-base md:text-lg">
                        {venue.name}
                      </div>
                      <p className="text-[10px] sm:text-xs font-albert font-thin text-white/85 text-center">
                        {venue.address && `${venue.address}, `}
                        {venue.city}
                        {venue.state && `, ${venue.state}`}
                        {venue.zip && ` ${venue.zip}`}
                      </p>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                      <a
                        href={venue.googleMapsUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-albert font-thin text-sm sm:text-base underline hover:opacity-80 transition-opacity duration-200 inline-flex items-center gap-2 text-[#f5f0eb]"
                      >
                        View Map
                        <ArrowRight className="w-4 h-4 text-[#f5f0eb]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapDirections
