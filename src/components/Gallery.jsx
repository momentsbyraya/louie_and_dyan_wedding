import React, { useEffect, useRef, useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import LazyImage from './LazyImage'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const galleryRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

  const images = [
    "/assets/images/couple-1.jpg",
    "/assets/images/couple-2.jpg", 
    "/assets/images/couple-3.jpg",
    "/assets/images/couple-4.jpg",
    "/assets/images/couple-5.jpg",
    "/assets/images/couple-6.jpg",
    "/assets/images/couple-7.jpg",
    "/assets/images/couple-8.jpg",
    "/assets/images/couple-9.jpg"
  ]

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

    // Gallery animation
    tl.fromTo(galleryRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const openModal = (index) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-20 w-full min-h-screen"
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
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          {/* Header Section */}
          <div ref={headerRef} className="flex justify-between items-start mb-12">
            <div className="text-2xl sm:text-3xl md:text-4xl font-lavishly italic text-[#333333]">
              Vintage
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-albert font-bold text-[#333333] uppercase tracking-wider">
              GALLERY WALL
            </div>
          </div>

          {/* Gallery Wall - Clustered Layout */}
          <div ref={galleryRef} className="relative min-h-[800px] sm:min-h-[1000px] md:min-h-[1200px]">
            {/* Frame 1 - Large Rectangular (Top Left) */}
            <div 
              className="absolute top-0 left-0 w-64 sm:w-80 md:w-96 cursor-pointer transform hover:scale-105 transition-transform duration-300"
              style={{ zIndex: 9 }}
              onClick={() => openModal(0)}
            >
              <div className="relative p-3 sm:p-4 md:p-5" style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 50%, #d4af37 100%)',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 4px 15px rgba(0,0,0,0.4)',
                borderRadius: '8px'
              }}>
                <div className="bg-white p-2">
                  <LazyImage 
                    src={images[0]} 
                    alt="Wedding photo 1"
                    className="w-full h-64 sm:h-80 md:h-96 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Frame 2 - Circular (Top Middle) */}
            <div 
              className="absolute top-20 sm:top-32 md:top-40 left-1/2 transform -translate-x-1/2 w-48 sm:w-56 md:w-64 cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ zIndex: 8 }}
              onClick={() => openModal(1)}
            >
              <div className="relative" style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 50%, #d4af37 100%)',
                borderRadius: '50%',
                padding: '12px',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 4px 15px rgba(0,0,0,0.4)'
              }}>
                <div className="bg-white rounded-full p-2">
                  <LazyImage 
                    src={images[1]} 
                    alt="Wedding photo 2"
                    className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Frame 3 - Oval (Middle Right, tilted) */}
            <div 
              className="absolute top-48 sm:top-64 md:top-80 right-8 sm:right-16 md:right-24 w-40 sm:w-48 md:w-56 cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ zIndex: 7, transform: 'rotate(-5deg)' }}
              onClick={() => openModal(2)}
            >
              <div className="relative" style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 50%, #d4af37 100%)',
                borderRadius: '50%',
                padding: '10px',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 4px 15px rgba(0,0,0,0.4)'
              }}>
                <div className="bg-white rounded-full p-2" style={{ aspectRatio: '3/4' }}>
                  <LazyImage 
                    src={images[2]} 
                    alt="Wedding photo 3"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Frame 4 - Large Rectangular (Middle Left) */}
            <div 
              className="absolute top-64 sm:top-80 md:top-96 left-8 sm:left-16 md:left-24 w-56 sm:w-72 md:w-80 cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ zIndex: 6 }}
              onClick={() => openModal(3)}
            >
              <div className="relative p-3 sm:p-4" style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 50%, #d4af37 100%)',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 4px 15px rgba(0,0,0,0.4)',
                borderRadius: '8px'
              }}>
                <div className="bg-white p-2">
                  <LazyImage 
                    src={images[3]} 
                    alt="Wedding photo 4"
                    className="w-full h-48 sm:h-64 md:h-80 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Frame 5 - Small Oval (Below circular) */}
            <div 
              className="absolute top-80 sm:top-96 md:top-[28rem] left-1/3 w-32 sm:w-40 md:w-48 cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ zIndex: 5 }}
              onClick={() => openModal(4)}
            >
              <div className="relative" style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 50%, #d4af37 100%)',
                borderRadius: '50%',
                padding: '8px',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.3), 0 3px 10px rgba(0,0,0,0.4)'
              }}>
                <div className="bg-white rounded-full p-1.5" style={{ aspectRatio: '3/4' }}>
                  <LazyImage 
                    src={images[4]} 
                    alt="Wedding photo 5"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Frame 6 - Small Rectangular (Below oval) */}
            <div 
              className="absolute top-96 sm:top-[28rem] md:top-[32rem] right-16 sm:right-24 md:right-32 w-36 sm:w-44 md:w-52 cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ zIndex: 4 }}
              onClick={() => openModal(5)}
            >
              <div className="relative p-2 sm:p-3" style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 50%, #d4af37 100%)',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.3), 0 3px 10px rgba(0,0,0,0.4)',
                borderRadius: '8px',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px'
              }}>
                <div className="bg-white p-1.5">
                  <LazyImage 
                    src={images[5]} 
                    alt="Wedding photo 6"
                    className="w-full h-32 sm:h-40 md:h-48 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Frame 7 - Small Oval (Bottom Middle) */}
            <div 
              className="absolute bottom-32 sm:bottom-40 md:bottom-48 left-1/2 transform -translate-x-1/2 w-36 sm:w-44 md:w-52 cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ zIndex: 3 }}
              onClick={() => openModal(6)}
            >
              <div className="relative" style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 50%, #d4af37 100%)',
                borderRadius: '50%',
                padding: '10px',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.3), 0 3px 10px rgba(0,0,0,0.4)'
              }}>
                <div className="bg-white rounded-full p-2" style={{ aspectRatio: '3/4' }}>
                  <LazyImage 
                    src={images[6]} 
                    alt="Wedding photo 7"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Frame 8 - Small Rectangular (Bottom Right) */}
            <div 
              className="absolute bottom-16 sm:bottom-24 md:bottom-32 right-8 sm:right-16 md:right-24 w-40 sm:w-48 md:w-56 cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ zIndex: 2 }}
              onClick={() => openModal(7)}
            >
              <div className="relative p-2 sm:p-3" style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 50%, #d4af37 100%)',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.3), 0 3px 10px rgba(0,0,0,0.4)',
                borderRadius: '8px',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px'
              }}>
                <div className="bg-white p-1.5">
                  <LazyImage 
                    src={images[7]} 
                    alt="Wedding photo 8"
                    className="w-full h-36 sm:h-44 md:h-52 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Frame 9 - Arched Top Rectangular (Bottom Right) */}
            <div 
              className="absolute bottom-0 right-0 sm:right-8 md:right-16 w-44 sm:w-52 md:w-60 cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ zIndex: 1 }}
              onClick={() => openModal(8)}
            >
              <div className="relative p-2 sm:p-3" style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 50%, #d4af37 100%)',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.3), 0 3px 10px rgba(0,0,0,0.4)',
                borderRadius: '8px',
                borderTopLeftRadius: '30px',
                borderTopRightRadius: '30px'
              }}>
                <div className="bg-white p-1.5">
                  <LazyImage 
                    src={images[8] || images[0]} 
                    alt="Wedding photo 9"
                    className="w-full h-40 sm:h-48 md:h-56 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="mt-8 text-sm sm:text-base font-albert font-thin text-[#333333]">
            linked below
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Black Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={`Wedding couple photo ${currentImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default Gallery 