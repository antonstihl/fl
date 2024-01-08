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

const ChildContext = createContext<Child | undefined>(undefined);
const ChildrenContext = createContext<Child[]>([]);
const ChildUpdateContext = createContext((id: string) =>
  alert(`No handler in place, but you entere${id}`)
);
const ChildAddContext = createContext(
  (id: string, name: string, dateOfBirth?: MyDate) =>
    alert(`No handler in place, but you entered ${id} ${name} ${dateOfBirth}`)
);

export function useChild() {
  return useContext(ChildContext);
}

export function useChildren() {
  return useContext(ChildrenContext);
}

export function useChildUpdate() {
  return useContext(ChildUpdateContext);
}

export function useChildAdd() {
  return useContext(ChildAddContext);
}

export default function ChildProvider({
  children: reactChildren,
}: PropsWithChildren) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [child, setChild] = useState<Child | undefined>(undefined);
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    const savedChildren: Child[] =
      JSON.parse(localStorage.getItem("children") || "[]") || [];
    setChildren(savedChildren);
    const savedChild =
      savedChildren.find((p) => p.id === searchParams.get("child")) ||
      savedChildren.find((p) => p.id === localStorage.getItem("child")) ||
      savedChildren.length > 0
        ? savedChildren[0]
        : undefined;
    setChild(savedChild);
    if (savedChild) {
      searchParams.set("child", savedChild.id);
      setSearchParams(searchParams);
    }
  }, []);

  const handleSetChild = (id: string) => {
    setChild(children.find((p) => p.id === id) || children[0]);
    localStorage.setItem("child", id);
    searchParams.set("child", id);
    setSearchParams(searchParams);
  };

  const handleAddChild = (id: string, name: string, dateOfBirth?: MyDate) => {
    const newChild = { id, name, dateOfBirth } as Child;
    const updatedChildren = [...children, newChild];
    setChildren(updatedChildren);
    localStorage.setItem("children", JSON.stringify(updatedChildren));
  };

  return (
    <ChildContext.Provider value={child}>
      <ChildUpdateContext.Provider value={handleSetChild}>
        <ChildAddContext.Provider value={handleAddChild}>
          <ChildrenContext.Provider value={children}>
            {reactChildren}
          </ChildrenContext.Provider>
        </ChildAddContext.Provider>
      </ChildUpdateContext.Provider>
    </ChildContext.Provider>
  );
}
