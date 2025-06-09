import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Home } from "./pages/Home";

function App() {
  const queryClient = new QueryClient();

  // Renders
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
