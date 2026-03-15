import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, Building, CreditCard, Smartphone } from 'lucide-react'
import RSVPModal from './RSVPModal'
import { paymentMethods as paymentMethodsData } from '../data'
import { themeConfig } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const RSVP = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isGiftRegistryModalOpen, setIsGiftRegistryModalOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const { paymentMethods } = paymentMethodsData

  // Check if RSVP deadline has passed (May 1st)
  const isRSVPDeadlinePassed = () => {
    const today = new Date()
    const currentYear = today.getFullYear()
    const deadline = new Date(currentYear, 4, 1) // May is month 4 (0-indexed)
    return today >= deadline
  }

  const rsvpEnded = isRSVPDeadlinePassed()

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

  const openRSVPModal = () => {
    if (!rsvpEnded) {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative pt-20 w-full overflow-hidden bg-white min-h-[500px]"
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
            <div className="flex justify-center items-center">
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
            <div ref={contentRef} className="flex flex-col items-center w-full">

              {/* RSVP Section - Matching Entourage Layout */}
              <div className="w-full">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 font-caribbean pt-4 sm:pt-6 md:pt-8" style={{ background: 'linear-gradient(135deg, #edb030 0%, #d99a1a 20%, #926018 50%, #775016 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" style={{ lineHeight: '0.8' }}>R</span>
                    <span className="inline-block">svp</span>
                  </h2>
                  <div>
                    {rsvpEnded ? (
                      <>
                        <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed mb-4">
                          The RSVP period has ended. For any inquiries or changes to your response, please contact us directly.
                        </p>
                        <div className="flex justify-center items-center mt-6">
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
                      </>
                    ) : (
                      <>
                        <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed mb-4">
                          Kindly answer the RSVP. Let us know if you'll be joining us for our celebration.
                        </p>
                        {/* Submit Response Button */}
                        <div className="flex justify-center items-center mt-6">
                          <button
                            onClick={openRSVPModal}
                            className="flex items-center justify-center gap-2 px-6 py-3 border border-[#999999] hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                            style={{ borderRadius: '25px' }}
                          >
                            <span className="text-sm sm:text-base font-albert font-thin text-[#333333]">
                              Submit your response
                            </span>
                            <ion-icon 
                              name="mail-outline" 
                              style={{ fontSize: '1.25rem', width: '1.25rem', height: '1.25rem', color: '#333333' }}
                            ></ion-icon>
                          </button>
                        </div>
                        <div className="flex justify-center items-center mt-6">
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
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Gift Registry Section - Matching Layout */}
              <div className="w-full mt-12">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 font-caribbean pt-4 sm:pt-6 md:pt-8" style={{ background: 'linear-gradient(135deg, #edb030 0%, #d99a1a 20%, #926018 50%, #775016 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" style={{ lineHeight: '0.8' }}>G</span>
                    <span className="inline-block">ifts</span>
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
                    <div className="flex justify-center items-center mt-6">
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
                </div>
              </div>

              {/* Gold Banner - After Gift Section (Flipped Vertically) */}
              <div className="w-screen -mt-16 sm:-mt-20 md:-mt-24 -mx-8 sm:-mx-12 lg:-mx-16 flex justify-center items-center">
                <img 
                  src="/assets/images/graphics/gold-banner-2.png" 
                  alt="Decorative graphic"
                  className="w-full h-auto scale-y-[-1]"
                  style={{ width: '100vw' }}
                />
              </div>

              {/* Photo Section */}
              <div className="w-screen -mx-8 sm:-mx-12 lg:-mx-16">
                <img 
                  src="/assets/images/prenup/new/FOR EDITS-24.jpg"
                  alt="Wedding photo"
                  className="w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ width: '100vw' }}
                  loading="lazy"
                  onClick={() => setSelectedPhoto('/assets/images/prenup/new/FOR EDITS-24.jpg')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      <RSVPModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Photo Preview Modal */}
      {selectedPhoto && createPortal(
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw', 
            height: '100vh',
            margin: 0,
            padding: 0
          }}
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Black Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
          />
          
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedPhoto(null)
            }}
            className="absolute top-4 right-4 z-[10001] text-white hover:opacity-80 transition-opacity p-2"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem'
            }}
            aria-label="Close"
          >
            <X className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>

          {/* Image */}
          <img
            src={selectedPhoto}
            alt="Full size preview"
            className="max-w-full max-h-full object-contain z-[10001]"
            style={{
              position: 'relative',
              zIndex: 10001
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}

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

export default RSVP
