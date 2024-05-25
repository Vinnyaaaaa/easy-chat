import { create } from "zustand";
import { MessageProps } from ".";
import {
  DEFAULT_POSITION,
  findMessage,
  getId,
  getMessagePosition,
} from "./utils";
import { MessageList } from "./types";

interface Store {
  messageList: MessageList;
}

interface Action {
  add: (message: MessageProps) => void;

  update: (id: number, messageProps: MessageProps) => void;

  remove: (id: number) => void;

  clearAll: () => void;
}

const initialValues = () => ({
  messageList: { top: [], bottom: [] },
});

export const useMessageStore = create<Store & Action>()((set, get) => ({
  ...initialValues(),
  add: (messageProps: MessageProps) => {
    const id = getId(messageProps);

    if (messageProps.id) {
      const position = getMessagePosition(get().messageList, messageProps.id);
      if (position) return;
    }

    const position = messageProps.position || DEFAULT_POSITION;

    const isTop = position === "top";

    const messages = isTop
      ? [{ ...messageProps, id }, ...get().messageList[position]]
      : [...get().messageList[position], { ...messageProps, id }];

    set({ messageList: { ...get().messageList, [position]: messages } });
  },

  update: (id: number, messageProps: MessageProps) => {
    if (!id) return;

    const { position, index } = findMessage(get().messageList, id);

    if (position && index !== -1) {
      const nextMessageList = { ...get().messageList };
      nextMessageList[position][index] = {
        ...nextMessageList[position][index],
        ...messageProps,
      };

      set({ messageList: nextMessageList });
    }
  },

  remove: (id: number) => {
    const position = getMessagePosition(get().messageList, id);

    if (!position) return;

    set({
      messageList: {
        ...get().messageList,
        [position]: get().messageList[position].filter(
          (message) => message.id !== id
        ),
      },
    });
  },

  clearAll: () => {
    set({ messageList: { top: [], bottom: [] } });
  },
}));
