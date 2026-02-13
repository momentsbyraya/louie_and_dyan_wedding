import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { faq } from '../data'
import { ChevronDown } from 'lucide-react'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const FAQ = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)

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

    // Header animation first
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Content animation
    tl.fromTo(contentRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 font-gilliequest uppercase" style={{ background: 'linear-gradient(135deg, #edb030 0%, #d99a1a 20%, #926018 50%, #775016 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" style={{ lineHeight: '0.8' }}>F</span>
              <span className="inline-block">AQ</span>
            </h2>
            <div className="flex justify-center items-center mb-12">
              {/* Left horizontal line */}
              <div className="w-16 h-px bg-[#333333] opacity-40"></div>
              
              <img 
                src="/assets/images/graphics/graphics-1.svg" 
                alt="Decorative graphic" 
                className="w-32 sm:w-40 md:w-48 h-auto mx-4"
              />
              
              {/* Right horizontal line */}
              <div className="w-16 h-px bg-[#333333] opacity-40"></div>
            </div>
          </div>

          {/* FAQ Items */}
          <div ref={contentRef} className="space-y-4">
            {faq.faqData && faq.faqData.map((item, index) => (
              <div
                key={index}
                className="border-b border-[#333333] border-opacity-20 pb-4"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left flex items-center justify-between py-4 hover:opacity-80 transition-opacity"
                >
                  <h3 className="text-lg sm:text-xl font-albert font-bold text-[#333333] pr-4">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-[#333333] transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="mt-2 pb-2">
                    <p className="text-base sm:text-lg font-albert font-thin text-[#333333] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
