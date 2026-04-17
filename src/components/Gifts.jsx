import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Gifts = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [isGiftRegistryModalOpen, setIsGiftRegistryModalOpen] = useState(false)

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

    // Content animation
    tl.fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        className="relative pt-4 pb-20 w-full overflow-hidden min-h-[500px]"
      >
        {/* Background Image - bg-1 */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/images/graphics/bg-1.png)',
            opacity: 0.4
          }}
        />

        {/* Gold Banner - Top */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center z-10">
          <img 
            src="/assets/images/graphics/gold-banner-2.png" 
            alt="Decorative graphic"
            className="w-full h-auto"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center min-h-[500px]">
          <div className="max-w-4xl w-full mx-auto px-8 sm:px-12 lg:px-16">
            <div ref={contentRef} className="flex flex-col items-center w-full">
              {/* Gift Registry Section */}
              <div className="w-full">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 font-gilliequest uppercase" style={{ background: 'linear-gradient(135deg, #edb030 0%, #d99a1a 20%, #926018 50%, #775016 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" style={{ lineHeight: '0.8' }}>G</span>
                    <span className="inline-block">IFTS</span>
                  </h2>
                  <div>
                    <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed mb-4">
                      Your presence is our present, but if you'd like to give a gift, we've made it easy with digital payment options.
                    </p>
                    {/* Gift Registry Button */}
                    <div className="flex justify-center items-center mt-6">
                      <button
                        type="button"
                        onClick={() => setIsGiftRegistryModalOpen(true)}
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-[25px] bg-nude-brown px-6 py-3 font-albert text-white transition-opacity duration-300 hover:opacity-90"
                      >
                        <span className="text-sm font-thin sm:text-base">
                          Send a Gift
                        </span>
                        <ion-icon 
                          name="gift-outline" 
                          style={{ fontSize: '1.25rem', width: '1.25rem', height: '1.25rem', color: '#ffffff' }}
                        ></ion-icon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gold Banner - Bottom (Flipped Vertically) */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center z-10">
          <img 
            src="/assets/images/graphics/gold-banner-2.png" 
            alt="Decorative graphic"
            className="w-full h-auto scale-y-[-1]"
          />
        </div>
      </section>

      {/* Gift Registry Modal */}
      {isGiftRegistryModalOpen && createPortal(
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          onClick={() => setIsGiftRegistryModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsGiftRegistryModalOpen(false)
            }}
            className="absolute right-4 top-4 z-[10001] rounded-full bg-white/10 p-2 text-white transition-colors duration-200 hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-7 w-7" />
          </button>
          <div className="relative z-[10001] max-h-[92vh] max-w-[92vw] p-3">
            <img
              src="/assets/images/monetary-gifts/gcash.jpg"
              alt="GCash"
              className="max-h-[88vh] max-w-[88vw] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default Gifts
