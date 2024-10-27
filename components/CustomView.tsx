import { View, ViewStyle } from "react-native";
import React from "react";
interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}
export default function CustomView({ children, style }: Props) {
  return (
    <View style={[{ flex: 1, backgroundColor: "white" }, style]}>
      {children}
    </View>
  );
}
