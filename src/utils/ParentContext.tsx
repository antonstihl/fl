import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

export const PARENTS: Parent[] = [
  {
    id: "alfa",
    name: "Simon",
    color: "red",
  },
  {
    id: "beta",
    name: "Anna",
    color: "green",
  },
];

const dummyParent: Parent = {
  id: "-1",
  name: "John",
  color: "blue",
};

export const ParentContext = createContext<Parent>(dummyParent);
export const ParentUpdateContext = createContext((id: string) =>
  alert("No handler in place, but you entered " + id)
);

export function useParent() {
  return useContext(ParentContext);
}

export function useParentUpdate() {
  return useContext(ParentUpdateContext);
}

export default function ParentProvider({ children }: PropsWithChildren) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [parent, setParent] = useState(PARENTS[0]);

  useEffect(() => {
    setParent(
      PARENTS.find((p) => p.id === searchParams.get("parent")) ||
        PARENTS.find((p) => p.id === localStorage.getItem("parent")) ||
        PARENTS[0]
    );
  }, []);

  const handleSetParent = (id: string) => {
    setParent(PARENTS.find((p) => p.id === id) || dummyParent);
    localStorage.setItem("parent", parent.id);
    searchParams.set("parent", parent.id);
    setSearchParams(searchParams);
  };

  return (
    <ParentContext.Provider value={parent}>
      <ParentUpdateContext.Provider value={handleSetParent}>
        {children}
      </ParentUpdateContext.Provider>
    </ParentContext.Provider>
  );
}
