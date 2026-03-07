import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { weddingConfig } from '../config/weddingConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Schedule = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const eventsRef = useRef(null)

  // Random background position, rotation, and flip - Base layer (old-book-2)
  const bgStyleBase = useMemo(() => {
    const posX = Math.random() * 100 // 0% to 100%
    const posY = Math.random() * 100 // 0% to 100%
    const rotation = (Math.random() * 360) - 180 // -180 to 180 degrees
    const flipX = Math.random() > 0.5 ? -1 : 1 // Random horizontal flip
    const flipY = Math.random() > 0.5 ? -1 : 1 // Random vertical flip
    return {
      backgroundImage: 'url(/assets/images/graphics/old-book-2.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
      opacity: 0.75
    }
  }, [])

  // Random background position, rotation, and flip - Top layer (bg-1)
  const bgStyle = useMemo(() => {
    const posX = Math.random() * 100 // 0% to 100%
    const posY = Math.random() * 100 // 0% to 100%
    const rotation = (Math.random() * 360) - 180 // -180 to 180 degrees
    const flipX = Math.random() > 0.5 ? -1 : 1 // Random horizontal flip
    const flipY = Math.random() > 0.5 ? -1 : 1 // Random vertical flip
    return {
      backgroundImage: 'url(/assets/images/graphics/bg-1.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
      opacity: 0.5
    }
  }, [])


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

    // Title animation first
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Timeline line expansion from top to bottom
    tl.fromTo(lineRef.current, 
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 1.5, ease: "power2.out" },
      "-=0.4"
    )

    // Events animate in
    tl.fromTo(eventsRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=1.2"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full overflow-hidden bg-white schedule-section-lg"
    >
      <style>{`
        @media (min-width: 992px) {
          .schedule-section-lg {
            padding-bottom: 12rem !important;
          }
        }
      `}</style>
      {/* Background Image - Base layer (old-book-2) */}
      <div 
        className="absolute bg-no-repeat"
        style={{
          ...bgStyleBase,
          width: '200%',
          height: '200%',
          left: '-50%',
          top: '-50%'
        }}
      />
      {/* Background Image - Top layer (bg-1) */}
      <div 
        className="absolute bg-no-repeat"
        style={{
          ...bgStyle,
          width: '200%',
          height: '200%',
          left: '-50%',
          top: '-50%'
        }}
      />


      {/* Content */}
      <div className="relative z-10 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          {/* Wedding Program Title */}
          <div ref={titleRef} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 font-caribbean flex items-center justify-center text-left gap-0" style={{ background: 'linear-gradient(135deg, #edb030 0%, #d99a1a 20%, #926018 50%, #775016 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" style={{ lineHeight: '0.8' }}>W</span>
              <span className="inline-block" style={{ marginLeft: '0' }}>
                <span>edding </span>
                <span>Program</span>
              </span>
            </h2>
          </div>


          {/* Vertical Timeline */}
          <div ref={timelineRef} className="relative max-w-md sm:max-w-xl lg:max-w-2xl w-full mx-auto">
            {/* Central Vertical Line - Dark Grey */}
            <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px bg-[#666666] transform -translate-x-1/2"></div>

            {/* Timeline Events */}
            <div ref={eventsRef} className="space-y-20 sm:space-y-24 md:space-y-28 lg:space-y-32">
              {/* Event 1 - 4:30PM - Meeting and guest accommodation (Left) */}
              <div className="flex items-center relative min-h-[60px]">
                <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular text-[#333333] mb-1">
                    4:30PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert text-[#333333]">
                    Meeting and guest accommodation
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: '#edb030' }}></div>
                <div className="w-1/2 pl-6 text-left flex items-center justify-start">
                  <img 
                    src="/assets/images/graphics/car-sketch.png" 
                    alt="Guest accommodation" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-70"
                  />
                </div>
              </div>

              {/* Event 2 - 5:00PM - Solemn ceremony (Right) */}
              <div className="flex items-center relative min-h-[60px]">
                <div className="w-1/2 pr-6 text-right flex items-center justify-end">
                  <img 
                    src="/assets/images/graphics/church-sketch.png" 
                    alt="Solemn ceremony" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-70"
                  />
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: '#edb030' }}></div>
                <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular text-[#333333] mb-1">
                    5:00PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert text-[#333333]">
                    Solemn ceremony
                  </div>
                </div>
              </div>

              {/* Event 3 - 6:00PM - Start of the banquet (Left) */}
              <div className="flex items-center relative min-h-[60px]">
                <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular text-[#333333] mb-1">
                    7:00PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert text-[#333333]">
                    Start of the banquet
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: '#edb030' }}></div>
                <div className="w-1/2 pl-6 text-left flex items-center justify-start">
                  <img 
                    src="/assets/images/graphics/ring-sketch.png" 
                    alt="Start of the banquet" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-70"
                  />
                </div>
              </div>

              {/* Event 4 - 10:00PM - End of the day (Right) */}
              <div className="flex items-center relative min-h-[60px]">
                <div className="w-1/2 pr-6 text-right flex items-center justify-end">
                  <img 
                    src="/assets/images/graphics/cake-sketch.png" 
                    alt="End of the day" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-70"
                  />
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: '#edb030' }}></div>
                <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular text-[#333333] mb-1">
                    10:00PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert text-[#333333]">
                    End of the day
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* White Blur Image - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <img 
          src="/assets/images/graphics/white-blur.png" 
          alt="White blur effect"
          className="w-full h-auto"
        />
      </div>
    </section>
  )
}

export default Schedule 