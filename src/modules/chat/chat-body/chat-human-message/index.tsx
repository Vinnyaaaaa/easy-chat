import styles from "./index.module.less";

export const ChatHumanMessage = ({ content }: { content: string }) => {
  return (
    <div className={styles.chat_message__user}>
      <div className={styles.chat_message__container}>
        <div className={styles.chat_message__header}>
          <div className={styles.chat_message_avatar}>
            <img src="https://emojicdn.elk.sh/🥳" width={16} height={16} />
          </div>
        </div>
        <div className={styles.chat_message_content}>{content}</div>
        <div className={styles.chat_message}></div>
      </div>
    </div>
  );
};
