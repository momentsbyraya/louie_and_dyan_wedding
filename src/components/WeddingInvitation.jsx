import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { getTimeUntilWedding } from '../utils/countdown'
import Hero from './Hero'
import MusicPlayer from './MusicPlayer'
import Paragraph from './Paragraph'
import Counter from './Counter'
import Gallery from './Gallery'
import Schedule from './Schedule'
import Entourage from './Entourage'
import LoveStory from './LoveStory'
import DressCode from './DressCode'
import MapDirections from './Venue'
import RSVP from './RSVP'
import FAQ from './FAQ'
import Footer from './Footer'
import EnhancedLazySection from './EnhancedLazySection'

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
        
        {/* Music Player Section - Hidden for now */}
        {/* <MusicPlayer /> */}
        
        {/* Venue Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="venue">
          <MapDirections />
        </EnhancedLazySection>

          {/* Image Section - Between Schedule and Entourage */}
          <section className="relative w-full">
            <div className="w-full flex justify-center items-center">
              <img 
                src="/assets/images/prenup/new/FOR EDITS-8.jpg" 
                alt="Wedding moment" 
                className="w-screen h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
                style={{ width: '100vw' }}
                onClick={() => setSelectedImage('/assets/images/prenup/new/FOR EDITS-8.jpg')}
              />
            </div>
          </section>
        
        
        {/* Schedule Section */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="schedule">
          <Schedule />
        </EnhancedLazySection>
        
        {/* Image Section - After Schedule and Before Entourage */}
        <section className="relative w-full">
          <div className="w-full flex justify-center items-center">
            <img 
              src="/assets/images/prenup/new/FOR EDITS-11.jpg" 
              alt="Wedding moment" 
              className="w-screen h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
              style={{ width: '100vw' }}
              onClick={() => setSelectedImage('/assets/images/prenup/new/FOR EDITS-11.jpg')}
            />
          </div>
        </section>
      
        {/* Entourage Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="entourage">
          <Entourage />
        </EnhancedLazySection>
        
        {/* Image Section - Between Entourage and RSVP */}
        <section className="relative w-full">
          <div className="w-full flex justify-center items-center">
            <img 
              src="/assets/images/prenup/new/FOR EDITS-26.jpg" 
              alt="Wedding moment" 
              className="w-screen h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
              style={{ width: '100vw' }}
              onClick={() => setSelectedImage('/assets/images/prenup/new/FOR EDITS-26.jpg')}
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
              src="/assets/images/prenup/new/FOR EDITS-25.jpg" 
              alt="Wedding moment" 
              className="w-screen h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
              style={{ width: '100vw' }}
              onClick={() => setSelectedImage('/assets/images/prenup/new/FOR EDITS-25.jpg')}
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
            @keyframes windBlow {
              0% {
                transform: translateX(-150px) translateY(0) rotate(0deg);
                opacity: 0;
              }
              2% {
                opacity: 0.8;
              }
              98% {
                opacity: 0.8;
              }
              100% {
                transform: translateX(calc(100vw + 150px)) translateY(-300px) rotate(360deg);
                opacity: 0;
              }
            }
            .wind-leaf {
              position: absolute;
              left: 0;
              pointer-events: none;
              z-index: 5;
              opacity: 0;
              animation: windBlow 15s linear infinite;
            }
            .wind-leaf:nth-child(1) {
              top: 15%;
              width: 35px;
              height: 35px;
              animation-delay: 0s;
              animation-duration: 16s;
            }
            .wind-leaf:nth-child(2) {
              top: 30%;
              width: 50px;
              height: 50px;
              animation-delay: 3s;
              animation-duration: 18s;
            }
            .wind-leaf:nth-child(3) {
              top: 50%;
              width: 40px;
              height: 40px;
              animation-delay: 6s;
              animation-duration: 20s;
            }
            .wind-leaf:nth-child(4) {
              top: 65%;
              width: 45px;
              height: 45px;
              animation-delay: 9s;
              animation-duration: 17s;
            }
            .wind-leaf:nth-child(5) {
              top: 80%;
              width: 30px;
              height: 30px;
              animation-delay: 12s;
              animation-duration: 19s;
            }
            .wind-leaf:nth-child(6) {
              top: 25%;
              width: 38px;
              height: 38px;
              animation-delay: 15s;
              animation-duration: 21s;
            }
            .wind-leaf:nth-child(7) {
              top: 55%;
              width: 42px;
              height: 42px;
              animation-delay: 18s;
              animation-duration: 16s;
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

          {/* Wind Blown Leaves */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img src="/assets/images/graphics/leaf.png" alt="Leaf" className="wind-leaf" />
            <img src="/assets/images/graphics/leaf.png" alt="Leaf" className="wind-leaf" />
            <img src="/assets/images/graphics/leaf.png" alt="Leaf" className="wind-leaf" />
            <img src="/assets/images/graphics/leaf.png" alt="Leaf" className="wind-leaf" />
            <img src="/assets/images/graphics/leaf.png" alt="Leaf" className="wind-leaf" />
            <img src="/assets/images/graphics/leaf.png" alt="Leaf" className="wind-leaf" />
            <img src="/assets/images/graphics/leaf.png" alt="Leaf" className="wind-leaf" />
          </div>

          {/* Leaf Banner - Top */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center z-10">
            <img 
              src="/assets/images/graphics/leaf-banner.png" 
              alt="Decorative graphic"
              className="w-full h-auto"
            />
          </div>

          {/* Love Story Section */}
          <EnhancedLazySection animationClass="fade-slide-left" sectionName="love-story">
            <LoveStory />
          </EnhancedLazySection>
          
          {/* Gallery Section */}
          <EnhancedLazySection animationClass="fade-slide-up" sectionName="gallery">
            <Gallery />
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

        {/* FAQ Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="faq">
          <FAQ />
        </EnhancedLazySection>
        
        {/* Wedding Details - Save the Date */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="counter">
          <Counter countdown={countdown} />
        </EnhancedLazySection>
        
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