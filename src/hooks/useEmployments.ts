import { useEffect, useState } from "react";
import {
  getEmploymentsFromLocalStorage,
  setEmploymentsLocalStorage,
} from "../utils/LocalStorage";

export function useEmployments() {
  const [employments, setEmployments] = useState<Employment[]>([]);

  useEffect(() => {
    setEmployments(getEmploymentsFromLocalStorage());
  }, []);

  const addEmployment = (employment: Employment) => {
    const newEmployments = [...employments];
    newEmployments.push(employment);
    setEmploymentsLocalStorage(newEmployments);
    setEmployments(newEmployments);
  };

  const deleteEmployment = (idToDelete: string) => {
    const newEmployments = employments.filter((e) => e.id !== idToDelete);
    setEmploymentsLocalStorage(newEmployments);
    setEmployments(newEmployments);
  };

  const updateEmployment = (updatedEmployment: Employment) => {
    const newEmployments = employments.map((employment) =>
      employment.id === updatedEmployment.id ? updatedEmployment : employment
    );
    setEmploymentsLocalStorage(newEmployments);
    setEmployments(newEmployments);
  };

  return { addEmployment, deleteEmployment, updateEmployment, employments };
}
