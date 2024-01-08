import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

export const ParentContext = createContext<Parent | undefined>(undefined);
export const ParentsContext = createContext<Parent[]>([]);
export const ParentUpdateContext = createContext((id: string) =>
  alert("No handler in place, but you entered " + id)
);
export const ParentAddContext = createContext((name: string) =>
  alert("No handler in place, but you entered " + name)
);
export const ParentDeleteContext = createContext((id: string) =>
  alert("No handler in place")
);

export function useParent() {
  return useContext(ParentContext);
}

export function useParentUpdate() {
  return useContext(ParentUpdateContext);
}

export function useParentAdd() {
  return useContext(ParentAddContext);
}

export function useParents() {
  return useContext(ParentsContext);
}

export function useParentDelete() {
  return useContext(ParentDeleteContext);
}

export default function ParentProvider({ children }: PropsWithChildren) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [parents, setParents] = useState<Parent[]>([]);
  const [parent, setParent] = useState<Parent | undefined>(parents[0]);

  useEffect(() => {
    const savedParents: Parent[] =
      JSON.parse(localStorage.getItem("parents") || "[]") || [];
    setParents(savedParents);
    setParent(
      savedParents.find((p) => p.id === searchParams.get("parent")) ||
        savedParents.find((p) => p.id === localStorage.getItem("parent")) ||
        savedParents[0]
    );
  }, []);

  const handleSetParent = (id: string) => {
    setParent(parents.find((p) => p.id === id) || undefined);
    localStorage.setItem("parent", id);
    searchParams.set("parent", id);
    setSearchParams(searchParams);
  };

  const handleAddParent = (name: string) => {
    const newParent = { id: crypto.randomUUID(), name } as Parent;
    const updatedParents = [...parents, newParent];
    setParents(updatedParents);
    localStorage.setItem("parents", JSON.stringify(updatedParents));
  };

  const handleDeleteParent = (id: string) => {
    const index = parents.findIndex((p) => p.id === id);
    const updatedParents = [...parents];
    updatedParents.splice(index, 1);
    setParents(updatedParents);
    localStorage.setItem("parents", JSON.stringify(updatedParents));
  };

  return (
    <ParentsContext.Provider value={parents}>
      <ParentContext.Provider value={parent}>
        <ParentUpdateContext.Provider value={handleSetParent}>
          <ParentAddContext.Provider value={handleAddParent}>
            <ParentDeleteContext.Provider value={handleDeleteParent}>
              {children}
            </ParentDeleteContext.Provider>
          </ParentAddContext.Provider>
        </ParentUpdateContext.Provider>
      </ParentContext.Provider>
    </ParentsContext.Provider>
  );
}
