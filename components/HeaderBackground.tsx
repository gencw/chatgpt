import { StyleSheet } from "react-native";
import React from "react";
import Drawer from "expo-router/drawer";
import { BlurView } from "expo-blur";

export default function HeaderBackground() {
  return (
    <Drawer.Screen
      options={{
        headerBackground: () => (
          <BlurView
            intensity={60}
            tint={"light"}
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "rgba(0256,256,256,0.5)" },
            ]}
          />
        ),
        headerTransparent: true,
      }}
    />
  );
}
