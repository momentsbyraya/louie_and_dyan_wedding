import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { getTimeUntilWedding } from '../utils/countdown'
import Hero from './Hero'
import MusicPlayer from './MusicPlayer'
import Paragraph from './Paragraph'
import Counter from './Counter'
import StoryAndGallery from './StoryAndGallery'
import Schedule from './Schedule'
import DressCode from './DressCode'
import MapDirections from './Venue'
import RSVP from './RSVP'
import FAQ from './FAQ'
import Footer from './Footer'
import EnhancedLazySection from './EnhancedLazySection'
import AutoplayVideo from './AutoplayVideo'

const WeddingInvitation = () => {
  const [countdown, setCountdown] = useState(getTimeUntilWedding())
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    // Initial page load animation
    gsap.fromTo(".main-container", 
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    )
    
    const timer = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000) // Update every second

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <main className="main-container h-full section-container">
        {/* Hero Section - Always visible */}
        <section className='h-full'><Hero /></section>

        {/* Wedding Details - Save the Date (right after Hero) */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="counter">
          <Counter countdown={countdown} />
        </EnhancedLazySection>
        
        {/* Music Player Section - Hidden for now */}
        {/* <MusicPlayer /> */}
        
        {/* Venue Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="venue">
          <MapDirections />
        </EnhancedLazySection>

        {/* Prenup photo — Between Location and Schedule */}
        <section className="relative w-full">
          <div className="w-full flex justify-center items-center">
            <img
              src="/assets/images/prenup/IMG_7602.jpg"
              alt="Jade and Vannie"
              className="w-screen h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
              style={{ width: '100vw' }}
              loading="lazy"
              onClick={() => setSelectedImage('/assets/images/prenup/IMG_7602.jpg')}
            />
          </div>
        </section>

        {/* Schedule Section */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="schedule">
          <Schedule />
        </EnhancedLazySection>

        {/* Prenup photo — Between Schedule and RSVP */}
        <section className="relative w-full">
          <div className="w-full flex justify-center items-center">
            <img
              src="/assets/images/prenup/IMG_8902.jpg"
              alt="Jade and Vannie"
              className="w-screen h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
              style={{ width: '100vw' }}
              loading="lazy"
              onClick={() => setSelectedImage('/assets/images/prenup/IMG_8902.jpg')}
            />
          </div>
        </section>

        {/* RSVP Section - Full Width */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="rsvp">
          <RSVP />
        </EnhancedLazySection>

        {/* Dress Code Section */}
        <EnhancedLazySection animationClass="fade-slide-right" sectionName="dress-code">
          <DressCode />
        </EnhancedLazySection>
        
        {/* Image Section - Between DressCode and Gallery */}
        <section className="relative w-full">
          <div className="w-full flex justify-center items-center">
            <img 
              src="/assets/images/prenup/IMG_8520.jpg" 
              alt="Wedding moment" 
              className="w-screen h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
              style={{ width: '100vw' }}
              onClick={() => setSelectedImage('/assets/images/prenup/IMG_8520.jpg')}
            />
          </div>
        </section>
        
        {/* Love Story and Gallery Container */}
        <div className="relative w-full md:py-24 lg:py-32 story-gallery-container-lg">
          <style>{`
            @media (min-width: 992px) {
              .story-gallery-container-lg {
                padding-top: 12rem !important;
                padding-bottom: 12rem !important;
              }
            }
            @media (min-width: 1280px) {
              .story-gallery-container-lg {
                padding-top: 28rem !important;
                padding-bottom: 28rem !important;
              }
            }
          `}</style>
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/assets/images/graphics/bg-1.png)',
              opacity: 0.4,
              zIndex: 0
            }}
          />

          <EnhancedLazySection animationClass="fade-slide-up" sectionName="story-gallery">
            <StoryAndGallery />
          </EnhancedLazySection>

          {/* Leaf Banner - Bottom (Flipped Vertically) */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center z-10">
            <img 
              src="/assets/images/graphics/leaf-banner.png" 
              alt="Decorative graphic"
              className="w-full h-auto scale-y-[-1]"
            />
          </div>
        </div>

        {/* FAQ Section — wrapper + placeholder use nude brown (not lazy gray shell) */}
        <EnhancedLazySection
          animationClass="fade-slide-up"
          sectionName="faq"
          className="bg-nude-brown"
          contentOnlyAnimation
          placeholder={<div className="min-h-[200px] w-full bg-nude-brown" aria-hidden />}
        >
          <FAQ />
        </EnhancedLazySection>

        {/* Video Section - After FAQ */}
        <section className="relative w-screen m-0 p-0" style={{ width: '100vw' }}>
          <AutoplayVideo
            src="/assets/video/last.mov"
            threshold={0.4}
            aspectRatio="16 / 9"
          />
        </section>

        {/* Footer */}
        <Footer />
        
      </main>

      {/* Image Preview Modal */}
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
          onClick={() => setSelectedImage(null)}
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
              setSelectedImage(null)
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
        </div>,
        document.body
      )}
    </div>
  )
}

export default WeddingInvitation 