import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { getTimeUntilWedding } from '../utils/countdown'
import Hero from './Hero'
import HeroStorybook from './HeroStorybook'
import Paragraph from './Paragraph'
import Calendar from './Calendar'
import Counter from './Counter'
import PhotoSection from './PhotoSection'
import Schedule from './Schedule'
import LoveStory from './LoveStory'
import DressCode from './DressCode'
import Gallery from './Gallery'
import FAQ from './FAQ'
import MapDirections from './Venue'
import GiftRegistry from './GiftRegistry'
import RSVP from './RSVP'
import EnhancedLazySection from './EnhancedLazySection'
import { images } from '../data'
import { weddingConfig } from '../config/weddingConfig'

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
        
        {/* Paragraph Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="paragraph">
          <Paragraph />
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

        {/* Couple Photo Section */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="couple-photo">
          <PhotoSection 
            imagePath={images.couple.couple1}
            title={weddingConfig.couple.together}
            subtitle=""
            textPosition="bottom"
          />
        </EnhancedLazySection>
        {/* Gift Registry Section */}
        <EnhancedLazySection animationClass="fade-slide-right" sectionName="gift-registry">
          <GiftRegistry />
        </EnhancedLazySection>

        {/* Love Story Section */}
        <EnhancedLazySection animationClass="fade-slide-left" sectionName="love-story">
          <LoveStory />
        </EnhancedLazySection>   
        
        {/* Wedding Details */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="counter">
          <Counter countdown={countdown} />
        </EnhancedLazySection>

        {/* Gallery Section */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="gallery">
          <Gallery />
        </EnhancedLazySection>
        
        {/* FAQ Section */}
        <EnhancedLazySection animationClass="fade-slide-right" sectionName="faq">
          <FAQ />
        </EnhancedLazySection>
        
        
      </main>
    </div>
  )
}

export default WeddingInvitation 