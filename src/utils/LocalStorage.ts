export function getAllAllocatedDatesFromLocalStorage(): MyAllocatedDate[] {
  const localStorageData = localStorage.getItem("allocatedDates") || "[]";
  try {
    return JSON.parse(localStorageData);
  } catch (e) {
    return [];
  }
}

export function setAllocatedDatesLocalStorage(
  allocatedDates: MyAllocatedDate[]
) {
  localStorage.setItem("allocatedDates", JSON.stringify(allocatedDates));
}
