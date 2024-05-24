import { ChatBody } from "./chat-body";
import { ChatHeader } from "./chat-header";
import { ChatInputPanel } from "./chat-input-panel";
import styles from "./index.module.less";

const Chat = () => {
  return (
    <div className={styles.chat_layout}>
      <ChatHeader />
      <ChatBody />
      <ChatInputPanel />
    </div>
  );
};

export default Chat;
