import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, Building, CreditCard, Smartphone } from 'lucide-react'
import RSVPModal from './RSVPModal'
import EntourageModal from './EntourageModal'
import { paymentMethods as paymentMethodsData } from '../data'
import { themeConfig } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const RSVP = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const emailSketchRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEntourageModalOpen, setIsEntourageModalOpen] = useState(false)
  const [isGiftRegistryModalOpen, setIsGiftRegistryModalOpen] = useState(false)

  const { paymentMethods } = paymentMethodsData

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

    // Pulse animation for email sketch
    if (emailSketchRef.current) {
      gsap.to(emailSketchRef.current, {
        scale: 1.1,
        opacity: 0.9,
        duration: 1.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      if (emailSketchRef.current) {
        gsap.killTweensOf(emailSketchRef.current)
      }
    }
  }, [])

  const openRSVPModal = () => {
    setIsModalOpen(true)
  }

  const openEntourageModal = () => {
    setIsEntourageModalOpen(true)
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-20 w-full overflow-hidden bg-[#f5f5f0] min-h-[500px]"
      >
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
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#333333] mb-3 font-caribbean">
                    <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" style={{ lineHeight: '0.8' }}>R</span>
                    <span className="inline-block">svp</span>
                  </h2>
                  <div>
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
                        <img
                          src="/assets/images/graphics/email-sketch.png"
                          alt="Email"
                          className="w-5 h-5 sm:w-6 sm:h-6 object-contain opacity-70"
                        />
                      </button>
                    </div>
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
                    

                  </div>
                </div>
              </div>

              {/* Entourage Section - Matching Location Layout */}
              <div className="w-full mt-12">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#333333] mb-3 font-caribbean">
                    <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" style={{ lineHeight: '0.8' }}>E</span>
                    <span className="inline-block">ntourage</span>
                  </h2>
                  <div>
                    <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed mb-4">
                      Meet the special people who will be part of our celebration
                    </p>
                    {/* Entourage Button */}
                    <div className="flex justify-center items-center mt-6">
                      <button
                        onClick={openEntourageModal}
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-[#999999] hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                        style={{ borderRadius: '25px' }}
                      >
                        <span className="text-sm sm:text-base font-albert font-thin text-[#333333]">
                          View our entourage
                        </span>
                        <img
                          src="/assets/images/graphics/email-sketch.png"
                          alt="Email"
                          className="w-5 h-5 sm:w-6 sm:h-6 object-contain opacity-70"
                        />
                      </button>
                    </div>
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
                  </div>
                </div>
              </div>

              {/* Gift Registry Section - Matching Layout */}
              <div className="w-full mt-12">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#333333] mb-3 font-caribbean">
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
                        <img
                          src="/assets/images/graphics/email-sketch.png"
                          alt="Email"
                          className="w-5 h-5 sm:w-6 sm:h-6 object-contain opacity-70"
                        />
                      </button>
                    </div>
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
                  </div>
                </div>
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

      {/* Entourage Modal */}
      <EntourageModal
        isOpen={isEntourageModalOpen}
        onClose={() => setIsEntourageModalOpen(false)}
      />

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
              <h3 className="text-2xl sm:text-3xl alice-regular font-black text-gray-800" style={{ fontWeight: 900 }}>Payment Options</h3>
              <button
                onClick={() => setIsGiftRegistryModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`w-12 h-12 ${themeConfig.backgrounds.theme} rounded-full flex items-center justify-center text-gray-800`}>
                        {method.icon === 'Building' && <Building className="w-6 h-6" />}
                        {method.icon === 'CreditCard' && <CreditCard className="w-6 h-6" />}
                        {method.icon === 'Smartphone' && <Smartphone className="w-6 h-6" />}
                      </div>
                    </div>
                    
                    <h4 className="text-lg sm:text-xl alice-regular font-black text-gray-800 mb-4" style={{ fontWeight: 900 }}>{method.name}</h4>
                    
                    {/* QR Code - Only show if qrCode is provided */}
                    {method.accountInfo.qrCode && (
                      <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                        <img 
                          src={method.accountInfo.qrCode} 
                          alt="QR Code" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    
                    {/* Account Information */}
                    <div className="text-left space-y-2 text-sm sm:text-base alice-regular font-black text-gray-700" style={{ fontWeight: 900 }}>
                      {method.accountInfo.bank && (
                        <p><span className="font-black">Bank:</span> {method.accountInfo.bank}</p>
                      )}
                      {method.accountInfo.provider && (
                        <p><span className="font-black">Provider:</span> {method.accountInfo.provider}</p>
                      )}
                      <p><span className="font-black">Account:</span> {method.accountInfo.accountNumber}</p>
                      <p><span className="font-black">Name:</span> {method.accountInfo.accountName}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {paymentMethods.some(method => method.accountInfo.qrCode) && (
                <div className="mt-8 text-center">
                  <p className="text-sm sm:text-base alice-regular font-black text-gray-600" style={{ fontWeight: 900 }}>
                    Scan the QR code with your banking app or use the account details above for manual transfer.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default RSVP
