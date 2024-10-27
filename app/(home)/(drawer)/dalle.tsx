import { View, Image, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import CustomView from "@/components/CustomView";
import ChatFooter from "@/components/ChatFooter";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { Messages } from "@/type/chat";
import { Config } from "@/constants/Config";
import HeaderBackground from "@/components/HeaderBackground";
import { ChatMessages } from "@/components/ChatMessages";

const ERROR_MESSAGES = {
  CANCELLED: "请求已取消",
  FAILURE: "请求失败，请重试。",
};

export default function Dalle() {
  const [messages, setMessages] = useState<Messages[]>([]);
  const keyboardHeight = useKeyboardHeight();
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchChatResponse = async (text: string) => {
    if (!text.trim()) return;
    setIsWorking(true);

    const userMessage = { text: text, sender: "user" };
    setMessages((prev) => [
      ...prev,
      userMessage,
      { sender: "ai", isLoading: true },
    ]);

    abortControllerRef.current = new AbortController();

    try {
      const data = await fetchDalleImage(text);
      updateMessagesWithResponse(data, text);
    } catch (error) {
      handleFetchError(error);
    } finally {
      setIsWorking(false);
    }
  };

  const fetchDalleImage = async (prompt: string) => {
    if (!abortControllerRef.current) {
      return Promise.reject(new Error("AbortController is not initialized"));
    }
    const response = await fetch(Config.BASE_URL + "/api/ai/dalle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
      signal: abortControllerRef.current.signal, // Use the abort signal to cancel requests if necessary
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json(); // Return the parsed JSON data
  };

  const updateMessagesWithResponse = (data: any, text: string) => {
    console.log("data:", data);
    if (data.image) {
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = {
          image: data.image,
          text: text,
          sender: "ai",
          isLoading: false,
        };
        return updatedMessages;
      });
    }
  };

  const handleFetchError = (error: any) => {
    const errorMessage =
      error.name === "AbortError"
        ? ERROR_MESSAGES.CANCELLED
        : ERROR_MESSAGES.FAILURE;

    setMessages((prev) => {
      const updatedMessages = [...prev];
      updatedMessages[updatedMessages.length - 1] = {
        text: errorMessage,
        sender: "ai",
        isLoading: false,
      };
      return updatedMessages;
    });
  };

  const onClose = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };
  console.log("messages:", messages);

  return (
    <CustomView style={{ paddingBottom: keyboardHeight }}>
      <HeaderBackground />

      {messages.length === 0 ? (
        <View style={styles.centerView}>
          <Image
            source={require("@/assets/images/dalle.png")}
            style={styles.logo}
          />
        </View>
      ) : (
        <ChatMessages messages={messages} />
      )}
      <ChatFooter
        onPress={fetchChatResponse}
        messages={messages}
        isWorking={isWorking}
        onClose={onClose}
      />
    </CustomView>
  );
}

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 35,
    height: 35,
  },
});
