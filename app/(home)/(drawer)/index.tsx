import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import CustomView from "@/components/CustomView";
import ChatFooter from "@/components/ChatFooter";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import EventSource from "react-native-sse";
import { MessageEvent } from "react-native-sse";
import { Messages } from "@/type/chat";
import { Config } from "@/constants/Config";
import HeaderBackground from "@/components/HeaderBackground";
import { ChatMessages } from "@/components/ChatMessages";
import { Image } from "expo-image";

export default function Index() {
  const keyboardHeight = useKeyboardHeight();
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const updateLastMessage = (
    prev: Messages[],
    updatedMessage: Partial<Messages>
  ): Messages[] => {
    const lastMessage = prev[prev.length - 1];
    if (lastMessage?.sender === "ai") {
      return [
        ...prev.slice(0, -1),
        {
          ...lastMessage,
          ...updatedMessage,
        },
      ];
    }
    return prev;
  };
  const retryMessage = (text: string) => {
    fetchChatResponse(text);
  };
  const eventSourceClose = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
      setIsWorking(false);
    }
  };
  const handleMessage = useCallback((event: MessageEvent) => {
    const data = event.data?.trim();
    if (data === "[DONE]") {
      setEventSource(null);
      setIsWorking(false);
    } else if (data) {
      try {
        const parsedData = JSON.parse(data);
        if (parsedData?.response) {
          setMessages((prev) =>
            updateLastMessage(prev, {
              text: (prev[prev.length - 1]?.text || "") + parsedData.response,
              isLoading: false,
            })
          );
        }
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    }
  }, []);

  const fetchChatResponse = useCallback((text: string) => {
    if (!text.trim()) return;
    setIsWorking(true);
    setMessages((prev) => [...prev, { text: text, sender: "user" }]);
    setMessages((prev) => [
      ...prev,
      { text: "", sender: "ai", isLoading: true },
    ]);
    eventSourceClose();
    const es = new EventSource(`${Config.BASE_URL}/api/ai/chat`, {
      method: "POST",
      body: JSON.stringify({ prompt: text }),
    });

    es.addEventListener("message", handleMessage);
    es.addEventListener("error", (error: any) => {
      console.log("EventSource failed:", error);

      setMessages((prev) =>
        updateLastMessage(prev, {
          text: `Error: ${error.message}`,
          isLoading: false,
          retry: () => retryMessage(text),
        })
      );

      setIsWorking(false);
      es.close();
    });

    setEventSource(es);
  }, []);

  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  return (
    <CustomView style={{ paddingBottom: keyboardHeight }}>
      <HeaderBackground />

      {messages.length === 0 ? (
        <View style={styles.centerView}>
          <Image
            source={require("@/assets/images/logo-dark.png")}
            style={styles.logo}
          />
        </View>
      ) : (
        <ChatMessages messages={messages} />
      )}
      <ChatFooter
        isWorking={isWorking}
        onClose={eventSourceClose}
        onPress={fetchChatResponse}
        messages={messages}
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
