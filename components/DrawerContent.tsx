import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useTextInput from "@/hooks/useTextInput";
import { Link } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { RFValue } from "react-native-responsive-fontsize";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";
import { lightTheme } from "@/constants/themes";

const SearchBar = ({ search }: any) => (
  <BlurView intensity={90} tint="light" style={styles.searchContainer}>
    <View
      style={[
        styles.searchInputContainer,
        { backgroundColor: lightTheme.selected },
      ]}
    >
      <Ionicons name="search-outline" size={15} color="gray" />
      <TextInput
        value={search.value}
        onChangeText={search.onChange}
        placeholder="Search"
        style={styles.searchInput}
      />
    </View>
  </BlurView>
);

const UserFooter = () => (
  <Link href="/login" asChild>
    <TouchableOpacity
      onPress={() => Haptics.selectionAsync()}
      style={styles.footer}
    >
      <Image
        source={{
          uri: "https://pbs.twimg.com/profile_images/1846200018019274756/Ih_JyMkB_400x400.jpg",
        }}
        style={styles.image}
      />
      <Text style={styles.text}>Username</Text>
      <Feather name="more-horizontal" size={RFValue(20)} color="gray" />
    </TouchableOpacity>
  </Link>
);

export default function DrawerContent(props: any) {
  const { top, bottom } = useSafeAreaInsets();
  const search = useTextInput("", (text) => console.log("search:", text));

  return (
    <View style={{ flex: 1, marginTop: top }}>
      <SearchBar search={search} />
      <DrawerContentScrollView
        contentContainerStyle={{ paddingTop: 50 }}
        {...props}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ marginBottom: bottom }}>
        <UserFooter />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingBottom: 10,
    position: "absolute",
    width: "100%",
    zIndex: 100,
  },
  searchInputContainer: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 7,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    gap: 10,
    marginHorizontal: 10,
  },
  image: {
    width: RFValue(25),
    height: RFValue(25),
    borderRadius: RFValue(8),
  },
  text: {
    color: "black",
    fontSize: RFValue(12),
    fontWeight: "500",
    flex: 1,
  },
});
