import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import ChildProvider from "./context/ChildContext";
import ParentProvider from "./context/ParentContext";

const App = () => {
  return (
    <>
      <div className="flex flex-col sticky items-center w-full min-w-fit bg-amber-300 px-4 py-1 text-sm z-20">
        <p className="text-center">
          Flappen är i alfaversion och kan gå sönder när som helst.
        </p>
        <p>
          Data sparas <b>endast lokalt i din webbläsare.</b>
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
