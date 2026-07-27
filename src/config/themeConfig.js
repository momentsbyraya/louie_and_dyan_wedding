// Theme Configuration — Timeless White Elegant (Dusty Blue)
export const themeConfig = {
    // Background Colors
    backgrounds: {
        primary: 'bg-white',
        secondary: 'bg-off-white',
        accent: 'bg-wedding-600',
        light: 'bg-white/50',
        theme: 'bg-wedding-50',
        ivory: 'bg-ivory',
        softGray: 'bg-soft-gray',
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat',
    },

    // Text Colors
    text: {
        primary: 'text-primary-text',
        secondary: 'text-secondary-text',
        accent: 'text-wedding-600',
        muted: 'text-secondary-text',
        dark: 'text-wedding-800',
        theme: 'text-wedding-600',
        pause: 'text-secondary-text',
        custom: 'text-primary-text',
        inverse: 'text-white',
    },

    // Border Colors
    borders: {
        primary: 'border-border-gray',
        secondary: 'border-accent-silver',
        accent: 'border-wedding-300',
        theme: 'border-wedding-500',
    },

    // Button Colors
    buttons: {
        primary: 'bg-wedding-600 hover:bg-wedding-700 text-white',
        secondary: 'bg-white border border-wedding-500 text-wedding-700 hover:bg-wedding-50',
        text: 'text-white',
        theme: 'bg-wedding-600 hover:bg-wedding-700 text-white',
    },

    // Hover Effects
    hover: {
        primary: 'hover:bg-wedding-700',
        secondary: 'hover:border-wedding-600 hover:text-wedding-800',
        theme: 'hover:bg-wedding-700',
    },

    // Container Configuration
    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    // Calendar Configuration
    calendar: {
        weddingDate: '2026-12-20',
        highlightColor: 'bg-wedding-600',
        heartColor: 'text-wedding-600',
        textColor: 'text-primary-text',
        headerColor: 'text-wedding-800',
        dayNamesColor: 'text-secondary-text',
        background: 'bg-wedding-600',
    },

    // Paragraph Configuration
    paragraph: {
        background: 'bg-ivory',
    },

    // Custom CSS Variables
    cssVariables: {
        '--primary-bg': '#FFFFFF',
        '--secondary-bg': '#FCFCFB',
        '--accent-bg': '#6F92AA',
        '--primary-text': '#27323B',
        '--secondary-text': '#6B7682',
        '--accent-text': '#6F92AA',
        '--muted-text': '#6B7682',
        '--border-color': '#D6DDE3',
        '--custom-theme': '#F8FAFC',
        '--ivory': '#F8F7F4',
        '--soft-gray': '#E9ECEF',
        '--accent-silver': '#C9D3DB',
    }
}

// Quick color presets for different themes
export const themePresets = {
    dustyBlueElegant: {
        backgrounds: {
            primary: 'bg-white',
            secondary: 'bg-ivory',
            accent: 'bg-wedding-600',
        },
        text: {
            primary: 'text-primary-text',
            secondary: 'text-secondary-text',
            accent: 'text-wedding-600',
        }
    },

    lightRomantic: {
        backgrounds: {
            primary: 'bg-wedding-50',
            secondary: 'bg-white',
            accent: 'bg-wedding-500',
        },
        text: {
            primary: 'text-wedding-900',
            secondary: 'text-secondary-text',
            accent: 'text-wedding-600',
        }
    },

    softSilver: {
        backgrounds: {
            primary: 'bg-off-white',
            secondary: 'bg-soft-gray',
            accent: 'bg-wedding-600',
        },
        text: {
            primary: 'text-primary-text',
            secondary: 'text-secondary-text',
            accent: 'text-wedding-700',
        }
    }
}

// Section heading text (Dusty Blue, Pinyon Script)
export const sectionTitleStyle = {
    color: '#55768E',
    fontFamily: '"Pinyon Script", cursive',
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
