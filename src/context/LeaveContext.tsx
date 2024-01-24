import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { NewSchedule, Schedule } from "../types/types";

const LeaveContext = createContext<Schedule[]>([]);
const LeaveAddContext = createContext<(_: NewSchedule) => void>(() =>
  alert("Not implemented.")
);
const LeaveDeleteContext = createContext<(_: string) => void>(() =>
  alert("Not implemented.")
);

export function useLeaves() {
  return useContext(LeaveContext);
}

export function useLeaveAdd() {
  return useContext(LeaveAddContext);
}

export function useLeaveDelete() {
  return useContext(LeaveDeleteContext);
}

export function LeaveProvider({ children }: PropsWithChildren) {
  const [leaves, setLeaves] = useState<Schedule[]>([]);

  useEffect(() => {
    const localStorageData = localStorage.getItem("leaves");
    if (localStorageData) {
      setLeaves(JSON.parse(localStorageData));
    }
  }, []);

  const addLeave = (schedule: NewSchedule) => {
    const newLeaves = [...leaves, { ...schedule, id: crypto.randomUUID() }];
    setLeaves(newLeaves);
    localStorage.setItem("leaves", JSON.stringify(newLeaves));
  };

  const deleteLeave = (id: string) => {
    const i = leaves.findIndex((l) => l.id === id);
    const newLeaves = [...leaves];
    newLeaves.splice(i, 1);
    setLeaves(newLeaves);
    localStorage.setItem("leaves", JSON.stringify(newLeaves));
  };

  return (
    <LeaveContext.Provider value={leaves}>
      <LeaveAddContext.Provider value={addLeave}>
        <LeaveDeleteContext.Provider value={deleteLeave}>
          {children}
        </LeaveDeleteContext.Provider>
      </LeaveAddContext.Provider>
    </LeaveContext.Provider>
  );
}
