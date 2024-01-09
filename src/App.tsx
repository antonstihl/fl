import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import ChildProvider from "./context/ChildContext";
import ParentProvider from "./context/ParentContext";

const App = () => {
  return (
    <>
      <ParentProvider>
        <ChildProvider>
          <NavBar/>
          <main>
            <Outlet />
          </main>
        </ChildProvider>
      </ParentProvider>
    </>
  );
};

export default App;
