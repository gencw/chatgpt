import { Animated, TouchableOpacity } from "react-native";
import React from "react";
interface Props {
  animation: Animated.Value;
  show: boolean;
  onPress: () => void;
  icon: React.ReactNode;
}
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
export default function AnimatedButton({
  animation,
  show,
  onPress,
  icon,
}: Props) {
  const width = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30], // 设置按钮的最终宽度
  });

  return (
    <Animated.View style={{ width, overflow: "hidden" }}>
      {show && (
        <AnimatedTouchableOpacity onPress={onPress}>
          {icon}
        </AnimatedTouchableOpacity>
      )}
    </Animated.View>
  );
}
