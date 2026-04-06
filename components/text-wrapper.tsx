import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { ManropeFonts } from '@/constants/theme';

// Default font weight for text
const DEFAULT_FONT_WEIGHT: keyof typeof ManropeFonts = 'regular';

interface TextWrapperProps extends TextProps {
  weight?: keyof typeof ManropeFonts;
}

/**
 * Text wrapper component that applies Manrope font family by default.
 * Use this component instead of React Native's Text for consistent font styling.
 *
 * Usage:
 * <Text weight="medium">Your text here</Text>
 * <Text weight="bold">Bold text</Text>
 */
export function Text({ weight = DEFAULT_FONT_WEIGHT, style, ...props }: TextWrapperProps) {
  return <RNText style={[{ fontFamily: ManropeFonts[weight] }, style]} {...props} />;
}

/**
 * Helper function to apply Manrope font to existing styles
 * Useful for adding font to StyleSheet.create styles
 *
 * Usage:
 * const styles = StyleSheet.create({
 *   text: {
 *     fontSize: 16,
 *     ...fontStyle('medium'),
 *   },
 * });
 */
export const fontStyle = (weight: keyof typeof ManropeFonts = 'regular') => ({
  fontFamily: ManropeFonts[weight],
});

/**
 * Manrope font styles for use in StyleSheet.create
 */
export const ManropeStyles = StyleSheet.create({
  extraLight: { fontFamily: ManropeFonts.extraLight },
  light: { fontFamily: ManropeFonts.light },
  regular: { fontFamily: ManropeFonts.regular },
  medium: { fontFamily: ManropeFonts.medium },
  semiBold: { fontFamily: ManropeFonts.semiBold },
  bold: { fontFamily: ManropeFonts.bold },
  extraBold: { fontFamily: ManropeFonts.extraBold },
});
