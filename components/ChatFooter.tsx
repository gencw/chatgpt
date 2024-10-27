import { KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import MessageInput from "./MessageInput";
import ChatOption from "./ChatOption";
import { Messages } from "@/type/chat";
interface Props {
  onClose: () => void;
  onPress: (message: string) => void;
  isWorking?: boolean;
  messages?: Messages[];
}
const options = [
  {
    label: "设计一款编程游戏",
    value: "以有趣的方式教授基础知识",
  },
  {
    label: "制定一项锻炼计划",
    value: "用于力量训练",
  },
  {
    label: "告诉我一个趣事",
    value: "关于罗马帝国",
  },
  {
    label: "给我讲一个故事",
    value: "关于一位勇敢的战士",
  },
];
export default function ChatFooter({
  isWorking,
  onClose,
  onPress,
  messages,
}: Props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
    >
      {messages?.length == 0 && (
        <ChatOption onSeleced={onPress} options={options} />
      )}
      <MessageInput isWorking={isWorking} onClose={onClose} onPress={onPress} />
    </KeyboardAvoidingView>
  );
}
