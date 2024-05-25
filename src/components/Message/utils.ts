import { MessageList, MessageProps, Position } from "./types";

export const DEFAULT_POSITION = "top";

let count = 1;
export const getId = (messageProps: MessageProps) => {
  if (messageProps.id) {
    return messageProps.id;
  }
  count += 1;
  return count;
};

export const getMessagePosition = (messageList: MessageList, id: number) => {
  for (const [position, list] of Object.entries(messageList)) {
    if (list.find((item) => item.id === id)) {
      return position as Position;
    }
  }
};

export const findMessage = (messageList: MessageList, id: number) => {
  const position = getMessagePosition(messageList, id);

  const index = position
    ? messageList[position].findIndex((message) => message.id === id)
    : -1;

  return {
    position,
    index,
  };
};
