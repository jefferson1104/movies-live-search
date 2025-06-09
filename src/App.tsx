import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { FavoritesProvider } from "./contexts/favoritesContext";

import { Home } from "./pages/Home";

function App() {
  const queryClient = new QueryClient();

  // Renders
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <Home />
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

export default App;
