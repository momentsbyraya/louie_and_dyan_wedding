import React, { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Gift, X, Building, CreditCard, Smartphone } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { paymentMethods as paymentMethodsData } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const GiftRegistry = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { paymentMethods } = paymentMethodsData

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

    // Header animation first
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Content animation after header
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

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      {/* Gift Registry Section */}
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
        <div className="relative z-20 flex items-center justify-center">
          <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
            {/* Header Section */}
            <div ref={headerRef} className="text-center mb-8">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#333333] mb-8 font-lavishly italic">
                Loved Ones,
              </h2>
            </div>

            {/* Text Section */}
            <div ref={contentRef} className="text-center mb-12">
              <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed">
                Your presence is our present, but if you'd like to give a gift, 
                we've made it easy with digital payment options.
              </p>
            </div>

            {/* Send Gift Button */}
            <div className="text-center">
              <button
                onClick={openModal}
                className="w-full inline-flex items-center justify-center space-x-3 px-8 py-3 sm:py-5 lg:py-2 text-[#333333] rounded-sm transition-colors duration-200 text-sm sm:text-2xl lg:text-base font-medium border-2 border-[#333333] hover:opacity-80"
              >
                <span>Send a Gift</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />
          
                  {/* Modal Content */}
                  <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header - Sticky */}
                    <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200 rounded-t-2xl">
                      <h3 className="text-2xl sm:text-3xl font-script text-gray-800">Payment Options</h3>
                      <button
                        onClick={closeModal}
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
                    
                    <h4 className="text-lg sm:text-xl font-medium text-gray-800 mb-4">{method.name}</h4>
                    
                    {/* QR Code Placeholder */}
                    <div className="w-32 h-32 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-sm text-gray-600">QR Code</span>
                    </div>
                    
                    {/* Account Information */}
                    <div className="text-left space-y-2 text-sm sm:text-base text-gray-700">
                      {method.accountInfo.bank && (
                        <p><span className="font-medium">Bank:</span> {method.accountInfo.bank}</p>
                      )}
                      {method.accountInfo.provider && (
                        <p><span className="font-medium">Provider:</span> {method.accountInfo.provider}</p>
                      )}
                      <p><span className="font-medium">Account:</span> {method.accountInfo.accountNumber}</p>
                      <p><span className="font-medium">Name:</span> {method.accountInfo.accountName}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm sm:text-base text-gray-600">
                  Scan the QR code with your banking app or use the account details above for manual transfer.
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default GiftRegistry 