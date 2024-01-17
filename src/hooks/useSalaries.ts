import { useEffect, useState } from "react";
import {
  getSalariesFromLocalStorage,
  setSalariesLocalStorage,
} from "../utils/LocalStorage";
import { Salary } from "../types/types";

export function useSalaries() {
  const [salaries, setSalaries] = useState<Salary[]>([]);

  useEffect(() => {
    setSalaries(getSalariesFromLocalStorage());
  }, []);

  const addSalary = (salary: Salary) => {
    const newSalaries = [...salaries];
    newSalaries.push(salary);
    setSalariesLocalStorage(newSalaries);
    setSalaries(newSalaries);
  };

  const deleteSalary = (idToDelete: string) => {
    const newSalaries = salaries.filter((s) => s.id !== idToDelete);
    setSalariesLocalStorage(newSalaries);
    setSalaries(newSalaries);
  };

  return { addSalary, deleteSalary, salaries };
}
