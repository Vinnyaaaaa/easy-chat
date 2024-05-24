import { useStore } from "../../../store";
import { ChatBotMessage } from "./chat-bot-massage";
import { ChatHumanMessage } from "./chat-human-message";
import styles from "./index.module.less";

export const ChatBody = () => {
  const messageList = useStore((state) => state.messageList);
  return (
    <div className={styles.chat_body__layout}>
      {messageList.map(({ role, content }, key) => {
        if (role === "assistant") {
          return <ChatBotMessage content={content} key={key} />;
        }
        return <ChatHumanMessage content={content} key={key} />;
      })}
    </div>
  );
};
