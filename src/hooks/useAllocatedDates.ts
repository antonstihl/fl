import { useEffect, useState } from "react";
import { myDatesEqual } from "../utils/DateUtilities";
import {
  getAllAllocatedDatesFromLocalStorage,
  setAllocatedDatesLocalStorage,
} from "../utils/LocalStorage";
import { MyAllocatedDate, MyDate } from "../types/types";

export function useAllAllocatedDates() {
  const [allAllocatedDates, setAllocatedDates] = useState<MyAllocatedDate[]>(
    []
  );

  useEffect(() => {
    setAllocatedDates(getAllAllocatedDatesFromLocalStorage());
  }, []);

  const addAllocatedDates = (
    parentId: string,
    childId: string,
    dates: MyDate[],
    leave: number,
    payment: number
  ) => {
    const prunedAllocatedDates = allAllocatedDates.filter(
      (d) =>
        !(d.childId === childId && d.parentId === parentId) ||
        dates.findIndex((nd) => myDatesEqual(nd, d as MyDate)) === -1
    );
    const newAllocatedDates = [...prunedAllocatedDates];
    const allocatedDatesToAdd: MyAllocatedDate[] = dates.map((d) => ({
      ...d,
      pace: leave,
      payment,
      parentId,
      childId,
    }));
    newAllocatedDates.push(...allocatedDatesToAdd);
    setAllocatedDatesLocalStorage(newAllocatedDates);
    setAllocatedDates(newAllocatedDates);
  };

  const removeAllocatedDates = (
    parentId: string,
    childId: string,
    dates: MyDate[]
  ) => {
    const prunedAllocatedDates = allAllocatedDates.filter(
      (d) =>
        !(d.childId === childId && d.parentId === parentId) ||
        dates.findIndex((nd) => myDatesEqual(nd, d as MyDate)) === -1
    );
    setAllocatedDatesLocalStorage(prunedAllocatedDates);
    setAllocatedDates(prunedAllocatedDates);
  };

  return {
    allAllocatedDates,
    addAllocatedDates,
    removeAllocatedDates,
  };
}
