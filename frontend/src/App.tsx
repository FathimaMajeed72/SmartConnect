import AppRouter from "./app/router/router";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster richColors position="top-right" closeButton />
    </>
  );
}

export default App;
