import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { venues, images } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Schedule = () => {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const event1Ref = useRef(null)
  const event2Ref = useRef(null)
  const event3Ref = useRef(null)
  const event4Ref = useRef(null)
  const event5Ref = useRef(null)

  useEffect(() => {
    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Timeline line expansion from top to bottom
    tl.fromTo(lineRef.current, 
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 1.5, ease: "power2.out" }
    )

    // Events animate in from top to bottom with stagger
    tl.fromTo(event1Ref.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=1.2"
    )
    .fromTo(event2Ref.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(event3Ref.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(event4Ref.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(event5Ref.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
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

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center">
        <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center}`}>
          <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
            {/* Section Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-leckerli font-light text-gray-900/70 mb-12 text-center">
              Schedule
            </h2>

            {/* Vertical Timeline */}
            <div ref={timelineRef} className="relative max-w-md sm:max-w-xl lg:max-w-3xl w-full">
              {/* Central Vertical Line */}
              <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-600/30 transform -translate-x-1/2"></div>
              
              {/* Start Dot */}
              <div className="w-3 h-3 bg-gray-600 rounded-full border-2 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 z-10 top-0"></div>
              
              {/* End Dot */}
              <div className="w-3 h-3 bg-gray-600 rounded-full border-2 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 z-10 bottom-0"></div>

              {/* Timeline Events */}
              <div className="space-y-16">
                {/* Event 1 - Left side */}
                <div ref={event1Ref} className="flex items-start">
                  <div className="w-1/2 pr-2 text-center relative">
                    <div className="text-2xl sm:text-3xl font-albert font-thin text-gray-600 mb-2 relative">
                      4:30<span className="text-lg">PM</span>
                      <div className="absolute right-0 top-full w-full h-px border-t border-dotted border-gray-400"></div>
                    </div>
                    <div className="text-sm sm:text-base font-albert font-thin text-gray-500 mt-2 leading-tight">
                      Meeting and guest accommodation
                    </div>
                  </div>
                  <div className="w-1/2 pl-6 flex justify-start items-center">
                    <img src="/assets/images/graphics/church-sketch.png" alt="Church" className="w-12 h-12 object-contain opacity-60" />
                  </div>
                </div>

                {/* Event 2 - Right side */}
                <div ref={event2Ref} className="flex items-start">
                  <div className="w-1/2 pr-6 flex justify-end items-center">
                    <img src="/assets/images/graphics/ring-sketch.png" alt="Wedding Rings" className="w-12 h-12 object-contain opacity-60" />
                  </div>
                  <div className="w-1/2 pl-2 text-center relative">
                    <div className="text-2xl sm:text-3xl font-albert font-thin text-gray-600 mb-1 relative">
                      5:00<span className="text-lg">PM</span>
                      <div className="absolute left-0 top-full w-full h-px border-t border-dotted border-gray-400"></div>
                    </div>
                    <div className="text-sm sm:text-base font-albert font-thin text-gray-500 mt-1 leading-tight">
                      Solemn ceremony
                    </div>
                  </div>
                </div>

                {/* Event 3 - Left side */}
                <div ref={event3Ref} className="flex items-start">
                  <div className="w-1/2 pr-2 text-center relative">
                    <div className="text-2xl sm:text-3xl font-albert font-thin text-gray-600 mb-1 relative">
                      6:00<span className="text-lg">PM</span>
                      <div className="absolute right-0 top-full w-full h-px border-t border-dotted border-gray-400"></div>
                    </div>
                    <div className="text-sm sm:text-base font-albert font-thin text-gray-500 mt-1 leading-tight">
                      Start of the banquet
                    </div>
                  </div>
                  <div className="w-1/2 pl-6 flex justify-start items-center">
                    <img src="/assets/images/graphics/cutlery-sketch.png" alt="Cutlery" className="w-12 h-12 object-contain opacity-60" />
                  </div>
                </div>

                {/* Event 4 - Right side */}
                <div ref={event4Ref} className="flex items-start">
                  <div className="w-1/2 pr-6 flex justify-end items-center">
                    <img src="/assets/images/graphics/cake-sketch.png" alt="Wedding Cake" className="w-12 h-12 object-contain opacity-60" />
                  </div>
                  <div className="w-1/2 pl-2 text-center relative">
                    <div className="text-2xl sm:text-3xl font-albert font-thin text-gray-600 mb-1 relative">
                      9:00<span className="text-lg">PM</span>
                      <div className="absolute left-0 top-full w-full h-px border-t border-dotted border-gray-400"></div>
                    </div>
                    <div className="text-sm sm:text-base font-albert font-thin text-gray-500 mt-1 leading-tight">
                      Celebration cake
                    </div>
                  </div>
                </div>

                {/* Event 5 - Left side */}
                <div ref={event5Ref} className="flex items-start">
                  <div className="w-1/2 pr-2 text-center relative">
                    <div className="text-2xl sm:text-3xl font-albert font-thin text-gray-600 mb-2 relative">
                      11:00<span className="text-lg">PM</span>
                      <div className="absolute right-0 top-full w-full h-px border-t border-dotted border-gray-400"></div>
                    </div>
                    <div className="text-sm sm:text-base font-albert font-thin text-gray-500 mt-2 leading-tight">
                      End of the day
                    </div>
                  </div>
                  <div className="w-1/2 pl-6 flex justify-start items-center">
                    <img src="/assets/images/graphics/car-sketch.png" alt="Car" className="w-12 h-12 object-contain opacity-60" />
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