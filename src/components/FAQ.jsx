import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { faq } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const FAQ = () => {
  const sectionRef = useRef(null)
  const faqRef = useRef(null)
  const faqTitleRef = useRef(null)

  useEffect(() => {
    // FAQ section animation - title first, then items one after the other
    if (faqRef.current && faqTitleRef.current) {
      // Set initial states
      gsap.set(faqTitleRef.current, { opacity: 0, y: 30 })
        
      ScrollTrigger.create({
        trigger: faqRef.current,
        start: "top 80%",
        onEnter: () => {
          // 1. Animate title first
          gsap.to(faqTitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
              // 2. After title animation, find and animate items one after the other
              const faqItemsContainer = faqRef.current.querySelector('.space-y-6')
              if (faqItemsContainer) {
                const faqItems = Array.from(faqItemsContainer.children).filter(child => child.tagName === 'DIV')
                
                if (faqItems.length > 0) {
                  // Set initial states for items
                  gsap.set(faqItems, { opacity: 0, y: 30 })
                  
                  // Animate items one after the other
                  gsap.to(faqItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.2
                  })
                }
              }
            }
          })
        }
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
      id="faq"
      className="relative pt-12 pb-20 w-full overflow-hidden bg-white"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/images/graphics/gold-bg.png)',
          opacity: 0.00000005,
          zIndex: 0
        }}
      />
      
      {/* Gold overlay for elegant effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#edb030]/40 via-[#d99a1a]/35 to-[#926018]/40 z-[1]" />
      
      {/* FAQ Section */}
      <div className="relative z-20 faq-section">
        <div ref={faqRef} className="relative z-10 w-full px-8 sm:px-12 md:px-8 lg:px-16">
          <div ref={faqTitleRef} className="relative inline-block px-6 py-3 mb-12 text-center w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 font-caribbean pt-4 sm:pt-6 md:pt-8" style={{ background: 'linear-gradient(135deg, #edb030 0%, #d99a1a 20%, #926018 50%, #775016 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" style={{ lineHeight: '0.8' }}>R</span>
              <span className="inline-block">eminder</span>
            </h2>
          </div>
          {faq && faq.faqData && (
            <div className="space-y-6 max-w-[600px] mx-auto">
              {faq.faqData.slice(0, 3).map((item, index) => (
                <div key={index}>
                  <div className="mb-2">
                    <p className="text-base sm:text-lg font-albert font-bold text-[#333333] mb-2">
                      Q: {item.question}
                    </p>
                    <p className="text-sm sm:text-base font-albert font-thin text-[#333333] whitespace-pre-line">
                      A: {item.answer}
                    </p>
                  </div>
                  {index < Math.min(3, faq.faqData.length) - 1 && (
                    <div className="h-px bg-[#333333]/30 mt-6"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FAQ
