import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { weddingConfig } from '../config/weddingConfig'
import { loveStory } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const LoveStory = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const storyRef = useRef(null)

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

    // Animate elements sequentially
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(storyRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 sm:pt-40 md:pt-48 w-full overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl w-full mx-auto px-8 sm:px-12 lg:px-16">

          {/* Love Story Content */}
          <div ref={storyRef} className="text-center mb-12">
            <p className="alice-regular font-black text-[#333333] leading-relaxed max-w-3xl mx-auto" style={{ fontWeight: 900, fontSize: '1rem', lineHeight: '1.8' }}>
              <span className="alice-regular font-bold" style={{ fontSize: '1.5rem' }}>T</span>wo hearts found each other, and their love story began. Through shared moments and quiet conversations, they discovered the beauty of connection. As they stand together, ready to begin this new chapter, they know their love story is just getting started.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoveStory 