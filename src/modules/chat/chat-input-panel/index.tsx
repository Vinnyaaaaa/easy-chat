import { useState } from "react";
import styles from "./index.module.less";
import { useStore } from "../../../store";
import Snackbar from "@mui/material/Snackbar";
import { Button } from "../../../components/button";

export const ChatInputPanel = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  const apiKey = useStore((state) => state.apiKey);
  const sentMessage = useStore((state) => state.sendMessage);

  const send = async () => {
    if (!apiKey) {
      setOpen(true);
      return;
    }

    if (!textareaValue || loading) return;
    setTextareaValue("");
    setLoading(true);
    await sentMessage({ role: "user", content: textareaValue });
    setLoading(false);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      send();
    }
  };

  const handleChange = (e: any) => setTextareaValue(e.target.value);

  const handleAddApiKeyTip = () => setOpen(false);

  return (
    <div className={styles.chat_input__panel}>
      <div className={styles.chat_input__inner}>
        <textarea
          value={textareaValue}
          className={styles.chat_textarea}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button className={styles.button} onClick={send}>
          发送
        </Button>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={"请先添加ApiKey"}
        onClose={handleAddApiKeyTip}
      />
    </div>
  );
};
