// components/ui/Text.tsx

import { Text as RNText, TextProps, StyleSheet } from "react-native";

type FontWeight = "light" | "regular" | "medium" | "semibold" | "bold";
type FontSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";

interface CustomTextProps extends TextProps {
  weight?: FontWeight;
  size?: FontSize;
  className?: string;
}

const fontFamilyMap: Record<FontWeight, string> = {
  light: "Inter-Light",
  regular: "Inter-Regular",
  medium: "Inter-Medium",
  semibold: "Inter-SemiBold",
  bold: "Inter-Bold",
};

const fontSizeMap: Record<FontSize, number> = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
};

export default function Text({
  weight = "light",
  size = "base",
  style,
  children,
  ...props
}: CustomTextProps) {
  return (
    <RNText
      style={[
        {
          fontFamily: fontFamilyMap[weight],
          fontSize: fontSizeMap[size],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}