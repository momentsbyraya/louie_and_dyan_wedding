import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { getTimeUntilWedding } from '../utils/countdown'
import HeroStorybook from './HeroStorybook'
import MusicPlayer from './MusicPlayer'
import Paragraph from './Paragraph'
import Counter from './Counter'
import Gallery from './Gallery'
import Schedule from './Schedule'
import LoveStory from './LoveStory'
import DressCode from './DressCode'
import MapDirections from './Venue'
import RSVP from './RSVP'
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
        
        {/* Love Story Section */}
        <EnhancedLazySection animationClass="fade-slide-left" sectionName="love-story">
          <LoveStory />
        </EnhancedLazySection>
        
        {/* Wedding Details - Save the Date */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="counter">
          <Counter countdown={countdown} />
        </EnhancedLazySection>
        
        {/* Gallery Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="gallery">
          <Gallery />
        </EnhancedLazySection>
        
        {/* Venue Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="venue">
          <MapDirections />
        </EnhancedLazySection>
        
        {/* Schedule Section */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="schedule">
          <Schedule />
        </EnhancedLazySection>
        
        {/* Dress Code Section */}
        <EnhancedLazySection animationClass="fade-slide-right" sectionName="dress-code">
          <DressCode />
        </EnhancedLazySection>
        
        {/* RSVP Section - Full Width */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="rsvp">
          <RSVP />
        </EnhancedLazySection>

        {/* Paragraph Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="paragraph">
          <Paragraph />
        </EnhancedLazySection>
        
        {/* Footer */}
        <Footer />
        
      </main>
    </div>
  )
}

export default WeddingInvitation 