import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface Props {
  isLogin: boolean;
  onPress: () => void;
}

export default function LoginFooter({ isLogin, onPress }: Props) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.footer, { paddingBottom: bottom }]}>
      <Link
        href={{
          pathname: "/login",
          params: { type: isLogin ? "register" : "login" },
        }}
        style={[
          styles.button,
          {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "#9ca3af",
            borderRadius: 10,
          },
        ]}
        asChild
      >
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: "#1d4ed8" }}>
            {isLogin ? "Create an account" : "Login"}
          </Text>
        </TouchableOpacity>
      </Link>
      <Text style={styles.footerLabel}>Tongtian</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    gap: 10,
  },
  footerLabel: {
    fontSize: 12,
    color: "gray",
    fontWeight: "500",
  },
  button: {
    width: "80%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});
