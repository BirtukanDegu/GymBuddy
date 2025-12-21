"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { PWAProvider } from "./PWAProvider";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="dark">
      <PWAProvider>{children}</PWAProvider>
      </ThemeProvider>
    </Provider>
  );
}
