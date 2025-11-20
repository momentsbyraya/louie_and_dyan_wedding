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
      <title>{`${coupleNames}'s Wedding - ${weddingDate}`}</title>
      <meta name="description" content={`${coupleNames}'s Wedding - Beautiful digital wedding invitation for ${weddingDate}`} />
      <meta property="og:title" content={`${coupleNames}'s Wedding`} />
      <meta property="og:description" content={`Join us for ${coupleNames}'s special day on ${weddingDate}`} />
      <meta name="twitter:title" content={`${coupleNames}'s Wedding`} />
      <meta name="twitter:description" content={`Beautiful digital wedding invitation for ${weddingDate}`} />
    </Helmet>
  )
}

export default DynamicTitle 