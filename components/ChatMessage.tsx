import { useTheme } from "@/hooks/ThemeContext";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ContextMenu from "zeego/context-menu";

import { MarkdownRenderer } from "./MarkdownRenderer";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { handleCopy, handleShare, saveImageToGallery } from "@/hooks/ImageUtil";

type ChatMessageProps = {
  text?: string;
  sender: string;
  isLoading?: boolean;
  image?: string;
  retry?: () => void;
};

const ChatMessage = ({
  text,
  sender,
  isLoading,
  image,
  retry,
}: ChatMessageProps) => {
  const isUser = sender === "user";
  const theme = useTheme();
  const renderContent = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          color={theme.grey}
          size="small"
          style={{ justifyContent: "center", padding: 6 }}
        />
      );
    }
    console.log("image:", image);
    console.log("text:", text);
    if (image) {
      return (
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <Link
              //@ts-ignore
              href={`/(home)/(modal)/dalle/${encodeURIComponent(
                image
              )}?text=${text!}`}
              asChild
            >
              <Pressable>
                <Image source={{ uri: image }} style={styles.image} />
              </Pressable>
            </Link>
          </ContextMenu.Trigger>

          <ContextMenu.Content>
            {contextItems.map((item, index) => (
              // @ts-ignore
              <ContextMenu.Item key={index.toString()} onSelect={item.action}>
                <ContextMenu.ItemTitle>{item.title}</ContextMenu.ItemTitle>
                <ContextMenu.ItemIcon
                  ios={{
                    // @ts-ignore
                    name: item.systemIcon,
                    pointSize: 18,
                  }}
                />
              </ContextMenu.Item>
            ))}
          </ContextMenu.Content>
        </ContextMenu.Root>
      );
    }
    if (retry) {
      return (
        <View
          style={{
            flexDirection: "column",
            gap: 10,
            backgroundColor: "#fff7ed",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text style={{ color: theme.orange, fontWeight: "semibold" }}>
            {text}
          </Text>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              padding: 10,
              backgroundColor: theme.orange,
            }}
            onPress={() => {
              Haptics.selectionAsync();
              retry();
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              重试
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (!isUser && text) {
      return <MarkdownRenderer children={text} />;
    }
    return <Text style={styles.messageText}>{text}</Text>;
  };

  const contextItems = [
    {
      title: "Copy",
      systemIcon: "doc.on.doc",
      action: () => handleCopy(image!),
    },

    {
      title: "Save",
      systemIcon: "arrow.down.to.line",
      action: () => saveImageToGallery(image!),
    },
    {
      title: "Share",
      systemIcon: "square.and.arrow.up",
      action: () => handleShare(image!),
    },
  ];

  return (
    <View
      style={[
        styles.messageWrapper,
        isUser
          ? [styles.userMessage, { backgroundColor: theme.selected }]
          : styles.aiMessage,
      ]}
    >
      {isUser ? (
        <Text style={styles.messageText}>{text}</Text>
      ) : (
        <View style={styles.aiMessageContainer}>
          <View style={[styles.aiMessageIcon, { borderColor: theme.selected }]}>
            <Image
              source={require("@/assets/images/logo-dark.png")}
              style={styles.aiIcon}
            />
          </View>
          <View style={styles.messageContent}>{renderContent()}</View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageWrapper: {
    marginHorizontal: 10,
    marginVertical: 5,
    maxWidth: "85%",
  },
  userMessage: {
    alignSelf: "flex-end",
    borderRadius: 15,
    padding: 10,
  },
  aiMessage: {
    alignSelf: "flex-start",
  },
  aiMessageContainer: {
    flexDirection: "row",
    gap: 5,
  },
  aiMessageIcon: {
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  aiIcon: {
    width: 20,
    height: 20,
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  messageContent: {
    borderRadius: 10,
  },
  image: {
    width: 235,
    height: 235,
    borderRadius: 10,
  },
});

export default ChatMessage;
