import { StyleSheet } from 'react-native';

export const GlassTheme = {
  colors: {
    background: ['#0F172A', '#1E293B'], // Dark Slate Gradient
    userBubble: ['#6366F1', '#4F46E5'], // Indigo Gradient
    aiBubble: 'rgba(255, 255, 255, 0.08)', // Translucent White
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    border: 'rgba(255, 255, 255, 0.1)',
    glassBackground: 'rgba(30, 41, 59, 0.7)', // Frosted effect
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
  },
  roundness: {
    m: 12,
    l: 20,
    pill: 50,
  }
};

export const commonStyles = StyleSheet.create({
  glassContainer: {
    backgroundColor: GlassTheme.colors.glassBackground,
    borderWidth: 1,
    borderColor: GlassTheme.colors.border,
    borderRadius: GlassTheme.roundness.l,
    backdropFilter: 'blur(10px)', // Note: Needs special handling in RN, but we'll use opacity
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  }
});
