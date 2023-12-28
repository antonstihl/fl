import { MyDate } from "./DateUtilities";

export function getSelectedDatesFromLocalStorage(): MyDate[] {
  const localStorageData = localStorage.getItem("selectedDates");
  if (localStorageData === null) {
    return [];
  }
  let selectedDatesFromLocalStorage;
  try {
    selectedDatesFromLocalStorage = JSON.parse(localStorageData);
  } catch (e) {
    return [];
  }
  if (Array.isArray(selectedDatesFromLocalStorage)) {
    selectedDatesFromLocalStorage;
  }
  return [];
}

export function setSelectedDatesLocalStorage(dates: MyDate[]) {
  localStorage.setItem("selectedDates", JSON.stringify(dates));
}

export function getAllocatedDatesFromLocalStorage(): MyDate[] {
  const localStorageData = localStorage.getItem("allocatedDates");
  if (localStorageData === null) {
    return [];
  }
  let allocatedDatesFromLocalStorage;
  try {
    allocatedDatesFromLocalStorage = JSON.parse(localStorageData);
  } catch (e) {
    return [];
  }
  if (Array.isArray(allocatedDatesFromLocalStorage)) {
    return allocatedDatesFromLocalStorage;
  }
  return [];
}

export function setAllocatedDatesLocalStorage(dates: MyDate[]) {
  localStorage.setItem("allocatedDates", JSON.stringify(dates));
}
