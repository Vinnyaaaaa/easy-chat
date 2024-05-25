import { useMessageStore } from "./messageStore";

export function useMessage() {
  const { add, remove, clearAll } = useMessageStore((state) => ({
    add: state.add,
    remove: state.remove,
    clearAll: state.clearAll,
  }));

  return { addMessage: add, removeMessage: remove, clearAllMessage: clearAll };
}
