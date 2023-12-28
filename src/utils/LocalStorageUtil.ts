export function getSelectedDatesFromLocalStorage(): Date[] {
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
    return selectedDatesFromLocalStorage.map((sds) => new Date(sds));
  }
  return [];
}

export function setSelectedDatesLocalStorage(dates: Date[]) {
  localStorage.setItem("selectedDates", JSON.stringify(dates));
}

export function getAllocatedDatesFromLocalStorage(): Date[] {
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
    return allocatedDatesFromLocalStorage.map((sds) => new Date(sds));
  }
  return [];
}

export function setAllocatedDatesLocalStorage(dates: Date[]) {
  localStorage.setItem("allocatedDates", JSON.stringify(dates));
}
