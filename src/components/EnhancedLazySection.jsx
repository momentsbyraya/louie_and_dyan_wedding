import React from 'react'
import { useAdvancedLazyLoading } from '../hooks/useAdvancedLazyLoading'

const EnhancedLazySection = ({ 
  children, 
  className = '', 
  threshold = 0.5,
  rootMargin = '0px 0px -10% 0px',
  delay = 100,
  placeholder = null,
  animationClass = 'fade-slide-up',
  onIntersect = null,
  sectionName = 'unnamed-section',
  /** When true, fade/slide runs on inner content only so the section background stays solid (no bleed-through). */
  contentOnlyAnimation = false,
  ...props 
}) => {
  const { elementRef, isVisible, isLoaded } = useAdvancedLazyLoading({
    threshold,
    rootMargin,
    delay,
    onIntersect
  })

  const getAnimationClasses = () => {
    switch (animationClass) {
      case 'fade-slide-up':
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      case 'fade-slide-left':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
      case 'fade-slide-right':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
      case 'fade-scale':
        return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-99'
      case 'fade-rotate':
        return isVisible ? 'opacity-100 rotate-0' : 'opacity-0 rotate-0.5'
      default:
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
    }
  }

  const outerMotion = contentOnlyAnimation ? '' : getAnimationClasses()
  const innerMotion = contentOnlyAnimation ? getAnimationClasses() : ''

  return (
    <section 
      ref={elementRef} 
      className={`overflow-hidden w-full max-w-full transition-all duration-700 ease-out ${outerMotion} ${className}`.trim()}
      data-section-name={sectionName}
      style={{ 
        transform: 'translateZ(0)', // Force hardware acceleration
        willChange: contentOnlyAnimation ? 'transform' : 'transform, opacity' // Avoid opacity on wrapper when bg must stay solid
      }}
      {...props}
    >
      {isVisible ? (
        <div
          className={`transition-all ${contentOnlyAnimation ? 'duration-700 ease-out' : 'duration-500'} ${innerMotion} ${isLoaded ? 'opacity-100' : 'opacity-0'}`.trim()}
        >
          {children}
        </div>
      ) : (
        placeholder || (
          <div className="min-h-[200px] flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
            <div className="text-center">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  )
}

export default EnhancedLazySection 