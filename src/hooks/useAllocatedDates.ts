import { useEffect, useState } from "react";
import {
  getAllAllocatedDatesFromLocalStorage,
  setAllocatedDatesLocalStorage,
} from "../utils/LocalStorage";
import { addDates, removeDates } from "../utils/DateUtilities";

export function useAllAllocatedDates(parentId: string, childId: string) {
  const [allAllocatedDatesMap, setAllAllocatedDatesMap] = useState<
    Record<string, Record<string, MyAllocatedDate[]>>
  >({});

  useEffect(() => {
    setAllAllocatedDatesMap(getAllAllocatedDatesFromLocalStorage());
  }, []);

  const addAllocatedDates = (
    parentId: string,
    childId: string,
    dates: MyDate[],
    leave: number,
    payment: number
  ) => {
    if (allAllocatedDatesMap !== null) {
      if (!allAllocatedDatesMap?.[childId]) {
        allAllocatedDatesMap[childId] = { [parentId]: [] };
      } else if (!allAllocatedDatesMap[childId]?.[parentId]) {
        allAllocatedDatesMap[childId][parentId] = [];
      }

      const existingAllocatedDates: MyDate[] = [
        ...allAllocatedDatesMap?.[childId]?.[parentId],
      ];
      const updatedAllocatedDates: MyAllocatedDate[] = addDates(
        dates,
        existingAllocatedDates
      ).map((date) => ({ pace: leave, payment, ...date }));
      setAllocatedDatesLocalStorage(updatedAllocatedDates, childId, parentId);
      setAllAllocatedDatesMap(getAllAllocatedDatesFromLocalStorage());
    }
  };

  const removeAllocatedDates = (
    parentId: string,
    childId: string,
    dates: MyDate[]
  ) => {
    if (allAllocatedDatesMap !== null) {
      const existingAllocatedDates: MyDate[] = [
        ...allAllocatedDatesMap?.[childId]?.[parentId],
      ];
      const updatedAllocatedDates: MyAllocatedDate[] = removeDates(
        dates,
        existingAllocatedDates
      ) as MyAllocatedDate[];
      setAllocatedDatesLocalStorage(updatedAllocatedDates, childId, parentId);
      setAllAllocatedDatesMap(getAllAllocatedDatesFromLocalStorage());
    }
  };

  const allocatedDates = allAllocatedDatesMap?.[childId]?.[parentId] || [];
  return {
    allocatedDates,
    addAllocatedDates,
    removeAllocatedDates,
  };
}
