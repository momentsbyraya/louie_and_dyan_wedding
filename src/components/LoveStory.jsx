import React, { useEffect, useRef, useMemo } from 'react'
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
  const imageRef = useRef(null)

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
    .fromTo(imageRef.current, 
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
      className="relative py-20 w-full overflow-hidden"
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
      <div className="relative z-20 flex items-center justify-center py-12 pb-32 sm:pb-40 md:pb-48">
        <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          {/* Once Upon a Time */}
          <div ref={titleRef} className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-lavishly italic text-[#333333]">
              Once Upon a Time
            </h2>
          </div>

          {/* Love Story Content */}
          <div ref={storyRef} className="text-center mb-12">
            <p className="text-base sm:text-lg md:text-xl font-albert font-thin text-[#333333] leading-relaxed">
              From the moment our eyes first met, we knew something <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-lavishly italic text-[#d4af37] mt-2 mb-2">magical was beginning.</span> 
              What started as a simple conversation has blossomed into a beautiful journey of 
              laughter, adventures, and countless precious memories together. Every day feels like 
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-lavishly italic text-[#d4af37] mt-2 mb-2">a new chapter in our fairy tale</span>, and now, as we prepare to say "I do," we invite you 
              to be part of our happily ever after.
            </p>
          </div>
        </div>
      </div>

      {/* Castle Illustration - Absolute positioned at bottom */}
      <div ref={imageRef} className="absolute bottom-0 left-0 w-full z-10">
        <img 
          src="/assets/images/graphics/palace-3.svg" 
          alt="Castle illustration" 
          className="w-full h-auto scale-110 origin-bottom opacity-60"
        />
      </div>
    </section>
  )
}

export default LoveStory 