import { PropsWithChildren, createContext, useContext, useState } from "react";

export const PARENTS: Parent[] = [
  {
    id: "1",
    name: "Simon",
    color: "red",
  },
  {
    id: "2",
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
  const [parent, setParent] = useState(PARENTS[0]);
  const handleSetParent = (id: string) => {
    setParent(PARENTS.find((p) => p.id === id) || dummyParent);
  };
  return (
    <ParentContext.Provider value={parent}>
      <ParentUpdateContext.Provider value={handleSetParent}>
        {children}
      </ParentUpdateContext.Provider>
    </ParentContext.Provider>
  );
}
