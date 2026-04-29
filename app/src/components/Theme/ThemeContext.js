import React, { createContext, useContext, useState } from 'react';

// Define the color palette and glassmorphism styles
export const theme = {
  colors: {
    // Backgrounds
    backgroundMain: '#0F172A', // Deep Slate
    backgroundSecondary: '#1E293B',
    
    // Glassmorphism specific colors
    glassBackground: 'rgba(255, 255, 255, 0.08)',
    glassBackgroundLight: 'rgba(255, 255, 255, 0.12)',
    glassBorder: 'rgba(255, 255, 255, 0.15)',
    
    // Text
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textAccent: '#38BDF8',
    
    // Accents & Buttons
    primary: '#3B82F6', // Blue
    primaryHover: '#2563EB',
    accent: '#8B5CF6', // Purple
    
    // Status
    success: '#10B981',
    successBackground: 'rgba(16, 185, 129, 0.15)',
    danger: '#EF4444',
    dangerBackground: 'rgba(239, 68, 68, 0.15)',
    warning: '#F59E0B',
  },
  glassStyles: {
    // Reusable glassmorphic style objects
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    button: {
      backgroundColor: 'rgba(59, 130, 246, 0.8)', // Semi-transparent primary
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    input: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      color: '#F8FAFC',
    }
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // In the future, this could hold state to toggle between light/dark mode
  // For now, we return our modern dark glass theme
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
