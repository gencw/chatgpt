import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Haptics from "expo-haptics";
import { handleCopy, handleShare, saveImageToGallery } from "@/hooks/ImageUtil";
import DalleDropDown from "@/components/DalleDropDown";
import * as Clipboard from "expo-clipboard";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import {
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

export default function Page() {
  const { url, text } = useLocalSearchParams<{
    url: string;
    text?: string;
  }>();
  const props = [
    {
      title: "View prompt",
      icon: "info.circle",
      onSelect: () => {
        onCopyPrompt();
      },
    },
    {
      title: "Learn more",
      icon: "questionmark.circle",
      onSelect: () => {
        handlePresentModalPress();
      },
    },
  ];
  console.log(url, text);
  const { bottom } = useSafeAreaInsets();
  const onCopyPrompt = () => {
    Clipboard.setStringAsync(text!);
    Toast.show("Copy Success", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const snapPoints = useMemo(() => ["40%", "60%", "80%"], []);
  // renders
  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={bottom}>
        <TouchableOpacity style={styles.footerContainer} onPress={onCopyPrompt}>
          <Text style={styles.footerText}>Copy</Text>
        </TouchableOpacity>
      </BottomSheetFooter>
    ),
    []
  );
  return (
    <RootSiblingParent>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
        <BottomSheetModalProvider>
          <Stack.Screen
            options={{
              headerRight: () => <DalleDropDown props={props} />,
            }}
          />
          <ImageZoom
            minScale={1}
            maxScale={5}
            doubleTapScale={2}
            isPinchEnabled
            isSingleTapEnabled
            isDoubleTapEnabled
            uri={url}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
          <BlurView
            intensity={60}
            tint="dark"
            style={[styles.blurView, { paddingBottom: bottom }]}
          >
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                Haptics.selectionAsync();
              }}
            >
              <FontAwesome name="magic" size={24} color="white" />
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                Haptics.selectionAsync();
                handleCopy(url);
              }}
            >
              <Ionicons name="copy" size={24} color="white" />
              <Text style={styles.text}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                Haptics.selectionAsync();
                saveImageToGallery(url);
              }}
            >
              <Ionicons name="download" size={24} color="white" />
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                Haptics.selectionAsync();
                handleShare(url);
              }}
            >
              <Ionicons name="share" size={24} color="white" />
              <Text style={styles.text}>share</Text>
            </TouchableOpacity>
          </BlurView>
          <BottomSheetModal
            index={0}
            snapPoints={snapPoints}
            ref={bottomSheetModalRef}
            onChange={handlePresentModalPress}
            enableDynamicSizing={false}
            backgroundStyle={{
              backgroundColor: "black",
            }}
            handleIndicatorStyle={{ backgroundColor: "white" }}
            footerComponent={renderFooter}
          >
            <BottomSheetScrollView
              contentContainerStyle={{ flex: 1, paddingHorizontal: 16 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.titleText}>Prompt</Text>
                <Pressable
                  onPress={handlePresentModalClose}
                  style={styles.closeBtn}
                >
                  <Ionicons name="close-outline" size={24} color={"#000"} />
                </Pressable>
              </View>
              <Text style={styles.promptText}>{text}</Text>
            </BottomSheetScrollView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </RootSiblingParent>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "white",
    fontWeight: "normal",
  },
  touchableOpacity: {
    alignItems: "center",
    gap: 5,
  },
  blurView: {
    width: "100%",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  promptText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  closeBtn: {
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 26,
    width: 26,
    alignItems: "center",
    justifyContent: "center",
  },

  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  footerText: {
    textAlign: "center",
    color: "black",
    fontWeight: "800",
  },
});
