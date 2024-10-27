import React from "react";
import Markdown from "react-native-markdown-display";

export const MarkdownRenderer = ({ children }: { children: string }) => {
  return <Markdown>{children}</Markdown>;
};
