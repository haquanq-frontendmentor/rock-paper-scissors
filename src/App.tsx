import { Header } from "./components/Header";

export const App = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 dark:bg-(image:--gradient-background)">
      <div className="mx-auto w-[min(100vw-3rem,46.25rem)]">
        <Header />
      </div>
    </div>
  );
};
