import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useEffect, useState } from "react";
import CustomView from "@/components/CustomView";
import Drawer from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import HeaderBackground from "@/components/HeaderBackground";
import * as Haptics from "expo-haptics";
import {
  getHeaderTitle,
  Header,
  useHeaderHeight,
} from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import ExploreCard from "@/components/ExploreCard";

const sections = [
  { title: "Top Picks", label: "Curated top picks from this week" },
  { title: "Dall·E", label: "Transform your ideas into amazing images" },
  {
    title: "Writing",
    label:
      "Enhance your writing with tools for creation, editing, and style refinement",
  },
  { title: "Productivity", label: "Increase your efficiency" },
  {
    title: "Research & Analysis",
    label: "Find, evaluate, interpret, and visualize information",
  },
  { title: "Programming", label: "Write code, debug, test, and learn" },
];

const apps = [
  {
    title: "Instant Website [Multipage]",
    description:
      "Generates functional multipage websites aimed at meeting the needs of startups and small businesses. Continuously updated with new features.",
    author: "By Max & Kirill Dubovitsky",
    image:
      "https://files.oaiusercontent.com/file-9P4NhIxlr14rKlHEM41VVbxS?se=2124-03-21T08%3A51%3A45Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D1209600%2C%20immutable&rscd=attachment%3B%20filename%3Dsdfgasdfx.jpg&sig=8xHssdF2qgY0qpyaUNRn4My5tJwh9iYMn1Lg53H9Z1c%3D",
  },
  {
    title: "Diagrams & Data",
    description:
      "Helps research, analyze, and visualize complex data through diagrams and charts. Useful for coders and business analysts alike.",
    author: "By Max & Kirill Dubovitsky",
    image:
      "https://files.oaiusercontent.com/file-teufH6uVdqxmxHjEUIQjD8ur?se=2124-03-24T19%3A02%3A04Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D1209600%2C%20immutable&rscd=attachment%3B%20filename%3Dvar6.jpg&sig=wn6KyKdgbqJ1gGkHltYV8cl3/ZwLZmgO039GkueA8Z8%3D",
  },
  {
    title: "ChatPRD",
    description:
      "Acts as an on-demand Chief Product Officer, enhancing product requirement documents and providing coaching for product managers and engineers.",
    author: "By Claire V Lawless",
    image:
      "https://files.oaiusercontent.com/file-qeVpUG3AJT0FINT4eZ6Gbt2q?se=2123-10-17T23%3A41%3A20Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Dcvolawless_illustration_of_a_female_ceo_at_a_laptop_lo-fi_asthe_c60ce7fb-5902-474c-aa85-54c7469aa089.png&sig=eHU4/LmvHg96KaqivlhaLufaIleMC1wm3pE0kMQF1AA%3D",
  },
  {
    title: "Music Teacher",
    description:
      "Specializes in music theory, scales, production, and more, also includes image generation capabilities for cover art.",
    author: "By gryphonedm.com",
    image:
      "https://files.oaiusercontent.com/file-gLZOuk6mmgg4vsCuhWxgQ2Cm?se=2123-12-13T21%3A57%3A04Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D1209600%2C%20immutable&rscd=attachment%3B%20filename%3D3e763913-0301-49ec-b2f0-c9ad832df862.png&sig=cCp02Ji5dcCxt0UPu92vrFgmZ8p1jwkqUYlYbR4IfoY%3D",
  },
];

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const SectionButton = memo(({ item, selected, onPress }: any) => (
  <TouchableOpacity
    onPress={() => {
      Haptics.selectionAsync();
      onPress(item);
    }}
    style={[
      styles.sectionBtn,
      selected.title === item.title && styles.sectionBtnSelected,
    ]}
  >
    <Text
      style={[
        styles.sectionBtnText,
        selected.title === item.title && styles.sectionBtnTextSelected,
      ]}
    >
      {item.title}
    </Text>
  </TouchableOpacity>
));

export default function Explore() {
  const [selected, setSelected] = useState(sections[0]);
  const [loading, setLoading] = useState(true);
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CustomView>
      <Drawer.Screen
        options={{
          headerBackground: () => <HeaderBackground />,
          headerRight: () => (
            <Ionicons
              name="search-outline"
              size={20}
              color="black"
              style={{ marginRight: 10 }}
            />
          ),
          header: ({ options, route }) => (
            <View>
              <Header
                {...options}
                title={getHeaderTitle(options, route.name)}
              />
              <FlatList
                horizontal
                data={sections}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <SectionButton
                    item={item}
                    selected={selected}
                    onPress={setSelected}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sectionListContainer}
              />
            </View>
          ),
        }}
      />
      <ScrollView style={{ paddingTop: headerHeight }}>
        <Animated.View
          style={{ padding: 16, paddingBottom: 100 }}
          entering={FadeIn.duration(600).delay(400)}
          exiting={FadeOut.duration(400)}
        >
          <ShimmerPlaceholder width={160} height={20} visible={!loading}>
            <Text style={styles.title}>{selected.title}</Text>
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            width={280}
            height={20}
            visible={!loading}
            shimmerStyle={styles.shimmerMargin}
          >
            <Text style={styles.label}>{selected.label}</Text>
          </ShimmerPlaceholder>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {apps.map((item, key) => {
              return (
                <ExploreCard
                  key={key}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  author={item.author}
                  loading={loading}
                />
              );
            })}
          </ScrollView>
        </Animated.View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  sectionListContainer: {
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  section: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  shimmerMargin: {
    marginVertical: 10,
  },
  sectionBtn: {
    backgroundColor: "#f5f5f5",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sectionBtnSelected: {
    backgroundColor: "black",
  },
  sectionBtnText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 12,
  },
  sectionBtnTextSelected: {
    color: "white",
  },
  card: {
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    padding: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  cardImagePlaceholder: {
    borderRadius: 30,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardContent: {
    flexShrink: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardDesc: {
    fontSize: 14,
    color: "#000",
  },
  cardAuthor: {
    fontSize: 14,
    color: "#666",
  },
});
