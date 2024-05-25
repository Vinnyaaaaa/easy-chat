import { PropsWithChildren, createContext } from "react";
import { MessageProvider } from "./components/Message";

interface ConfigProviderProps {}

export const ConfigContext = createContext<ConfigProviderProps>({});

export function ConfigProvider(props: PropsWithChildren) {
  const { children } = props;

  return (
    <ConfigContext.Provider value={{}}>
      <MessageProvider></MessageProvider>
      {children}
    </ConfigContext.Provider>
  );
}
