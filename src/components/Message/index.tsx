import { CSSProperties, FC, ReactNode, useMemo } from "react";
import { useMessageStore } from "./messageStore";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styles from "./index.module.less";
import { createPortal } from "react-dom";
import { useTimer } from "./useTimer";

export type Position = "top" | "bottom";

export interface MessageProps {
  style?: CSSProperties;
  className?: string | string[];
  content: ReactNode | string;
  duration?: number;
  id?: number;
  position?: Position;
  onClose?: (...args: any) => void;
}

const MessageItem: FC<MessageProps> = (item) => {
  const { onMouseEnter, onMouseLeave } = useTimer({
    id: item.id!,
    duration: item.duration,
    remove: item.onClose!,
  });

  return (
    <div
      className={styles.message_item}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {item.content}
    </div>
  );
};

export interface MessageRef {
  add: (messageProps: MessageProps) => void;
  remove: (id: number) => void;
  update: (id: number, messageProps: MessageProps) => void;
  clearAll: () => void;
}

export const MessageProvider = () => {
  const { messageList, remove } = useMessageStore((state) => ({
    messageList: state.messageList,
    add: state.add,
    update: state.update,
    remove: state.remove,
    clearAll: state.clearAll,
  }));

  const positions = Object.keys(messageList) as Position[];

  const messageWrapper = (
    <div className={styles.message_wrapper}>
      {positions.map((direction) => {
        return (
          <TransitionGroup
            className={
              direction === "top"
                ? styles.message_wrapper__top
                : styles.message_wrapper__bottom
            }
            key={direction}
          >
            {messageList[direction].map((item) => {
              return (
                <CSSTransition
                  key={item.id}
                  timeout={1000}
                  classNames="message"
                >
                  <MessageItem {...item} onClose={remove} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        );
      })}
    </div>
  );

  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = styles.wrapper;

    document.body.appendChild(el);
    return el;
  }, []);

  return createPortal(messageWrapper, el);
};
