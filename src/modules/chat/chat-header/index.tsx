import { useState } from "react";
import { Button } from "../../../components/button";
import { useStore } from "../../../store";
import styles from "./index.module.less";
import { TextField } from "@mui/material";
export const ChatHeader = () => {
  const messageCount = useStore((state) => state.messageList.length);
  const apiKey = useStore((state) => state.apiKey);
  const saveApiKey = useStore((state) => state.saveApiKey);
  const [inputValue, setInputValue] = useState(apiKey || "");

  const onClick = () => {
    if (!inputValue) return;
    saveApiKey(inputValue);
  };

  const onValueChange = (e) => setInputValue(e.target.value);

  return (
    <div className={styles.chat_header__layout}>
      <div className={styles.header_left__container}>
        <div className={styles.header_title}>新的聊天</div>
        <div>共 {messageCount} 条对话</div>
      </div>
      <div className={styles.header_right__container}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="请输入apiKay"
          value={inputValue}
          className={styles.apikey_input}
          onChange={onValueChange}
        />
        <Button onClick={onClick}>保存</Button>
      </div>
    </div>
  );
};
