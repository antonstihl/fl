import { useEffect, useState } from "react";
import {
  getSalariesFromLocalStorage,
  setSalariesLocalStorage,
} from "../utils/LocalStorage";

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

  return { addSalary, salaries };
}
