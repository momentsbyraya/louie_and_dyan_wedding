import React, { useEffect, useRef, useState } from 'react'
import { SkipBack, SkipForward } from 'lucide-react'
import { audio } from '../data'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)
  const progressBarRef = useRef(null)


  useEffect(() => {
    const startTime = typeof audio.startTime === 'number' ? audio.startTime : 0
    const el = new Audio(audio.background)
    el.loop = audio.loop !== false
    el.volume = typeof audio.volume === 'number' ? audio.volume : 0.5
    el.currentTime = startTime

    const onLoadedMetadata = () => setDuration(el.duration)
    const onTimeUpdate = () => setCurrentTime(el.currentTime)
    const onEnded = () => {
      if (el.loop) {
        el.currentTime = startTime
        el.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
        return
      }
      setIsPlaying(false)
    }

    el.addEventListener('loadedmetadata', onLoadedMetadata)
    el.addEventListener('timeupdate', onTimeUpdate)
    el.addEventListener('ended', onEnded)

    audioRef.current = el

    return () => {
      el.removeEventListener('loadedmetadata', onLoadedMetadata)
      el.removeEventListener('timeupdate', onTimeUpdate)
      el.removeEventListener('ended', onEnded)
      el.pause()
      audioRef.current = null
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      // Ensure audio starts from the beginning if at the end
      if (audioRef.current.currentTime >= audioRef.current.duration - 0.1) {
        audioRef.current.currentTime = 0
      }
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const skipForward = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration)
  }

  const skipBackward = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0)
  }

  const handleProgressClick = (e) => {
    if (!audioRef.current || !progressBarRef.current) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    // Calculate the actual audio time
    const actualTime = percentage * duration
    audioRef.current.currentTime = Math.max(0, Math.min(actualTime, duration))
  }

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Display time from 00:00
  const displayCurrentTime = currentTime
  const displayDuration = duration

  return (
    <>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.9)) 
                    drop-shadow(0 0 16px rgba(255, 215, 0, 0.7)) 
                    drop-shadow(0 0 24px rgba(255, 215, 0, 0.5))
                    drop-shadow(0 0 32px rgba(255, 215, 0, 0.3));
          }
          50% {
            transform: scale(1.08);
            filter: drop-shadow(0 0 16px rgba(255, 215, 0, 1)) 
                    drop-shadow(0 0 28px rgba(255, 215, 0, 0.9)) 
                    drop-shadow(0 0 40px rgba(255, 215, 0, 0.7))
                    drop-shadow(0 0 52px rgba(255, 215, 0, 0.5));
          }
        }
        .play-icon-pulse {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .music-icon-glow {
          filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.7)) drop-shadow(0 0 18px rgba(255, 215, 0, 0.4));
        }
      `}</style>
      <section className="relative py-12 w-full overflow-hidden">
        {/* Soft white gradient overlays for transitions */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/60 to-transparent pointer-events-none z-10" />
        
        <div className="relative z-20 flex items-center justify-center py-8">
          <div className="max-w-md w-full mx-auto px-8 sm:px-12">
            {/* Play Music Text */}
            <div className="text-[#27323B] text-base sm:text-lg md:text-xl mb-4 font-albert text-center">
              {isPlaying ? 'Pause Music' : 'Play Music'}
            </div>

            {/* Progress Bar */}
            <div className="w-full mb-4 px-2">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Current Time */}
                <span className="text-[#27323B] text-xs sm:text-sm font-albert min-w-[40px] text-right">
                  {formatTime(displayCurrentTime)}
                </span>
                
                {/* Progress Bar */}
                <div 
                  ref={progressBarRef}
                  onClick={handleProgressClick}
                  className="flex-1 h-0.5 bg-[#27323B]/20 rounded-full cursor-pointer relative group"
                >
                  <div 
                    className="h-full bg-[#27323B]/60 rounded-full transition-all duration-100"
                    style={{ width: `${displayDuration > 0 ? (displayCurrentTime / displayDuration) * 100 : 0}%` }}
                  />
                  {/* Progress Dot */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#27323B] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ left: `calc(${displayDuration > 0 ? (displayCurrentTime / displayDuration) * 100 : 0}% - 5px)` }}
                  />
                </div>
                
                {/* Duration */}
                <span className="text-[#27323B] text-xs sm:text-sm font-albert min-w-[40px]">
                  {formatTime(displayDuration)}
                </span>
              </div>
            </div>
            
            {/* Music Player Controls */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 w-full">
              {/* Skip Backward Button */}
              <button
                onClick={skipBackward}
                className="hover:opacity-80 transition-opacity duration-300 cursor-pointer flex items-center justify-center text-[#27323B]"
                type="button"
                aria-label="Skip backward 10 seconds"
              >
                <SkipBack className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </button>

              {/* Play/Pause Button */}
              <button
                onClick={toggleMusic}
                className="hover:opacity-80 transition-opacity duration-300 cursor-pointer flex items-center justify-center"
                type="button"
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
              >
                {isPlaying ? (
                  <img 
                    src="/assets/images/graphics/pause-icon.png" 
                    alt="Pause music" 
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 music-icon-glow"
                  />
                ) : (
                  <img 
                    src="/assets/images/graphics/play-icon.png" 
                    alt="Play music" 
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 play-icon-pulse`}
                  />
                )}
              </button>

              {/* Skip Forward Button */}
              <button
                onClick={skipForward}
                className="hover:opacity-80 transition-opacity duration-300 cursor-pointer flex items-center justify-center text-[#27323B]"
                type="button"
                aria-label="Skip forward 10 seconds"
              >
                <SkipForward className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MusicPlayer

