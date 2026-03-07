import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'

const EntourageModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      
      // Modal entrance animation
      gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
      gsap.set(contentRef.current, { scale: 0.8, y: 50 })
      
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" })
      gsap.to(contentRef.current, { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.4, 
        ease: "back.out(1.7)" 
      })
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = 'unset'
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    // Modal exit animation
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" })
    gsap.to(contentRef.current, { 
      opacity: 0, 
      scale: 0.8, 
      y: 50, 
      duration: 0.3, 
      ease: "power2.out" 
    }).then(() => {
      onClose()
    })
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose()
    }
  }

  const handleViewEntourage = () => {
    handleClose()
    // Scroll to entourage section after a short delay
    setTimeout(() => {
      const entourageSection = document.getElementById('entourage')
      if (entourageSection) {
        entourageSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)
  }

  if (!isOpen) return null

  return createPortal(
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />
      
      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300/50">
          <h2 className="text-2xl font-caribbean text-gray-900">Entourage</h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200/50 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 text-center">
          <p className="text-base sm:text-lg font-albert font-thin text-[#333333] mb-6 leading-relaxed">
            View our complete entourage list on the main page.
          </p>
          <button
            onClick={handleViewEntourage}
            className="px-6 py-3 bg-[#333333] text-white hover:opacity-80 transition-opacity duration-300 cursor-pointer rounded-lg"
          >
            <span className="text-sm sm:text-base font-albert font-thin">
              View Entourage Section
            </span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default EntourageModal
