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

  return (
    <Helmet>
      <title>Wedding Invitation - {coupleNames}</title>
      <meta name="description" content={`Wedding Invitation - ${coupleNames}'s Wedding on ${weddingDate}`} />
      <meta property="og:title" content={`Wedding Invitation - ${coupleNames}`} />
      <meta property="og:description" content={`Join us for ${coupleNames}'s special day on ${weddingDate}`} />
      <meta name="twitter:title" content={`Wedding Invitation - ${coupleNames}`} />
      <meta name="twitter:description" content={`Beautiful digital wedding invitation for ${weddingDate}`} />
    </Helmet>
  )
}

export default DynamicTitle 