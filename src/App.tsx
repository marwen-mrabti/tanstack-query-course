import { reactLogo, tsQueryLogo } from "./assets";

function App() {
  return (
    <main className="min-h-dvh w-screen bg-transparent">
      <div className="grid w-full max-w-7xl grid-cols-1 place-items-center gap-4 px-4 py-2">
        <img src={reactLogo} alt="react.js logo" />
        <img src={tsQueryLogo} alt="tanstack query logo" />
        <h1 className="text-primary text-4xl">tanstack query</h1>
      </div>
    </main>
  );
}

export default App;
