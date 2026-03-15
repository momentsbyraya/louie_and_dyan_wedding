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
                        onClick={() => setIsGiftRegistryModalOpen(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-[#999999] hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                        style={{ borderRadius: '25px' }}
                      >
                        <span className="text-sm sm:text-base font-albert font-thin text-[#333333]">
                          Send a Gift
                        </span>
                        <ion-icon 
                          name="gift-outline" 
                          style={{ fontSize: '1.25rem', width: '1.25rem', height: '1.25rem', color: '#333333' }}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsGiftRegistryModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header - Sticky */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200 rounded-t-2xl">
              <h3 className="text-2xl sm:text-3xl alice-regular font-black text-gray-800" style={{ fontWeight: 900 }}>Methods:</h3>
              <button
                onClick={() => setIsGiftRegistryModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content - Only Monetary Gifts Images */}
            <div className="p-6">
              <div className="flex flex-col gap-4">
                <img 
                  src="/assets/images/monetary-gifts/gcash.jpg" 
                  alt="GCash" 
                  className="w-full h-auto object-contain"
                />
                <img 
                  src="/assets/images/monetary-gifts/maribank.jpg" 
                  alt="MariBank" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default Gifts
