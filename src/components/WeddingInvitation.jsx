import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { getTimeUntilWedding } from '../utils/countdown'
import HeroStorybook from './HeroStorybook'
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
        <section className='h-full'><HeroStorybook /></section>
        
        {/* Music Player Section - Hidden for now */}
        {/* <MusicPlayer /> */}
        
        {/* Venue Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="venue">
          <MapDirections />
        </EnhancedLazySection>
        
        {/* Schedule Section */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="schedule">
          <Schedule />
        </EnhancedLazySection>
        
        {/* Entourage Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="entourage">
          <Entourage />
        </EnhancedLazySection>
        
        {/* RSVP Section - Full Width */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="rsvp">
          <RSVP />
        </EnhancedLazySection>
        
        {/* Dress Code Section */}
        <EnhancedLazySection animationClass="fade-slide-right" sectionName="dress-code">
          <DressCode />
        </EnhancedLazySection>
        
        {/* Love Story and Gallery Container */}
        <div className="relative w-full">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/assets/images/graphics/calligraphy-bg.png)',
              opacity: 0.15
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

          {/* SVG Wave - Top */}
          <div className="absolute top-0 left-0 right-0 z-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
              <path fill="#ffffff" fillOpacity="1" d="M0,288L120,250.7C240,213,480,139,720,144C960,149,1200,235,1320,277.3L1440,320L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
            </svg>
          </div>

          {/* Love Story Section */}
          <EnhancedLazySection animationClass="fade-slide-left" sectionName="love-story">
            <LoveStory />
          </EnhancedLazySection>
          
          {/* Gallery Section */}
          <EnhancedLazySection animationClass="fade-slide-up" sectionName="gallery">
            <Gallery />
          </EnhancedLazySection>

          {/* SVG Wave - Bottom (Flipped Vertically) */}
          <div className="absolute bottom-0 left-0 right-0 z-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto scale-y-[-1]">
              <path fill="#ffffff" fillOpacity="1" d="M0,288L120,250.7C240,213,480,139,720,144C960,149,1200,235,1320,277.3L1440,320L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
            </svg>
          </div>

          {/* Gold Banner - Bottom (Flipped Vertically) */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center z-10">
            <img 
              src="/assets/images/graphics/gold-banner-2.png" 
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
    </div>
  )
}

export default WeddingInvitation 