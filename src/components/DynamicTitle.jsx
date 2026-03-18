import React from 'react'
import { Helmet } from 'react-helmet-async'
import { couple } from '../data'

const DynamicTitle = () => {
  const coupleNames = couple.together
  const weddingDate = new Date(couple.wedding.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const socialImagePath = '/assets/images/prenup/new/FOR EDITS-23.jpg'
  const socialImageUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${socialImagePath}`
      : socialImagePath

  return (
    <Helmet>
      <title>Wedding Invitation - {coupleNames}</title>
      <meta name="description" content={`Wedding Invitation - ${coupleNames}'s Wedding on ${weddingDate}`} />
      <meta property="og:title" content={`Wedding Invitation - ${coupleNames}`} />
      <meta property="og:description" content={`Join us for ${coupleNames}'s special day on ${weddingDate}`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={socialImageUrl} />
      <meta property="og:image:alt" content={`Photo of ${coupleNames}`} />
      <meta name="twitter:title" content={`Wedding Invitation - ${coupleNames}`} />
      <meta name="twitter:description" content={`Beautiful digital wedding invitation for ${weddingDate}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={socialImageUrl} />
      <meta name="twitter:image:alt" content={`Photo of ${coupleNames}`} />
    </Helmet>
  )
}

export default DynamicTitle 