import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import ChildProvider from "./context/ChildContext";
import { LeaveProvider } from "./context/LeaveContext";
import ParentProvider from "./context/ParentContext";
import { useEffect, useState } from "react";

const App = () => {
  const [showWarningBanner, setShowWarningBanner] = useState(false);
  useEffect(() => {
    setShowWarningBanner(!localStorage.getItem("showWarningBanner"));
  }, []);

  const hideWarningBanner = () => {
    setShowWarningBanner(false);
    localStorage.setItem("showWarningBanner", "false");
  };

  return (
    <>
      {showWarningBanner && (
        <div className="flex justify-between bg-amber-300 px-4 py-1 items-center">
          <div className="flex flex-col items-center w-full min-w-fit bg-amber-300 text-sm z-20">
            <p>Flappen är i alfaversion och kan gå sönder när som helst.</p>
            <p>
              Data sparas <b>endast lokalt i din webbläsare.</b>
            </p>
          </div>
          <button className="p-2" onClick={hideWarningBanner}>
            x
          </button>
        </div>
      )}
      <ParentProvider>
        <ChildProvider>
          <LeaveProvider>
            <NavBar />
            <main>
              <Outlet />
            </main>
          </LeaveProvider>
        </ChildProvider>
      </ParentProvider>
    </>
  );
};

export default App;
