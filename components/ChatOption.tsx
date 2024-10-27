import { Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Option } from "@/type/chat";

interface Props {
  onSeleced: (option: string) => void;
  options: Option[];
}
export default function ChatOption({ onSeleced, options }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 10,
      }}
    >
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => {
            console.log(`${option.label} ${option.value}`);
            onSeleced(`${option.label} ${option.value}`);
          }}
        >
          <Text style={styles.title}>{option.label}</Text>
          <Text style={styles.desc}>{option.value}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  option: {
    flexDirection: "column",
    alignItems: "flex-start",
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    padding: 10,
    gap: 5,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 10,
    color: "#6b7280",
  },
});
