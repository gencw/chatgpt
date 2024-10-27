import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Drawer from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Link, useNavigation } from "expo-router";
import * as Haptics from "expo-haptics";
import DrawerContent from "@/components/DrawerContent";
import { useTheme } from "@/hooks/ThemeContext";

export default function _layout() {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <Drawer
      drawerContent={DrawerContent}
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            style={{
              marginLeft: 10,
              marginTop: 5,
            }}
            onPress={() => {
              Haptics.selectionAsync();
              navigation.dispatch(DrawerActions.toggleDrawer);
            }}
          >
            <Ionicons name="reorder-two" size={25} color={theme.grey} />
          </TouchableOpacity>
        ),
        headerShadowVisible: false, // 隐藏头部阴影
        headerStyle: {
          elevation: 0, // Android
          shadowOpacity: 0, // iOS
        },
        drawerItemStyle: {
          borderRadius: 10,
        },
        drawerActiveBackgroundColor: theme.selected,
        drawerActiveTintColor: theme.dark,
        drawerInactiveTintColor: theme.dark,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: () => (
            <Link href={"/(home)/(drawer)/"} asChild>
              <TouchableOpacity
                onPress={() => Haptics.selectionAsync()}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={require("../../../assets/images/logo-dark.png")}
                  style={styles.image}
                />
                <Text style={styles.text}>ChatGPT</Text>
              </TouchableOpacity>
            </Link>
          ),
          headerRight: () => (
            <Link href={"/(home)/(drawer)/"} asChild>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => Haptics.selectionAsync()}
              >
                <Ionicons name="create-outline" size={25} color={theme.dark} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Drawer.Screen
        name="dalle"
        options={{
          drawerLabel: () => (
            <Link href={"/(home)/(drawer)/dalle"} asChild>
              <TouchableOpacity
                onPress={() => Haptics.selectionAsync()}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={require("../../../assets/images/dalle.png")}
                  style={styles.image}
                />
                <Text style={styles.text}>Dall.E</Text>
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Drawer.Screen
        name="explore"
        options={{
          drawerLabel: () => (
            <Link href={"/(home)/(drawer)/explore"} asChild>
              <TouchableOpacity
                onPress={() => Haptics.selectionAsync()}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={require("../../../assets/images/explore.png")}
                  style={styles.image}
                />
                <Text style={styles.text}>Explore GPTs</Text>
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
    </Drawer>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
    marginRight: 35,
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});
