import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function LoginHeader({ isLogin }: { isLogin: boolean }) {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../../assets/images/logo-dark.png")}
        style={styles.logo}
      />
      <Text style={styles.headerText}>
        {isLogin ? "Welcome back!" : "Create an account"}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    marginTop: 50,
    gap: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
