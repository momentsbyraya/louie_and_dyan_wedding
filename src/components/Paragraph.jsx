import React from 'react'
import { themeConfig } from '../config/themeConfig'
import { weddingConfig } from '../config/weddingConfig'

const Paragraph = () => {
  // Add Leckerli One font
  React.useEffect(() => {
    // Check if font is already loaded
    if (document.querySelector('link[href*="Leckerli+One"]')) {
      return
    }
    
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap'
    link.rel = 'stylesheet'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
    
    return () => {
      // Don't remove the link as it might be used by other components
    }
  }, [])
  return (
    <section className={`relative py-20 w-full overflow-hidden ${themeConfig.paragraph.background}`}>
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900/70 mb-6 font-leckerli font-light">
              Dear friends and relatives!
            </h2>
            <p className="text-lg sm:text-xl font-albert font-thin text-gray-700 max-w-3xl mx-auto leading-relaxed">
              An important event will soon take place in our lives - our wedding! We invite you to share with us this special day!
            </p>
            <p className="text-lg sm:text-xl font-albert font-thin text-gray-700 max-w-3xl mx-auto leading-relaxed mt-4">
              
            </p>
            <p className="text-xl sm:text-2xl font-albert font-thin text-gray-800 mt-8">
             - {weddingConfig.couple.together}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Paragraph
