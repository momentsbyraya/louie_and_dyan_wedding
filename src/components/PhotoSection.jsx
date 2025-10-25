import React from 'react'

const PhotoSection = ({ 
  imagePath, 
  title = "Together Forever", 
  subtitle = "Every love story is beautiful, but ours is my favorite",
  textPosition = "bottom" // "center" or "bottom"
}) => {
  return (
    <section className="relative w-full overflow-hidden h-96 sm:h-[500px] lg:h-[600px]">
      {/* Background Image - Load immediately */}
      <img
        src={imagePath}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager" // Load immediately, not lazy
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className={`relative z-10 flex justify-center h-full ${
        textPosition === "bottom" ? "items-end pb-8" : "items-center"
      }`}>
        <div className="text-center text-white/60">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-lavishly mb-4">
            {title}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-albert font-thin opacity-90">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}

export default PhotoSection 