import React from 'react'
import GradientLayer from './GradientLayer'
import { sectionTitleStyle } from '../config/themeConfig'

const ImageBanner = ({
  src,
  alt = 'Banner image',
  title = 'Love Story',
  subtitle = 'Our',
  bottomWhiteBlur = false,
}) => {
  return (
    <div className="relative z-20 w-screen" style={{ width: '100vw' }}>
      <div className="relative z-0 w-full h-[250px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover md:object-top lg:object-[center_20%]"
        />
        <GradientLayer height="h-32" opacity={0.7} gradientId="storyBannerGrad1" />
        <GradientLayer height="h-24" opacity={0.5} gradientId="storyBannerGrad2" />
        <GradientLayer height="h-12" opacity={0.4} gradientId="storyBannerGrad3" />
        <GradientLayer height="h-8" opacity={0.3} gradientId="storyBannerGrad4" />
        <GradientLayer height="h-6" opacity={0.25} gradientId="storyBannerGrad5" />
        <GradientLayer height="h-4" opacity={0.2} gradientId="storyBannerGrad6" />

        <svg
          className="absolute bottom-0 left-0 w-full h-[12px] pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 1200 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="storySolidTransition" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.95)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#storySolidTransition)" />
        </svg>
      </div>

      {bottomWhiteBlur && (
        <img
          src="/assets/images/graphics/white-blur.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-auto max-w-none -translate-x-1/2 object-cover object-bottom select-none"
          style={{ width: '100vw', zIndex: 10 }}
        />
      )}

      <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center items-center pb-0.5 z-20">
        <div className="w-full text-center px-2">
          {subtitle && (
            <p
              className="text-4xl sm:text-5xl md:text-6xl mb-1"
              style={sectionTitleStyle}
            >
              {subtitle}
            </p>
          )}
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-3 sm:mb-4"
            style={sectionTitleStyle}
          >
            {title}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default ImageBanner
