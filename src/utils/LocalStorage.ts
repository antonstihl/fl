export function getAllocatedDatesFromLocalStorage(
  childId: string,
  parentId: string
): MyAllocatedDate[] {
  const localStorageData = localStorage.getItem("allocatedDates") || "{}";
  let allocatedDatesFromLocalStorage;
  try {
    allocatedDatesFromLocalStorage =
      JSON.parse(localStorageData)[childId][parentId];
  } catch (e) {
    return [];
  }
  if (Array.isArray(allocatedDatesFromLocalStorage)) {
    return allocatedDatesFromLocalStorage;
  }
  return [];
}

export function getAllAllocatedDatesFromLocalStorage(): Record<
  string,
  Record<string, MyAllocatedDate[]>
> {
  const localStorageData = localStorage.getItem("allocatedDates") || "{}";
  let allocatedDatesFromLocalStorage;
  try {
    return (allocatedDatesFromLocalStorage = JSON.parse(localStorageData));
  } catch (e) {
    return {};
  }
  return {};
}

export function setAllocatedDatesLocalStorage(
  dates: MyAllocatedDate[],
  childId: string,
  parentId: string
) {
  let existingAllocatedDates = JSON.parse(
    localStorage.getItem("allocatedDates") || "[]"
  );

  existingAllocatedDates = {
    ...existingAllocatedDates,
    [childId]: { ...existingAllocatedDates[childId], [parentId]: dates },
  };

  localStorage.setItem(
    "allocatedDates",
    JSON.stringify(existingAllocatedDates)
  );
}
