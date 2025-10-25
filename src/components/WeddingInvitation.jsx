import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { getTimeUntilWedding } from '../utils/countdown'
import Hero from './Hero'
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
import CTASection from './CTASection'
import EnhancedLazySection from './EnhancedLazySection'
import { images } from '../data'

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
        <section className='h-full'><Hero /></section>
        
        {/* Paragraph Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="paragraph">
          <Paragraph />
        </EnhancedLazySection>
        
        {/* Calendar Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="calendar">
          <Calendar />
        </EnhancedLazySection>

        {/* Map & Directions Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="map-directions">
          <MapDirections />
        </EnhancedLazySection>

         {/* Invitation Section - Full Width */}
         <EnhancedLazySection animationClass="fade-scale" sectionName="invitation">
          <Schedule />
        </EnhancedLazySection>

        {/* Dress Code Section */}
        <EnhancedLazySection animationClass="fade-slide-right" sectionName="dress-code">
          <DressCode />
        </EnhancedLazySection>

        {/* Gift Registry Section */}
        <EnhancedLazySection animationClass="fade-slide-right" sectionName="gift-registry">
          <GiftRegistry />
        </EnhancedLazySection>

        {/* Love Story Section */}
        <EnhancedLazySection animationClass="fade-slide-left" sectionName="love-story">
          <LoveStory />
        </EnhancedLazySection>

        {/* CTA Section - Full Width */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="cta">
          <CTASection />
        </EnhancedLazySection>   
        
        {/* Wedding Details */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="counter">
          <Counter countdown={countdown} />
        </EnhancedLazySection>

        
        {/* Couple Image Section */}
        {/* <EnhancedLazySection animationClass="fade-scale" sectionName="couple-image">
          <PhotoSection 
            imagePath={images.couple.couple3}
            title=""
            subtitle=""
          />
        </EnhancedLazySection> */}

        {/* Gallery Section */}
        {/* <EnhancedLazySection animationClass="fade-scale" sectionName="gallery">
          <Gallery />
        </EnhancedLazySection> */}
        
        {/* FAQ Section */}
        {/* <EnhancedLazySection animationClass="fade-slide-right" sectionName="faq">
          <FAQ />
        </EnhancedLazySection> */}
        
        
      </main>
    </div>
  )
}

export default WeddingInvitation 