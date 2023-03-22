import { AppProvider } from "@/providers/app";
import { AppRouters } from "@/routes";

export const App = () => {
  return (
    <AppProvider>
      <AppRouters />
    </AppProvider>
  );
};
