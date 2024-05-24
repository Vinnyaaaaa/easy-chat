import styles from "./index.module.less";
import classnames from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ children, className, onClick }: Props) => {
  return (
    <button
      className={classnames(styles.chat_send_btn, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
