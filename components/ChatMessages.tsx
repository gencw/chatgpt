import React from "react";
import { FlashList } from "@shopify/flash-list";
import ChatMessage from "@/components/ChatMessage";
import { Messages } from "@/type/chat";
import { useHeaderHeight } from "@react-navigation/elements";

export const ChatMessages = ({ messages }: { messages: Messages[] }) => {
  const headerHeight = useHeaderHeight();

  return (
    <FlashList
      keyExtractor={(item, index) => index.toString()}
      data={messages}
      renderItem={({ item }) => <ChatMessage {...item} />}
      estimatedItemSize={400}
      contentContainerStyle={{
        paddingTop: headerHeight,
        paddingBottom: 150,
      }}
      keyboardDismissMode="on-drag"
    />
  );
};
