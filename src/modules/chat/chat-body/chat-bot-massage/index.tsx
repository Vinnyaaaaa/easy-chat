import styles from "./index.module.less";
import bot from "@/assets/bot.png";
export const ChatBotMessage = ({ content }: { content: string }) => {
  return (
    <div className={styles.chat_message}>
      <div className={styles.chat_message__container}>
        <div className={styles.chat_message__header}>
          <div className={styles.chat_message_avatar}>
            <img src={bot} width={32} height={32} />
          </div>
        </div>
        <div className={styles.chat_message_content}>{content}</div>
        <div className={styles.chat_message}></div>
      </div>
    </div>
  );
};
