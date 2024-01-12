import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import ChildProvider from "./context/ChildContext";
import ParentProvider from "./context/ParentContext";

const App = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full bg-amber-300 px-4 py-1 text-sm">
        <p>Flappen är i alfaversion och kan gå sönder när som helst.</p>
        <p>
          All data sparas <b>lokalt i din browser.</b>
        </p>
      </div>
      <ParentProvider>
        <ChildProvider>
          <NavBar />
          <main>
            <Outlet />
          </main>
        </ChildProvider>
      </ParentProvider>
    </>
  );
};

export default App;
