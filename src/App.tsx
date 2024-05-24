import styles from "./app.module.less";
import { ErrorTips } from "./components/error-tip";
import Chat from "./modules/chat";
function App() {
  return (
    <div className={styles.app}>
      <Chat />
      <ErrorTips />
    </div>
  );
}

export default App;
