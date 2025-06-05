import { InputSearch } from "./components/InputSearch";

function App() {
  // Renders
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 flex items-center justify-center bg-gray-100 shadow">
        <h1 className="text-2xl font-bold">Movies Live Search</h1>
      </header>

      <main className="flex flex-col flex-grow items-center">
        <div className="mt-16 mb-8 w-[480px]">
          <InputSearch />
        </div>

        <div className="max-w-xl">
          <p className="text-lg text-center">
            Movies Live Search é uma aplicação que permite buscar filmes em
            tempo real, exibindo resultados instantâneos enquanto o usuário
            digita. O projeto utiliza React, TypeScript e APIs públicas de
            filmes para oferecer uma experiência rápida e intuitiva.
          </p>
        </div>
      </main>

      <footer className="h-16 flex items-center justify-center bg-gray-100 shadow">
        <p className="text-sm">&copy; 2025 Soares Dev LTDA.</p>
      </footer>
    </div>
  );
}

export default App;
