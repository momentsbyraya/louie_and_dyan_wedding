import React, { useEffect, useRef } from 'react'
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
        @keyframes windBlow {
          0% {
            transform: translateX(-150px) translateY(0) rotate(0deg);
            opacity: 0;
          }
          2% {
            opacity: 0.8;
          }
          98% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(calc(100vw + 150px)) translateY(-300px) rotate(360deg);
            opacity: 0;
          }
        }
        .wind-leaf {
          position: absolute;
          left: 0;
          pointer-events: none;
          z-index: 5;
          opacity: 0;
          animation: windBlow 15s linear infinite;
        }
        .wind-leaf:nth-child(1) {
          top: 15%;
          width: 35px;
          height: 35px;
          animation-delay: 0s;
          animation-duration: 16s;
        }
        .wind-leaf:nth-child(2) {
          top: 30%;
          width: 50px;
          height: 50px;
          animation-delay: 3s;
          animation-duration: 18s;
        }
        .wind-leaf:nth-child(3) {
          top: 50%;
          width: 40px;
          height: 40px;
          animation-delay: 6s;
          animation-duration: 20s;
        }
        .wind-leaf:nth-child(4) {
          top: 65%;
          width: 45px;
          height: 45px;
          animation-delay: 9s;
          animation-duration: 17s;
        }
        .wind-leaf:nth-child(5) {
          top: 80%;
          width: 30px;
          height: 30px;
          animation-delay: 12s;
          animation-duration: 19s;
        }
        .wind-leaf:nth-child(6) {
          top: 25%;
          width: 38px;
          height: 38px;
          animation-delay: 15s;
          animation-duration: 21s;
        }
        .wind-leaf:nth-child(7) {
          top: 55%;
          width: 42px;
          height: 42px;
          animation-delay: 18s;
          animation-duration: 16s;
        }
      `}</style>
      {/* Background Image - bg-1 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/images/graphics/bg-1.png)',
          opacity: 0.4
        }}
      />

      {/* Wind Blown Leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img src="/assets/images/graphics/leaf.png" alt="Leaf" className="wind-leaf" />
        <img src="/assets/images/graphics/leaf.png" alt="Leaf" className="wind-leaf" />
        <img src="/assets/images/graphics/leaf.png" alt="Leaf" className="wind-leaf" />
        <img src="/assets/images/graphics/leaf.png" alt="Leaf" className="wind-leaf" />
        <img src="/assets/images/graphics/leaf.png" alt="Leaf" className="wind-leaf" />
        <img src="/assets/images/graphics/leaf.png" alt="Leaf" className="wind-leaf" />
        <img src="/assets/images/graphics/leaf.png" alt="Leaf" className="wind-leaf" />
      </div>

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
              {/* Event 1 - 3:00 PM | GUESTS ARRIVAL (Left) */}
              <div className="flex items-center relative min-h-[60px] opacity-0">
                <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular text-[#333333] mb-1">
                    3:00 PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert text-[#333333] font-bold">
                    GUESTS ARRIVAL
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-albert text-[#333333] italic opacity-80 mt-1">
                    Guests mingle with each other
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: '#edb030' }}></div>
                <div className="w-1/2 pl-6 text-left flex items-center justify-start">
                  <img 
                    src="/assets/images/graphics/welcome-sketch.png" 
                    alt="Guests arrival" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-70"
                  />
                </div>
              </div>

              {/* Event 2 - 4:00 PM | CEREMONY BEGINS (Right) */}
              <div className="flex items-center relative min-h-[60px] opacity-0">
                <div className="w-1/2 pr-6 text-right flex items-center justify-end">
                  <img 
                    src="/assets/images/graphics/church-sketch.png" 
                    alt="Ceremony begins" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-70"
                  />
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: '#edb030' }}></div>
                <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular text-[#333333] mb-1">
                    4:00 PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert text-[#333333] font-bold">
                    CEREMONY BEGINS
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-albert text-[#333333] italic opacity-80 mt-1">
                    Entourage make their entrance
                  </div>
                </div>
              </div>

              {/* Event 3 - 5:00 PM | COCKTAILS (Left) */}
              <div className="flex items-center relative min-h-[60px] opacity-0">
                <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular text-[#333333] mb-1">
                    5:00 PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert text-[#333333] font-bold">
                    COCKTAILS
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-albert text-[#333333] italic opacity-80 mt-1">
                    + some photo and video taking
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

              {/* Event 4 - 6:00 PM | PROGRAM BEGINS (Right) */}
              <div className="flex items-center relative min-h-[60px] opacity-0">
                <div className="w-1/2 pr-6 text-right flex items-center justify-end">
                  <img 
                    src="/assets/images/graphics/program-sketch.png" 
                    alt="Program begins" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-70"
                  />
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: '#edb030' }}></div>
                <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular text-[#333333] mb-1">
                    6:00 PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert text-[#333333] font-bold">
                    PROGRAM BEGINS
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-albert text-[#333333] italic opacity-80 mt-1">
                    Laugh, enjoy and create memories
                  </div>
                </div>
              </div>

              {/* Event 5 - 7:00 PM | DINNER TIME (Left) */}
              <div className="flex items-center relative min-h-[60px] opacity-0">
                <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular text-[#333333] mb-1">
                    7:00 PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert text-[#333333] font-bold">
                    DINNER TIME
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-albert text-[#333333] italic opacity-80 mt-1">
                    Buffet table is open
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: '#edb030' }}></div>
                <div className="w-1/2 pl-6 text-left flex items-center justify-start">
                  <img 
                    src="/assets/images/graphics/dinner-sketch.png" 
                    alt="Dinner time" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-70"
                  />
                </div>
              </div>

              {/* Event 6 - 9:00 PM | AFTER PARTY (Right) */}
              <div className="flex items-center relative min-h-[60px] opacity-0">
                <div className="w-1/2 pr-6 text-right flex items-center justify-end">
                  <img 
                    src="/assets/images/graphics/party-sketch.png" 
                    alt="After party" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-70"
                  />
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: '#edb030' }}></div>
                <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular text-[#333333] mb-1">
                    9:00 PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert text-[#333333] font-bold">
                    AFTER PARTY
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-albert text-[#333333] italic opacity-80 mt-1">
                    Dance, fun and drinks served!
                  </div>
                </div>
              </div>

              {/* Event 7 - 10:00 PM | SEND OFF (Left) */}
              <div className="flex items-center relative min-h-[60px] opacity-0">
                <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular text-[#333333] mb-1">
                    10:00 PM
                  </div>
                  <div className="border-b border-dashed border-[#666666] opacity-50 mb-1"></div>
                  <div className="text-sm sm:text-base md:text-lg font-albert text-[#333333] font-bold">
                    SEND OFF
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: '#edb030' }}></div>
                <div className="w-1/2 pl-6 text-left flex items-center justify-start">
                  <img 
                    src="/assets/images/graphics/car-sketch.png" 
                    alt="Send off" 
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