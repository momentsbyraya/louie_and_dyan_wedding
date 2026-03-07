import React, { useEffect, useRef, useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const frameScrollRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Get all prenup images (BBC and ISE only, excluding opening-*, frame-*, favicon)
  const allPrenupImages = useMemo(() => {
    const images = [
      // BBC images
      '/assets/images/prenup/BBC09539.JPG',
      '/assets/images/prenup/BBC09567.JPG',
      '/assets/images/prenup/BBC09569.JPG',
      // ISE images
      '/assets/images/prenup/ISE00089.JPG',
      '/assets/images/prenup/ISE00132.JPG',
      '/assets/images/prenup/ISE00174.JPG',
      '/assets/images/prenup/ISE00201.JPG',
      '/assets/images/prenup/ISE00208.JPG',
      '/assets/images/prenup/ISE00263.JPG',
      '/assets/images/prenup/ISE00287.JPG',
      '/assets/images/prenup/ISE09715.JPG',
      '/assets/images/prenup/ISE09788.JPG',
      '/assets/images/prenup/ISE09955.JPG'
    ]
    return images
  }, [])

  // Gallery images from prenup folder (excluding BBC09539, BBC09567, BBC09569, ISE00263)
  const galleryImages = [
    '/assets/images/prenup/ISE00089.JPG',
    '/assets/images/prenup/ISE00132.JPG',
    '/assets/images/prenup/ISE00174.JPG',
    '/assets/images/prenup/ISE00201.JPG',
    '/assets/images/prenup/ISE00208.JPG',
    '/assets/images/prenup/ISE00287.JPG',
    '/assets/images/prenup/ISE09715.JPG',
    '/assets/images/prenup/ISE09788.JPG',
    '/assets/images/prenup/ISE09955.JPG'
  ]

  // Frame to image mapping
  const frameImageMap = {
    'frame-1.png': '/assets/images/prenup/BBC09539.JPG',
    'frame-2.png': '/assets/images/prenup/BBC09567.JPG',
    'frame-3.png': '/assets/images/prenup/BBC09569.JPG',
    'frame-4.png': '/assets/images/prenup/ISE00263.JPG'
  }

  const handleImageClick = (imageSrc) => {
    const index = allPrenupImages.indexOf(imageSrc)
    setCurrentImageIndex(index >= 0 ? index : 0)
    setSelectedImage(imageSrc)
  }

  const handleFrameClick = (frameName) => {
    const imageSrc = frameImageMap[frameName]
    if (imageSrc) {
      const index = allPrenupImages.indexOf(imageSrc)
      setCurrentImageIndex(index >= 0 ? index : 0)
      setSelectedImage(imageSrc)
    }
  }

  const closeModal = () => {
    setSelectedImage(null)
    setCurrentImageIndex(0)
  }

  const navigateImage = (direction) => {
    if (direction === 'prev') {
      const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : allPrenupImages.length - 1
      setCurrentImageIndex(newIndex)
      setSelectedImage(allPrenupImages[newIndex])
    } else {
      const newIndex = currentImageIndex < allPrenupImages.length - 1 ? currentImageIndex + 1 : 0
      setCurrentImageIndex(newIndex)
      setSelectedImage(allPrenupImages[newIndex])
    }
  }

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    if (selectedImage) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  useEffect(() => {
    // Optimize ScrollTrigger for better performance
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true
    })

    // Header animation
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
          }
        }
      )
    }

    // Frame images animation - individual scroll triggers for better performance
    if (frameScrollRef.current) {
      const frameImages = frameScrollRef.current.querySelectorAll('img')
      frameImages.forEach((img, index) => {
        gsap.fromTo(img,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true
            }
          }
        )
      })
    }

    // Gallery images animation - individual scroll triggers for each image
    if (contentRef.current) {
      const galleryItems = contentRef.current.querySelectorAll('div[class*="col-span"]')
      galleryItems.forEach((item, index) => {
        // Use will-change for better performance
        item.style.willChange = 'transform, opacity'
        
        gsap.fromTo(item,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
              // Optimize for performance
              markers: false,
              refreshPriority: -1
            },
            onComplete: () => {
              // Remove will-change after animation for better performance
              item.style.willChange = 'auto'
            }
          }
        )
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === sectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  // Scroll to center frame image on mount
  useEffect(() => {
    if (frameScrollRef.current) {
      const scrollContainer = frameScrollRef.current
      const scrollWidth = scrollContainer.scrollWidth
      const clientWidth = scrollContainer.clientWidth
      // Scroll to center (frame-2.png is the middle one)
      scrollContainer.scrollLeft = (scrollWidth - clientWidth) / 2
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative pb-20 w-full overflow-hidden"
      style={{ backgroundColor: 'transparent', zIndex: 20, position: 'relative' }}
    >
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center">
        <div className="max-w-md sm:max-w-xl lg:max-w-4xl xl:max-w-5xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          {/* Header Section */}
          <div ref={headerRef} className="text-center">
            {/* Gold Flower */}
            <div className="flex justify-center mb-4">
              <img 
                src="/assets/images/graphics/gold flower.png" 
                alt="Gold flower decoration" 
                className="w-16 sm:w-20 md:w-24 h-auto"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-caribbean pt-4 sm:pt-6 md:pt-8 mb-8 sm:mb-10 md:mb-12" style={{ background: 'linear-gradient(135deg, #edb030 0%, #d99a1a 20%, #926018 50%, #775016 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" style={{ lineHeight: '0.8' }}>O</span>
              <span className="inline-block">ur Moments</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Frame Images - Horizontal Scrollable - Full Width */}
      <div className="mb-8 sm:mb-10 md:mb-12 w-full">
        <div ref={frameScrollRef} className="overflow-x-auto w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-4 sm:gap-6 md:gap-8 px-8 sm:px-12 lg:px-16" style={{ width: 'max-content' }}>
            {['frame-1.png', 'frame-4.png', 'frame-2.png', 'frame-3.png'].map((frame, index) => (
              <div key={index} className="flex-shrink-0 cursor-pointer" onClick={() => handleFrameClick(frame)}>
                <img 
                  src={`/assets/images/prenup/${frame}`}
                  alt={`Frame ${index + 1}`}
                  className="h-48 sm:h-56 md:h-64 lg:h-72 w-auto object-contain hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center">
        <div className="max-w-md sm:max-w-xl lg:max-w-4xl xl:max-w-5xl w-full mx-auto">
          <style>{`
            .overflow-x-auto::-webkit-scrollbar {
              display: none;
            }
            .overflow-x-auto {
              -ms-overflow-style: none;
            }
          `}</style>

          {/* Gallery Images - Bento Grid */}
          <div 
            ref={contentRef} 
            className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6"
            style={{
              contain: 'layout style paint',
              transform: 'translateZ(0)'
            }}
          >
            {galleryImages.map((image, index) => {
              // Alternating pattern: 2 columns (50-50), 1 column (full), 2 columns (50-50), 1 column (full), etc.
              // For 2-column rows: both images get col-span-1 (50-50 split)
              // For 1-column rows: image gets col-span-2 (full width)
              
              // Pattern: 0,1 (2 cols 50-50), 2 (1 col full), 3,4 (2 cols 50-50), 5 (1 col full), 6,7 (2 cols 50-50), 8 (1 col full), 9 (1 col full)
              let colSpan = 'col-span-1'
              
              // Determine if this image should be full width (1 column row)
              // Images at indices 2, 5, 8, 9 should be full width
              if (index === 2 || index === 5 || index === 8 || index === 9) {
                colSpan = 'col-span-2'
              }
              
              return (
                <div 
                  key={index} 
                  className={`relative ${colSpan} overflow-hidden min-h-[200px] sm:min-h-[250px] md:min-h-[300px] cursor-pointer`}
                  onClick={() => handleImageClick(image)}
                  style={{
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    perspective: '1000px'
                  }}
                >
                  <img 
                    src={image} 
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    loading="lazy"
                    style={{
                      transform: 'translateZ(0)',
                      willChange: 'opacity'
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Full Screen Image Modal - Rendered via Portal */}
      {selectedImage && createPortal(
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
          onClick={closeModal}
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
              closeModal()
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
            src={selectedImage}
            alt="Full size preview"
            className="max-w-full max-h-full object-contain z-[10001]"
            style={{
              position: 'relative',
              zIndex: 10001
            }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('prev')
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:opacity-80 transition-opacity p-2"
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10002
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('next')
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:opacity-80 transition-opacity p-2"
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10002
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>
        </div>,
        document.body
      )}
    </section>
  )
}

export default Gallery

