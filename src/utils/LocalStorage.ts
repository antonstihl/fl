export function getAllocatedDatesFromLocalStorage(
  childId: string
): MyAllocatedDate[] {
  const localStorageData = localStorage.getItem("allocatedDates") || "{}";
  let allocatedDatesFromLocalStorage;
  try {
    allocatedDatesFromLocalStorage = JSON.parse(localStorageData)[childId];
  } catch (e) {
    return [];
  }
  if (Array.isArray(allocatedDatesFromLocalStorage)) {
    return allocatedDatesFromLocalStorage;
  }
  return [];
}

export function setAllocatedDatesLocalStorage(
  dates: MyAllocatedDate[],
  childId: string
) {
  let existingAllocatedDates = JSON.parse(
    localStorage.getItem("allocatedDates") || "[]"
  );

  existingAllocatedDates = { ...existingAllocatedDates, [childId]: dates };

  localStorage.setItem(
    "allocatedDates",
    JSON.stringify(existingAllocatedDates)
  );
}
