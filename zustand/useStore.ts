import { create } from "zustand";

export interface Message {
  text?: string;
  sender: string;
  isLoading?: boolean;
  image?: string;
}

interface Store {
  messages: Message[];
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
}

export const useStore = create<Store>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setMessages: (messages) => set({ messages }),
}));
