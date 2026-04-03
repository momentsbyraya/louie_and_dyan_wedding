import React, { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { venues as venuesData } from '../data'
import theme from '../config/theme.json'
import './Venue.css'

gsap.registerPlugin(ScrollTrigger)

const locationTitleGradient = {
  background: 'linear-gradient(135deg, #edb030 0%, #d99a1a 20%, #926018 50%, #775016 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
  display: 'inline-block'
}

const MapDirections = () => {
  const sectionRef = useRef(null)
  const venueHeaderRef = useRef(null)
  const venueContentRef = useRef(null)
  const venue1Ref = useRef(null)
  const venue2Ref = useRef(null)
  const ceremonyImageColRef = useRef(null)
  const ceremonyContentColRef = useRef(null)
  const receptionImageColRef = useRef(null)
  const receptionContentColRef = useRef(null)

  const ceremony = venuesData.ceremony
  const reception = venuesData.reception

  const ceremonyImageSrc = '/assets/images/venues/ceremony.png'
  const receptionImageSrc = '/assets/images/venues/reception.png'

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

    const runVenuePair = (blockRef, imageColRef, contentColRef, imageFromX, contentFromX) => {
      if (!blockRef.current || !imageColRef.current || !contentColRef.current) return
      gsap.set(imageColRef.current, { opacity: 0, x: imageFromX, force3D: true })
      gsap.set(contentColRef.current, { opacity: 0, x: contentFromX, force3D: true })
      const st = ScrollTrigger.create({
        trigger: blockRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(imageColRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            force3D: true
          })
          gsap.to(contentColRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2,
            force3D: true
          })
        }
      })
      triggers.push(st)
    }

    runVenuePair(venue1Ref, ceremonyImageColRef, ceremonyContentColRef, -30, 30)
    runVenuePair(venue2Ref, receptionImageColRef, receptionContentColRef, 30, -30)

    return () => {
      triggers.forEach((t) => t && t.kill())
    }
  }, [])

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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 font-caribbean"
                style={locationTitleGradient}
              >
                <span
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none"
                  style={{ lineHeight: '0.8' }}
                >
                  L
                </span>
                <span className="inline-block">ocation</span>
              </h2>
              <div ref={venueContentRef}>
                <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed">
                  We will be waiting for you at the address
                </p>
                <div className="flex justify-center items-center my-4 sm:my-6 md:my-8">
                  <div className="w-16 h-px bg-[#333333] opacity-40" />
                  <img
                    src="/assets/images/graphics/single-flower-1.png"
                    alt=""
                    className="w-20 sm:w-24 md:w-32 h-auto mx-4"
                  />
                  <div className="w-16 h-px bg-[#333333] opacity-40" />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 items-stretch w-full">
              {/* Ceremony */}
              <div className="relative overflow-visible flex-1">
                <div className="relative overflow-hidden">
                  <div
                    ref={venue1Ref}
                    className="text-center transition-opacity duration-500 ease-in-out"
                  >
                    <div className="flex flex-row lg:flex-col gap-6 md:gap-8 lg:gap-6 items-start">
                      <div ref={ceremonyImageColRef} className="w-1/2 lg:w-full">
                        <div className="w-full relative venue-image-container">
                          <img
                            src={ceremonyImageSrc}
                            alt={ceremony.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      </div>
                      <div
                        ref={ceremonyContentColRef}
                        className="w-1/2 lg:w-full flex flex-col justify-between text-center venue-image-container"
                      >
                        <div>
                          <p
                            className="imperial-script-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center"
                            style={{ color: theme.text.brown }}
                          >
                            Ceremony
                          </p>
                          <div className="text-sm sm:text-base md:text-lg font-albert font-bold text-[#333333] mb-2 text-center">
                            {ceremony.name}
                          </div>
                          <p className="text-[10px] sm:text-xs font-albert font-thin text-[#333333] text-center">
                            {ceremony.address && `${ceremony.address}, `}
                            {ceremony.city}
                            {ceremony.state && `, ${ceremony.state}`}
                            {ceremony.zip && ` ${ceremony.zip}`}
                          </p>
                        </div>
                        <div className="flex justify-center items-center mt-4">
                          <a
                            href={ceremony.googleMapsUrl || '#'}
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

              {/* Reception */}
              <div className="relative overflow-visible flex-1">
                <div className="relative overflow-hidden">
                  <div
                    ref={venue2Ref}
                    className="text-center transition-opacity duration-500 ease-in-out"
                  >
                    <div className="flex flex-row lg:flex-col gap-6 md:gap-8 lg:gap-6 items-start">
                      <div
                        ref={receptionContentColRef}
                        className="w-1/2 lg:w-full flex flex-col justify-between text-center venue-image-container order-1 lg:order-2"
                      >
                        <div>
                          <p
                            className="imperial-script-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center"
                            style={{ color: theme.text.brown }}
                          >
                            Reception
                          </p>
                          <div className="text-sm sm:text-base md:text-lg font-albert font-bold text-[#333333] mb-2 text-center">
                            {reception.name}
                          </div>
                          <p className="text-[10px] sm:text-xs font-albert font-thin text-[#333333] text-center">
                            {reception.address && `${reception.address}, `}
                            {reception.city}
                            {reception.state && `, ${reception.state}`}
                            {reception.zip && ` ${reception.zip}`}
                          </p>
                        </div>
                        <div className="flex justify-center items-center mt-4">
                          <a
                            href={reception.googleMapsUrl || '#'}
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
                      <div
                        ref={receptionImageColRef}
                        className="w-1/2 lg:w-full order-2 lg:order-1"
                      >
                        <div className="w-full relative venue-image-container">
                          <img
                            src={receptionImageSrc}
                            alt={reception.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      </div>
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
