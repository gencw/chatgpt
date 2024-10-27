import { View, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import useTextInput from "@/hooks/useTextInput";
import LoginHeader from "@/components/login/LoginHeader";
import LoginForm from "@/components/login/LoginForm";
import LoginFooter from "@/components/login/LoginFooter";

export default function LoginScreen() {
  const { type } = useLocalSearchParams();
  const isLogin = type === "login";
  const username = useTextInput("", (text) => console.log("username:", text));
  const nickname = useTextInput("", (text) => console.log("nickname:", text));
  const password = useTextInput("");
  const reset = () => {
    username.reset();
    password.reset();
    nickname.reset();
  };
  return (
    <View style={styles.container}>
      <LoginHeader isLogin={isLogin} />
      <LoginForm
        isLogin={isLogin}
        username={username}
        password={password}
        nickname={nickname}
        onPress={reset}
      />
      <LoginFooter isLogin={isLogin} onPress={reset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
