import { create } from "zustand";
import { sendMessageToGpt } from "../api";

export interface MessageType {
  role: "user" | "assistant";
  content: string;
}

interface State {
  messageList: MessageType[];
  apiKey?: string;
  errorInfo: { hasError: boolean; info?: string };
}
interface Action {
  sendMessage: (message: MessageType) => Promise<void>;
  addMessage: (message: MessageType) => void;
  saveApiKey: (apiKey: string) => void;
  resetErrorInfo: () => void;
}

const initialState = (): State => ({
  messageList: [{ role: "assistant", content: "你好，有什么可以帮助你的吗" }],
  apiKey: localStorage.getItem("apiKey") || "",
  errorInfo: { hasError: false },
});

const store = create<State & Action>()((set, get) => ({
  ...initialState(),

  sendMessage: async (message) => {
    try {
      get().addMessage(message);
      const { code, data } = await sendMessageToGpt(get().messageList);
      if (code === 200) {
        get().addMessage(data.choices[0].message);
        return;
      }
      set({ errorInfo: { hasError: true, info: data.error.message } });
    } catch (error) {
      console.log(error);
    }
  },

  addMessage: (message) => {
    if (get().messageList.length > 20) {
      set({ messageList: [...get().messageList.slice(1), message] });
    }
    set({ messageList: [...get().messageList, message] });
  },

  saveApiKey: (apiKey) => {
    set({ apiKey });
    localStorage.setItem("apiKey", apiKey);
  },

  resetErrorInfo: () => {
    set({ errorInfo: { hasError: false, info: "" } });
  },
}));

export const useStore = store;
