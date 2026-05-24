// Theme Configuration - Easy to customize colors
export const themeConfig = {
    // Background Colors
    backgrounds: {
        primary: 'bg-gray-900',        // Main dark background
        secondary: 'bg-gray-800',      // Secondary dark background (modals, cards)
        accent: 'bg-wedding-600',      // Accent background (buttons, highlights)
        light: 'bg-white/50',          // Light overlay backgrounds
        theme: 'bg-[#dee5ed]',        // Custom theme color
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat', // Crumpled paper background
    },

    // Text Colors
    text: {
        primary: 'text-white',         // Main heading text color
        secondary: 'text-gray-300',    // Subheading and body text color
        accent: 'text-wedding-600',    // Accent text color
        muted: 'text-gray-400',        // Muted text color (icons, small text)
        dark: 'text-wedding-800',      // Dark text for light backgrounds
        theme: 'text-[#bc9e82]',      // Custom theme text color
        pause: 'text-[#dcdcdc]',      // Pause button text color
        custom: 'text-[#44484d]',     // Custom text color
    },

    // Border Colors
    borders: {
        primary: 'border-gray-700',    // Main border color
        secondary: 'border-gray-600',  // Secondary border color
        accent: 'border-wedding-300',  // Accent border color
        theme: 'border-[#bc9e82]',    // Custom theme border color
    },

    // Button Colors
    buttons: {
        primary: 'bg-wedding-600 hover:bg-wedding-700',  // Primary button
        secondary: 'border border-gray-600 hover:border-gray-400', // Secondary button
        text: 'text-gray-300 hover:text-white', // Button text color
        theme: 'bg-[#bc9e82] hover:bg-[#bc9e82]/80', // Custom theme button
    },

    // Hover Effects
    hover: {
        primary: 'hover:bg-wedding-700',     // Primary button hover
        secondary: 'hover:border-gray-400 hover:text-white', // Secondary button hover
        theme: 'hover:bg-[#bc9e82]/80',     // Custom theme hover
    },

    // Container Configuration
    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    // Calendar Configuration
    calendar: {
        weddingDate: '2026-08-22',          // Wedding date (YYYY-MM-DD format)
        highlightColor: 'bg-[#6c756a]',     // Color for wedding date highlight
        heartColor: 'text-[#6c756a]',       // Color for heart icon
        textColor: 'text-gray-700',         // Calendar text color
        headerColor: 'text-gray-800',       // Month header color
        dayNamesColor: 'text-gray-600',     // Day names color
        background: 'bg-[#6c756a]',         // Calendar background color
    },

    // Paragraph Configuration
    paragraph: {
        background: 'bg-[#f4f5ef]',         // Paragraph background color
    },

    // Custom CSS Variables (for advanced customization)
    cssVariables: {
        '--primary-bg': '#111827',           // #111827 (gray-900)
        '--secondary-bg': '#1f2937',        // #1f2937 (gray-800)
        '--accent-bg': '#7c3aed',           // #7c3aed (wedding-600)
        '--primary-text': '#ffffff',         // #ffffff (white)
        '--secondary-text': '#d1d5db',      // #d1d5db (gray-300)
        '--accent-text': '#7c3aed',         // #7c3aed (wedding-600)
        '--muted-text': '#9ca3af',          // #9ca3af (gray-400)
        '--border-color': '#374151',        // #374151 (gray-700)
        '--custom-theme': '#dee5ed',        // #dee5ed (your custom theme)
    }
}

// Quick color presets for different themes
export const themePresets = {
    // Dark Elegant (Current)
    darkElegant: {
        backgrounds: {
            primary: 'bg-gray-900',
            secondary: 'bg-gray-800',
            accent: 'bg-wedding-600',
        },
        text: {
            primary: 'text-white',
            secondary: 'text-gray-300',
            accent: 'text-wedding-600',
        }
    },

    // Light Romantic
    lightRomantic: {
        backgrounds: {
            primary: 'bg-rose-50',
            secondary: 'bg-white',
            accent: 'bg-rose-500',
        },
        text: {
            primary: 'text-gray-900',
            secondary: 'text-gray-600',
            accent: 'text-rose-600',
        }
    },

    // Warm Autumn
    warmAutumn: {
        backgrounds: {
            primary: 'bg-amber-50',
            secondary: 'bg-orange-100',
            accent: 'bg-orange-500',
        },
        text: {
            primary: 'text-amber-900',
            secondary: 'text-amber-700',
            accent: 'text-orange-600',
        }
    }
}

// Section heading text (solid brown, Homemade Apple — handwritten look)
export const sectionTitleStyle = {
    color: '#6f4e37',
    fontFamily: '"Homemade Apple", cursive',
}

// Helper function to get theme colors
export const getThemeColor = (type, variant = 'primary') => {
    return themeConfig[type]?.[variant] || themeConfig.text.primary
}

// Helper function to apply theme preset
export const applyThemePreset = (presetName) => {
    const preset = themePresets[presetName]
    if (preset) {
        Object.assign(themeConfig, preset)
    }
} 