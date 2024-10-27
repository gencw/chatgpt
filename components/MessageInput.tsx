import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { BlurView } from "expo-blur";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import AnimatedButton from "./AnimatedButton";
import { useTheme } from "@/hooks/ThemeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useTextInput from "@/hooks/useTextInput";
import * as Haptics from "expo-haptics";

interface Props {
  onClose: () => void;
  onPress: (message: string) => void;
  isWorking?: boolean;
}
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
export default function MessageInput({ onPress, isWorking, onClose }: Props) {
  const { bottom } = useSafeAreaInsets();
  const [show, setShow] = useState<boolean>(false);
  const input = useTextInput();
  const theme = useTheme();
  const buttonAnimations = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    if (show) {
      buttonAnimations.forEach((animation, index) => {
        Animated.timing(animation, {
          toValue: 1,
          duration: 300,
          delay: index * 100, // 分阶段动画
          useNativeDriver: false,
        }).start();
      });
    } else {
      buttonAnimations.forEach((animation) => {
        animation.setValue(0); // 隐藏时重置动画
      });
    }
  }, [show]);

  return (
    <BlurView
      style={{
        paddingBottom: bottom,
        paddingTop: 10,
      }}
      intensity={60}
      tint="light"
    >
      <View style={styles.container}>
        {!show && (
          <AnimatedTouchableOpacity
            onPress={() => setShow(!show)}
            style={[styles.roundButton, { backgroundColor: theme.selected }]}
          >
            <FontAwesome6 name="add" size={15} color="#6b7280" />
          </AnimatedTouchableOpacity>
        )}

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AnimatedButton
            show={show}
            animation={buttonAnimations[0]}
            icon={<Feather name="camera" size={20} color="black" />}
            onPress={() => console.log("camera")}
          />
          <AnimatedButton
            show={show}
            animation={buttonAnimations[1]}
            icon={<FontAwesome name="photo" size={20} color="black" />}
            onPress={() => console.log("photo")}
          />
          <AnimatedButton
            show={show}
            animation={buttonAnimations[2]}
            icon={<FontAwesome6 name="folder-closed" size={20} color="black" />}
            onPress={() => console.log("folder-closed")}
          />
        </View>
        <TextInput
          autoFocus
          multiline
          placeholder="Search"
          style={[styles.messageInput, { borderColor: theme.selected }]}
          onChangeText={input.onChange}
          onPress={() => setShow(false)}
          value={input.value}
        />
        {isWorking ? (
          <AnimatedTouchableOpacity onPress={onClose}>
            <MaterialIcons name="pause-circle" size={25} color={theme.grey} />
          </AnimatedTouchableOpacity>
        ) : (
          <AnimatedTouchableOpacity
            onPress={() => {
              Haptics.selectionAsync();
              onPress(input.value);
              input.onChange("");
            }}
          >
            <Ionicons
              name="arrow-up-circle-sharp"
              size={25}
              color={theme.grey}
            />
          </AnimatedTouchableOpacity>
        )}
      </View>
    </BlurView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 8,
  },
  messageInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    padding: 8,
  },
  roundButton: {
    width: 25, // Adjusted size for better usability
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15, // Keep it circular
  },
});
