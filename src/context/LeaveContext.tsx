import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Schedule } from "../types/types";

const LeaveContext = createContext<Schedule[]>([]);
const LeaveAddContext = createContext<(schedule: Schedule) => void>(() =>
  alert("Not implemented.")
);

export function useLeaves() {
  return useContext(LeaveContext);
}

export function useLeaveAdd() {
  return useContext(LeaveAddContext);
}

export function LeaveProvider({ children }: PropsWithChildren) {
  const [leaves, setLeaves] = useState<Schedule[]>([]);

  useEffect(() => {
    const localStorageData = localStorage.getItem("leaves");
    if (localStorageData) {
      setLeaves(JSON.parse(localStorageData));
    }
  }, []);

  const addLeave = (schedule: Schedule) => {
    const newLeaves = [...leaves, schedule];
    setLeaves(newLeaves);
    localStorage.setItem("leaves", JSON.stringify(newLeaves));
  };

  return (
    <LeaveContext.Provider value={leaves}>
      <LeaveAddContext.Provider value={addLeave}>
        {children}
      </LeaveAddContext.Provider>
    </LeaveContext.Provider>
  );
}
