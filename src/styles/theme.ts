// 🌈 Revolutionary Color System - Aurora-inspired
export const revolutionaryTheme = {
  // Signature Aurora Gradients
  gradients: {
    aurora: {
      primary: 'linear-gradient(135deg, #9c27b0 0%, #00bcd4 50%, #ff9800 100%)', // violet → cyan → orange
      subtle: 'linear-gradient(135deg, rgba(156,39,176,0.1) 0%, rgba(0,188,212,0.1) 50%, rgba(255,152,0,0.1) 100%)',
      animated: 'linear-gradient(-45deg, #9c27b0, #673ab7, #3f51b5, #2196f3, #00bcd4, #009688, #4caf50, #8bc34a, #cddc39, #ffeb3b, #ffc107, #ff9800)',
    },
    glassmorphism: {
      light: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
      dark: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    },
    mood: {
      excellent: 'linear-gradient(135deg, #00D4AA 0%, #4CAF50 100%)', // Vert émeraude
      good: 'linear-gradient(135deg, #2196F3 0%, #3F51B5 100%)', // Bleu cobalt
      warning: 'linear-gradient(135deg, #FF9800 0%, #FF6B47 100%)', // Orange corail
      danger: 'linear-gradient(135deg, #E74C3C 0%, #C62828 100%)', // Rouge cardinal
      neutral: 'linear-gradient(135deg, #6B5B95 0%, #8E8E93 100%)', // Mocha mousse
    }
  },

  // Semantic Color System
  colors: {
    signature: {
      cobalt: '#3F50B5',
      coral: '#FF6B47', 
      emerald: '#00D4AA',
      cardinal: '#E74C3C',
      mocha: '#6B5B95', // Pantone 2025
    },
    glassmorphism: {
      backdrop: 'rgba(255, 255, 255, 0.25)',
      border: 'rgba(255, 255, 255, 0.18)',
      shadow: 'rgba(31, 38, 135, 0.37)',
    },
    neon: {
      cyan: '#00FFFF',
      magenta: '#FF00FF',
      lime: '#00FF00',
      yellow: '#FFFF00',
    }
  },

  // Glassmorphism 2.0 Effects
  effects: {
    glassmorphism: {
      backdropFilter: 'blur(40px) saturate(180%)',
      background: 'rgba(255, 255, 255, 0.25)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
      borderRadius: '16px',
    },
    neumorphism: {
      light: '8px 8px 16px rgba(163, 177, 198, 0.6), -8px -8px 16px rgba(255, 255, 255, 0.5)',
      dark: '8px 8px 16px rgba(0, 0, 0, 0.6), -8px -8px 16px rgba(255, 255, 255, 0.1)',
    },
    glow: {
      soft: '0 0 20px rgba(156, 39, 176, 0.3)',
      intense: '0 0 40px rgba(156, 39, 176, 0.6)',
      neon: '0 0 60px rgba(0, 255, 255, 0.8)',
    }
  },

  // Physics-based Animation Curves
  easing: {
    elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    bounce: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },

  // Spacing System (50% white space philosophy)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },

  // Typography Scale
  typography: {
    hero: {
      fontSize: '3rem',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.4,
    }
  },

  // Gamification Colors
  gamification: {
    streak: {
      fire: '#FF4500',
      gold: '#FFD700',
      silver: '#C0C0C0',
      bronze: '#CD7F32',
    },
    badges: {
      legendary: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      epic: 'linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)',
      rare: 'linear-gradient(135deg, #2196F3 0%, #03A9F4 100%)',
      common: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
    }
  }
};

// Dynamic Theme Based on Financial Health
export const getMoodTheme = (financialScore: number) => {
  if (financialScore >= 90) return revolutionaryTheme.gradients.mood.excellent;
  if (financialScore >= 70) return revolutionaryTheme.gradients.mood.good;
  if (financialScore >= 50) return revolutionaryTheme.gradients.mood.warning;
  if (financialScore >= 30) return revolutionaryTheme.gradients.mood.danger;
  return revolutionaryTheme.gradients.mood.neutral;
};

export default revolutionaryTheme;