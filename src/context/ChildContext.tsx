import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

export const CHILDREN: Child[] = [
  {
    id: "1",
    name: "Alfred",
    dateOfBirth: { year: 2020, month: 3, date: 14 },
  },
  {
    id: "2",
    name: "Alma",
    dateOfBirth: { year: 2023, month: 2, date: 30 },
  },
];

const dummyChild: Child = {
  id: "-1",
  name: "John",
};

export const ChildContext = createContext<Child>(dummyChild);
export const ChildUpdateContext = createContext((id: string) =>
  alert("No handler in place, but you entered " + id)
);

export function useChild() {
  return useContext(ChildContext);
}

export function useChildUpdate() {
  return useContext(ChildUpdateContext);
}

export default function ChildProvider({ children }: PropsWithChildren) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [child, setChild] = useState(CHILDREN[0]);

  useEffect(() => {
    setChild(
      CHILDREN.find((p) => p.id === searchParams.get("child")) ||
        CHILDREN.find((p) => p.id === localStorage.getItem("child")) ||
        CHILDREN[0]
    );
  }, []);

  const handleSetChild = (id: string) => {
    setChild(CHILDREN.find((p) => p.id === id) || dummyChild);
    localStorage.setItem("child", id);
    searchParams.set("child", id);
    setSearchParams(searchParams);
  };

  return (
    <ChildContext.Provider value={child}>
      <ChildUpdateContext.Provider value={handleSetChild}>
        {children}
      </ChildUpdateContext.Provider>
    </ChildContext.Provider>
  );
}
