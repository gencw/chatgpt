import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";

interface Props {
  isLogin: boolean;
  username: any;
  password: any;
  nickname: any;
  onPress: () => void;
}

export default function LoginForm({
  isLogin,
  username,
  password,
  nickname,
  onPress,
}: Props) {
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const toggleSecureEntry = () => setIsSecureEntry(!isSecureEntry);

  const handleLogin = () => {
    console.log("Login");
    alert(username.value);
  };

  const handleRegister = () => {
    console.log("Register");
  };

  const isFormValid = () => {
    const isValidLogin = username.value.trim() && password.value.trim();
    const isValidSignup =
      username.value.trim() && nickname.value.trim() && password.value.trim();
    return isLogin ? isValidLogin : isValidSignup;
  };
  const linkProps = isLogin
    ? ({ pathname: "/forgot-password", params: {} } as const)
    : ({ pathname: "/login", params: { type: "login" } } as const);

  const linkText = isLogin ? "Forgot password?" : "Already have an account?";

  return (
    <View style={styles.inputContainer}>
      <TextInput
        accessibilityLabel="Username"
        accessibilityHint="Enter your username"
        value={username.value}
        onChangeText={username.onChange}
        placeholder="Username"
        placeholderTextColor={"gray"}
        style={[styles.textInput, styles.inputTop]}
      />

      {!isLogin && (
        <TextInput
          accessibilityLabel="Nickname"
          accessibilityHint="Enter your nickname"
          value={nickname.value}
          onChangeText={nickname.onChange}
          placeholder="Nickname"
          placeholderTextColor={"gray"}
          style={styles.textInput}
        />
      )}

      <View
        style={[styles.textInput, styles.inputBottom, styles.passwordContainer]}
      >
        <TextInput
          accessibilityLabel="Password"
          accessibilityHint="Enter your password"
          value={password.value}
          onChangeText={password.onChange}
          placeholder="Password"
          secureTextEntry={isSecureEntry}
          placeholderTextColor={"gray"}
          style={styles.flexInput}
        />
        {password.value && (
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Text>{isSecureEntry ? "Show" : "Hide"}</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        accessibilityLabel={isLogin ? "Login" : "Register"}
        accessibilityHint={`Press to ${isLogin ? "login" : "register"}`}
        disabled={!isFormValid()}
        onPress={isLogin ? handleLogin : handleRegister}
        style={[
          styles.button,
          {
            backgroundColor: isFormValid() ? "#1d4ed8" : "#60a5fa",
            marginTop: 20,
          },
        ]}
      >
        <Text style={styles.buttonText}>{isLogin ? "Login" : "Register"}</Text>
      </TouchableOpacity>

      <Link href={linkProps} asChild>
        <TouchableOpacity onPress={!isLogin ? onPress : undefined}>
          <Text style={styles.secondaryText}>{linkText}</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#9ca3af",
    padding: 10,
  },
  inputTop: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  inputBottom: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexInput: {
    flex: 1,
  },
  button: {
    width: "80%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  secondaryText: {
    marginTop: 10,
    color: "#1d4ed8",
  },
});
