import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link } from "expo-router";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/hooks/ThemeContext";

export default function LoginBottonList() {
  const theme = useTheme();

  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <TouchableOpacity
        onPress={() => Haptics.selectionAsync()}
        accessibilityLabel="Continue with Google"
        style={[styles.btnContainer, { backgroundColor: "white" }]}
      >
        <Ionicons name="logo-google" size={24} color="black" />
        <Text>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => Haptics.selectionAsync()}
        accessibilityLabel="Continue with Twitter"
        style={[styles.btnContainer, { backgroundColor: theme.grey }]}
      >
        <FontAwesome6 name="x-twitter" size={24} color="white" />
        <Text style={{ color: "white" }}>Continue with Twitter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Haptics.selectionAsync()}
        accessibilityLabel="Continue with Facebook"
        style={[styles.btnContainer, { backgroundColor: theme.grey }]}
      >
        <FontAwesome6 name="facebook" size={24} color="white" />
        <Text style={{ color: "white" }}>Continue with Facebook</Text>
      </TouchableOpacity>
      <Link
        href={{
          pathname: "/login",
          params: { type: "login" },
        }}
        asChild
        style={[styles.login, { borderColor: theme.grey }]}
      >
        <TouchableOpacity
          accessibilityLabel="Log in"
          onPress={() => Haptics.selectionAsync()}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Log in</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href={"/(home)/(drawer)"}
        asChild
        style={[styles.login, { borderColor: theme.grey }]}
        onPress={() => Haptics.selectionAsync()}
      >
        <TouchableOpacity accessibilityLabel="Log in">
          <Text style={{ color: "white", textAlign: "center" }}>Home</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    padding: 20,
    gap: 10,
    backgroundColor: "black",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  login: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "black",
    borderWidth: 1,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 10,
    borderRadius: 10,
  },
});
