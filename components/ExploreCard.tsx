import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
interface Props {
  title: string;
  description: string;
  image: string;
  author: string;
  loading?: boolean;
}
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export default function ExploreCard({
  title,
  description,
  image,
  author,
  loading,
}: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#F6F6F6",
        gap: 10,
        paddingHorizontal: 5,
      }}
    >
      <ShimmerPlaceholder visible={!loading}>
        <Image
          source={{ uri: image }}
          style={{ width: 55, height: 55, borderRadius: 50 }}
        />
      </ShimmerPlaceholder>
      <View
        style={{
          flexShrink: 1,
          gap: 5,
          padding: 5,
        }}
      >
        <ShimmerPlaceholder visible={!loading}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        </ShimmerPlaceholder>
        <ShimmerPlaceholder visible={!loading}>
          <Text style={{ fontSize: 16, fontWeight: "semibold" }}>
            {description}
          </Text>
        </ShimmerPlaceholder>
        <ShimmerPlaceholder visible={!loading}>
          <Text style={{ fontSize: 16, color: "gray" }}>{author}</Text>
        </ShimmerPlaceholder>
      </View>
    </View>
  );
}
