import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import theme from '../config/theme.json'
import { sectionTitleStyle } from '../config/themeConfig'
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Schedule = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const eventsRef = useRef(null)



  useEffect(() => {
    // Title animation on scroll
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
      scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
          }
        }
    )
    }

    // Timeline line expansion on scroll
    if (lineRef.current) {
      gsap.fromTo(lineRef.current, 
      { scaleY: 0, transformOrigin: "top" },
        { 
          scaleY: 1, 
          duration: 1.5, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
          }
        }
      )
    }

    // Animate each event item individually on scroll
    if (eventsRef.current) {
      const eventItems = eventsRef.current.querySelectorAll('div.flex.items-center.relative')
      
      // Set initial state for all items
      gsap.set(eventItems, { opacity: 0, y: 30 })
      
      // Animate each item individually when it scrolls into view
      eventItems.forEach((item, index) => {
        gsap.fromTo(item,
      { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true
            }
          }
        )
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 md:py-32 lg:py-40 w-full overflow-hidden bg-white schedule-section-lg"
    >
      <style>{`
        @media (min-width: 992px) {
          .schedule-section-lg {
            padding-top: 16rem !important;
            padding-bottom: 16rem !important;
          }
        }
        @keyframes subtlePulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.75;
            transform: scale(1.05);
          }
        }
        @keyframes subtlePulseFlipped {
          0%, 100% {
            opacity: 1;
            transform: scaleX(-1) scaleY(-1) scale(1);
          }
          50% {
            opacity: 0.75;
            transform: scaleX(-1) scaleY(-1) scale(1.05);
          }
        }
        .leaf-banner-pulse {
          animation: subtlePulse 3s ease-in-out infinite;
        }
        .leaf-banner-pulse-flipped {
          animation: subtlePulseFlipped 3s ease-in-out infinite;
        }
      `}</style>
      {/* Background Image - old book */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)'
        }}
      />

      {/* Leaf Banner - Top */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center z-10">
        <img 
          src="/assets/images/graphics/leaf-banner.png" 
          alt="Leaf banner decoration"
          className="w-full h-auto leaf-banner-pulse"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center py-16 sm:py-20 md:py-24">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          {/* Wedding Program Title */}
          <div ref={titleRef} className="text-center mb-12 sm:mb-16">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 leading-tight whitespace-nowrap"
              style={sectionTitleStyle}
            >
              Wedding Program
            </h2>
          </div>


          {/* Vertical Timeline */}
          <div ref={timelineRef} className="relative max-w-md sm:max-w-xl lg:max-w-2xl w-full mx-auto">
            {/* Central Vertical Line - Dark Grey */}
            <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px bg-[#666666] transform -translate-x-1/2"></div>

            {/* Timeline Events */}
            <div
              ref={eventsRef}
              className="space-y-20 sm:space-y-24 md:space-y-28 lg:space-y-32"
            >
              {/* Event 1 - 1:30 PM | WELCOMING OF GUESTS (Left) */}
              <div className="flex items-center relative min-h-[60px] opacity-0">
                <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
                  <div
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1"
                    style={{ color: theme.text.brown }}
                  >
                    1:30 PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert font-bold text-[#333333]">
                    WELCOMING OF GUESTS
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-albert italic text-[#333333] opacity-80 mt-1">
                    Welcome and seating before the ceremony
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: '#edb030' }}></div>
                <div className="w-1/2 pl-6 text-left flex items-center justify-start">
                  <img 
                    src="/assets/images/graphics/welcome-sketch.png" 
                    alt="Welcoming of guests" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-70"
                  />
                </div>
              </div>

              {/* Event 2 - 2:30 PM | WEDDING CEREMONY (Right) */}
              <div className="flex items-center relative min-h-[60px] opacity-0">
                <div className="w-1/2 pr-6 text-right flex items-center justify-end">
                  <img 
                    src="/assets/images/graphics/church-sketch.png" 
                    alt="Wedding ceremony" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-70"
                  />
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: '#edb030' }}></div>
                <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
                  <div
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1"
                    style={{ color: theme.text.brown }}
                  >
                    2:30 PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert font-bold text-[#333333]">
                    WEDDING CEREMONY
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-albert italic text-[#333333] opacity-80 mt-1">
                    San Antonio de Padua, Nasugbu
                  </div>
                </div>
              </div>

              {/* Event 3 - 5:30 PM | COCKTAILS (Left) */}
              <div className="flex items-center relative min-h-[60px] opacity-0">
                <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
                  <div
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1"
                    style={{ color: theme.text.brown }}
                  >
                    5:30 PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert font-bold text-[#333333]">
                    COCKTAILS
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-albert italic text-[#333333] opacity-80 mt-1">
                    Hillbarn Tagaytay
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: '#edb030' }}></div>
                <div className="w-1/2 pl-6 text-left flex items-center justify-start">
                  <img 
                    src="/assets/images/graphics/cocktil-sketch.png" 
                    alt="Cocktails" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-70"
                  />
                </div>
              </div>

              {/* Event 4 - 7:00 PM | RECEPTION DINNER (Right) */}
              <div className="flex items-center relative min-h-[60px] opacity-0">
                <div className="w-1/2 pr-6 text-right flex items-center justify-end">
                  <img 
                    src="/assets/images/graphics/dinner-sketch.png" 
                    alt="Reception dinner" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-70"
                  />
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: '#edb030' }}></div>
                <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
                  <div
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1"
                    style={{ color: theme.text.brown }}
                  >
                    7:00 PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert font-bold text-[#333333]">
                    RECEPTION DINNER
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-albert italic text-[#333333] opacity-80 mt-1">
                    Hillbarn Tagaytay
                  </div>
                </div>
              </div>

              {/* Event 5 - 11:00 PM | EVENING ENDS (Left) */}
              <div className="flex items-center relative min-h-[60px] opacity-0">
                <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
                  <div
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1"
                    style={{ color: theme.text.brown }}
                  >
                    11:00 PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert font-bold text-[#333333]">
                    EVENING ENDS
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-albert italic text-[#333333] opacity-80 mt-1">
                    Thank you for celebrating with us
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: '#edb030' }}></div>
                <div className="w-1/2 pl-6 text-left flex items-center justify-start">
                  <img 
                    src="/assets/images/graphics/car-sketch.png" 
                    alt="Celebration ends" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-70"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaf Banner - Bottom (Flipped Vertically and Horizontally) */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center z-10">
        <img 
          src="/assets/images/graphics/leaf-banner.png" 
          alt="Leaf banner decoration"
          className="w-full h-auto leaf-banner-pulse-flipped"
        />
      </div>
    </section>
  )
}

export default Schedule 