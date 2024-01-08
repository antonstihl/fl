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
    alert(
      `No add handler in place, but you entered ${id} ${name} ${dateOfBirth}`
    )
);
const ChildDeleteContext = createContext((id: string) =>
  alert(`No delete handler in place, but you entered ${id}`)
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

export function useChildDelete() {
  return useContext(ChildDeleteContext);
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
  }, []);

  useEffect(() => {
    const savedChild =
      children.find((p) => p.id === searchParams.get("child")) ||
      children.find((p) => p.id === localStorage.getItem("child")) ||
      children.length > 0
        ? children[0]
        : undefined;
    setChild(savedChild);
    if (savedChild) {
      searchParams.set("child", savedChild.id);
      setSearchParams(searchParams);
    }
  }, [children]);


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

  const handleDeleteChild = (id: string) => {
    const index = children.findIndex((c) => c.id === id);
    const updatedChildren = [...children];
    updatedChildren.splice(index, 1);
    setChildren(updatedChildren);
    localStorage.setItem("children", JSON.stringify(updatedChildren));
  };

  return (
    <ChildContext.Provider value={child}>
      <ChildUpdateContext.Provider value={handleSetChild}>
        <ChildAddContext.Provider value={handleAddChild}>
          <ChildDeleteContext.Provider value={handleDeleteChild}>
            <ChildrenContext.Provider value={children}>
              {reactChildren}
            </ChildrenContext.Provider>
          </ChildDeleteContext.Provider>
        </ChildAddContext.Provider>
      </ChildUpdateContext.Provider>
    </ChildContext.Provider>
  );
}
