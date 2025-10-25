import React, { useEffect } from 'react'
import { gsap } from 'gsap'

const Header = () => {
  useEffect(() => {
    // Initial entrance animation
    gsap.fromTo(".header-title", 
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out", delay: 0.3 }
    )

    gsap.fromTo(".header-subtitle", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.8 }
    )

    gsap.fromTo(".header-decorative", 
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 1.2, stagger: 0.2 }
    )

    // Floating animation for decorative elements
    gsap.to(".floating-dot", {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    })

    gsap.to(".floating-dot-2", {
      y: 10,
      duration: 2.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.5
    })
  }, [])

  return (
    <header
      id="home"
      className="text-center pt-24 pb-16"
    >
      {/* Decorative Elements */}
      <div className="flex justify-center items-center space-x-4 mb-8">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-wedding-400 header-decorative"></div>
        <div className="w-3 h-3 rounded-full bg-rose-400 floating-dot"></div>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-wedding-400 header-decorative"></div>
      </div>

      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-albert font-thin text-wedding-800 mb-6 header-title">
        Wedding Invitation
      </h1>

      <p className="text-xl sm:text-2xl md:text-3xl text-wedding-600 font-albert font-thin mb-8 header-subtitle">
        You are cordially invited to celebrate
      </p>

      {/* Decorative Elements */}
      <div className="flex justify-center items-center space-x-4">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-wedding-400 header-decorative"></div>
        <div className="w-2 h-2 rounded-full bg-gold-400 floating-dot-2"></div>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-wedding-400 header-decorative"></div>
      </div>
    </header>
  )
}

export default Header 