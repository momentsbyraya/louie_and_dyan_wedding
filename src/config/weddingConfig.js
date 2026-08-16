// ========================================
// WEDDING INVITATION CONFIGURATION
// ========================================
// This file imports data from JSON files to avoid duplication
// Update the JSON files in src/data/ to modify wedding information

import { couple, venues } from '../data'
import { parseCalendarDate, parseWeddingDateTime } from '../utils/countdown'

export const weddingConfig = {
  // Basic Wedding Information - imported from couple.json
  couple: {
    bride: couple.bride,
    groom: couple.groom,
    together: couple.together
  },

  // Wedding Details - imported from couple.json
  wedding: couple.wedding,

  // Venue Information - imported from venues.json
  venue: venues,

  // RSVP Information
  rsvp: {
    deadline: "2026-11-20",
    email: "dyanrosiamoreno25@gmail.com",
    phone: "+1 3063223080",
    website: "https://forms.gle/3du1PwoHfmHBSFVeA",
    formEmbedUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdWU99jTFcIyjuq5-qliB9i8cz9xQHtaYMP3iznMeJpz5JbWA/viewform?embedded=true",
    message: "Please RSVP by November 20th, 2026"
  },

  // Theme and Styling
  theme: {
    primaryColor: "wedding-600",
    secondaryColor: "wedding-400",
    accentColor: "gold-500",
    fontFamily: "serif",
    style: "elegant" // Options: elegant, modern, timeless, classic
  },

  // Photos and Media
  photos: {
    hero: "",
    gallery: [],
    background: ""
  },

  // Additional Information
  details: {
    hashtag: "#DyanAndLouie2026",
    website: "",
    registry: "",
    message: "We're excited to celebrate our special day with you!",
    covidInfo: ""
  },

  // Social Media
  social: {
    instagram: "",
    facebook: "",
    twitter: ""
  }
};

// Helper function to format date
export const formatDate = (dateString) => {
  const date = parseCalendarDate(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper function to get time remaining until wedding
export const getTimeUntilWedding = () => {
  const weddingDate = parseWeddingDateTime(couple.wedding.date, couple.wedding.time);
  const now = new Date();
  const timeDiff = weddingDate.getTime() - now.getTime();
  
  if (timeDiff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
}; 