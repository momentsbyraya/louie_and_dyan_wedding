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
  const welcomeRef = useRef(null)
  const namesRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const eventsRef = useRef(null)

  // Random background position, rotation, and flip
  const bgStyle = useMemo(() => {
    const posX = Math.random() * 100 // 0% to 100%
    const posY = Math.random() * 100 // 0% to 100%
    const rotation = (Math.random() * 360) - 180 // -180 to 180 degrees
    const flipX = Math.random() > 0.5 ? -1 : 1 // Random horizontal flip
    const flipY = Math.random() > 0.5 ? -1 : 1 // Random vertical flip
    return {
      backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)',
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
    .fromTo(welcomeRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(namesRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
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
      className={`relative py-20 w-full overflow-hidden ${themeConfig.paragraph.background}`}
    >
      {/* Background Image with random position, rotation, and flip */}
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

      {/* Soft white gradient overlays for transitions */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/60 to-transparent pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          {/* Wedding Program Title */}
          <div ref={titleRef} className="text-center mb-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#333333] font-lavishly italic">
              Wedding Program
            </h2>
          </div>

          {/* Welcome Text */}
          <div ref={welcomeRef} className="text-center mb-4">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-lavishly italic text-[#333333]">
              Welcome to the wedding of...
            </p>
          </div>

          {/* Couple Names */}
          <div ref={namesRef} className="text-center mb-12">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular text-[#d4af37]">
              {weddingConfig.couple.bride.firstName.toUpperCase()} <span className="text-xl sm:text-2xl md:text-3xl">&</span> {weddingConfig.couple.groom.firstName.toUpperCase()}
            </div>
          </div>

          {/* Vertical Timeline */}
          <div ref={timelineRef} className="relative max-w-md sm:max-w-xl lg:max-w-2xl w-full">
            {/* Central Vertical Line - Gold */}
            <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px bg-[#d4af37] transform -translate-x-1/2"></div>

            {/* Timeline Events */}
            <div ref={eventsRef} className="space-y-8 sm:space-y-10">
              {/* Event 1 - CEREMONY */}
              <div className="flex items-center relative">
                <div className="w-1/2 pr-4 text-right">
                  <div className="text-xl sm:text-2xl md:text-3xl font-albert font-bold text-[#333333]">
                    11:00AM
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#d4af37] rounded-full z-10"></div>
                <div className="w-1/2 pl-4 text-left">
                  <div className="text-base sm:text-lg md:text-xl font-albert font-bold text-[#333333] uppercase">
                    CEREMONY
                  </div>
                </div>
              </div>

              {/* Event 2 - WELCOME */}
              <div className="flex items-center relative">
                <div className="w-1/2 pr-4 text-right">
                  <div className="text-xl sm:text-2xl md:text-3xl font-albert font-bold text-[#333333]">
                    12:00AM
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#d4af37] rounded-full z-10"></div>
                <div className="w-1/2 pl-4 text-left">
                  <div className="text-base sm:text-lg md:text-xl font-albert font-bold text-[#333333] uppercase">
                    WELCOME
                  </div>
                </div>
              </div>

              {/* Event 3 - PHOTOS SESSION */}
              <div className="flex items-center relative">
                <div className="w-1/2 pr-4 text-right">
                  <div className="text-xl sm:text-2xl md:text-3xl font-albert font-bold text-[#333333]">
                    13:00PM
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#d4af37] rounded-full z-10"></div>
                <div className="w-1/2 pl-4 text-left">
                  <div className="text-base sm:text-lg md:text-xl font-albert font-bold text-[#333333] uppercase">
                    PHOTOS SESSION
                  </div>
                </div>
              </div>

              {/* Event 4 - LUNCH */}
              <div className="flex items-center relative">
                <div className="w-1/2 pr-4 text-right">
                  <div className="text-xl sm:text-2xl md:text-3xl font-albert font-bold text-[#333333]">
                    14:00PM
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#d4af37] rounded-full z-10"></div>
                <div className="w-1/2 pl-4 text-left">
                  <div className="text-base sm:text-lg md:text-xl font-albert font-bold text-[#333333] uppercase">
                    LUNCH
                  </div>
                </div>
              </div>

              {/* Event 5 - COCKTAILS */}
              <div className="flex items-center relative">
                <div className="w-1/2 pr-4 text-right">
                  <div className="text-xl sm:text-2xl md:text-3xl font-albert font-bold text-[#333333]">
                    16:00PM
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#d4af37] rounded-full z-10"></div>
                <div className="w-1/2 pl-4 text-left">
                  <div className="text-base sm:text-lg md:text-xl font-albert font-bold text-[#333333] uppercase">
                    COCKTAILS
                  </div>
                </div>
              </div>

              {/* Event 6 - FIRST DANCE */}
              <div className="flex items-center relative">
                <div className="w-1/2 pr-4 text-right">
                  <div className="text-xl sm:text-2xl md:text-3xl font-albert font-bold text-[#333333]">
                    17:00PM
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#d4af37] rounded-full z-10"></div>
                <div className="w-1/2 pl-4 text-left">
                  <div className="text-base sm:text-lg md:text-xl font-albert font-bold text-[#333333] uppercase">
                    FIRST DANCE
                  </div>
                </div>
              </div>

              {/* Event 7 - DANCING */}
              <div className="flex items-center relative">
                <div className="w-1/2 pr-4 text-right">
                  <div className="text-xl sm:text-2xl md:text-3xl font-albert font-bold text-[#333333]">
                    18:00PM
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#d4af37] rounded-full z-10"></div>
                <div className="w-1/2 pl-4 text-left">
                  <div className="text-base sm:text-lg md:text-xl font-albert font-bold text-[#333333] uppercase">
                    DANCING
                  </div>
                </div>
              </div>

              {/* Event 8 - PERFORMANCES */}
              <div className="flex items-center relative">
                <div className="w-1/2 pr-4 text-right">
                  <div className="text-xl sm:text-2xl md:text-3xl font-albert font-bold text-[#333333]">
                    20:00PM
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#d4af37] rounded-full z-10"></div>
                <div className="w-1/2 pl-4 text-left">
                  <div className="text-base sm:text-lg md:text-xl font-albert font-bold text-[#333333] uppercase">
                    PERFORMANCES
                  </div>
                </div>
              </div>

              {/* Event 9 - AFTER PARTY */}
              <div className="flex items-center relative">
                <div className="w-1/2 pr-4 text-right">
                  <div className="text-xl sm:text-2xl md:text-3xl font-albert font-bold text-[#333333]">
                    22:00PM
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#d4af37] rounded-full z-10"></div>
                <div className="w-1/2 pl-4 text-left">
                  <div className="text-base sm:text-lg md:text-xl font-albert font-bold text-[#333333] uppercase">
                    AFTER PARTY
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

export default Schedule 