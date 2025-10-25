import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { images } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Calendar = () => {
  const photosRef = useRef(null)
  const backPhotoRef = useRef(null)
  const frontPhotoRef = useRef(null)
  const rightPhotoRef = useRef(null)

  // Parse wedding date from config
  const weddingDate = new Date(themeConfig.calendar.weddingDate)
  const weddingYear = weddingDate.getFullYear()
  const weddingMonth = weddingDate.getMonth()
  const weddingDay = weddingDate.getDate()
  
  // Always show wedding month
  const displayYear = weddingYear
  const displayMonth = weddingMonth
  
  // Get month name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  // Get day names
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
  // Get first day of month and number of days for wedding month
  const firstDay = new Date(displayYear, displayMonth, 1)
  const lastDay = new Date(displayYear, displayMonth + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = (firstDay.getDay() + 6) % 7 // Convert Sunday=0 to Monday=0
  
  // Generate calendar days
  const calendarDays = []
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  useEffect(() => {
    // Scroll-triggered animations for photos
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: photosRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Set initial positions
    gsap.set(backPhotoRef.current, { x: -100 })
    gsap.set(frontPhotoRef.current, { x: 100 })
    gsap.set(rightPhotoRef.current, { x: 100 })

    // Animate photos sliding in
    tl.to(backPhotoRef.current, {
      x: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(frontPhotoRef.current, {
      x: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(rightPhotoRef.current, {
      x: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <div className={`w-full max-w-md sm:max-w-xl lg:max-w-3xl xl:max-w-6xl mx-auto px-4 py-12 ${themeConfig.calendar.background}`}>
      {/* Invitation Text */}
      <div className="text-center mb-8 sm:my-12">
        <h1 className="text-3xl sm:text-5xl font-albert font-thin mb-4 text-gray-800">
          The Day
        </h1>
        <p className="text-base sm:text-xl font-albert font-thin text-gray-700 leading-relaxed max-w-sm sm:max-w-md mx-auto">
          One day this year will be special for us and we want to spend it with close ones and friends. 
          We invite you to celebrate the most important event in our lives - our wedding day!
        </p>
      </div>

      {/* XL Layout - Two Columns */}
      <div className="xl:grid xl:grid-cols-5 xl:gap-8 xl:items-start">
        {/* Calendar Column - 60% width (3/5) */}
        <div className="xl:col-span-3 xl:scale-90 xl:origin-top-left">
          <div className="p-8">
{/* Month Header */}
<div className={`text-center mb-4 ${themeConfig.calendar.headerColor}`}>
        <h3 className="text-2xl sm:text-4xl font-albert font-thin mt-2">
          {monthNames[displayMonth]} {displayYear}
        </h3>
      </div>
      
      {/* Day Names Header */}
          <div className="grid grid-cols-7 gap-1 mb-2  lg:mt-8">
            {dayNames.map((day) => (
              <div key={day} className={`text-center text-sm sm:text-lg lg:text-2xl font-medium ${themeConfig.calendar.dayNamesColor}`}>
                {day}
              </div>
            ))}
          </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const isWeddingDay = day === weddingDay
          
          return (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center text-sm sm:text-lg lg:text-2xl font-medium
                ${day ? themeConfig.calendar.textColor : 'text-transparent'}
                ${isWeddingDay ? 'relative' : ''}
              `}
            >
              {day && (
                <>
                  <span className={isWeddingDay ? 'relative z-10' : ''}>
                    {day}
                  </span>
                  {isWeddingDay && (
                    <div className={`absolute inset-0 rounded-full ${themeConfig.calendar.highlightColor} opacity-20`}></div>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>
          </div>
        </div>
        
        {/* Images Column - 40% width (2/5) */}
        <div className="xl:col-span-2 xl:mt-40">
          {/* Polaroid Photos Section */}
          <div ref={photosRef} className="relative mt-12 mb-8 lg:mb-32 xl:mt-0 xl:mb-0 h-80 sm:h-120 lg:h-144 xl:h-auto flex justify-center items-center xl:justify-center">
        {/* Back Photo - More tilted left */}
        <div ref={backPhotoRef} className="absolute -top-6 -left-8 lg:left-4 xl:left-0 w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 xl:w-48 xl:h-60 bg-white shadow-lg transform -rotate-12 xl:rotate-0 opacity-90">
          <div className="w-full h-40 sm:h-60 lg:h-72 xl:h-48 bg-cover bg-center border-l-4 border-r-4 border-t-4 border-white" style={{backgroundImage: `url(${images.couple.couple2})`}}></div>
          <div className="p-2 text-center lg:bg-white lg:mb-4 lg:rounded">
            <div className="text-sm sm:text-lg xl:text-sm text-gray-600 font-handwritten">Memories</div>
          </div>
        </div>
        
        {/* Front Photo - Slightly tilted right */}
        <div ref={frontPhotoRef} className="relative w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 xl:w-48 xl:h-60 xl:mx-0 bg-white shadow-xl transform rotate-3 xl:rotate-0 hover:scale-105 transition-transform duration-300">
          <div className="w-full h-40 sm:h-60 lg:h-72 xl:h-48 bg-cover bg-center border-l-4 border-r-4 border-t-4 border-white" style={{backgroundImage: `url(${images.couple.couple1})`}}></div>
          <div className="p-2 text-center lg:bg-white lg:mb-4 lg:rounded">
            <div className="text-sm sm:text-lg xl:text-sm text-gray-600 font-handwritten">Together</div>
          </div>
        </div>
        
        {/* Right Photo - Tilted right */}
        <div ref={rightPhotoRef} className="absolute -top-4 -right-8 lg:right-4 xl:right-0 w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 xl:w-48 xl:h-60 bg-white shadow-lg transform rotate-6 xl:rotate-0">
          <div className="w-full h-40 sm:h-60 lg:h-72 xl:h-48 bg-cover bg-center border-l-4 border-r-4 border-t-4 border-white" style={{backgroundImage: `url(${images.couple.couple3})`}}></div>
          <div className="p-2 text-center lg:bg-white lg:mb-4 lg:rounded">
            <div className="text-sm sm:text-lg xl:text-sm text-gray-600 font-handwritten">Love</div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
