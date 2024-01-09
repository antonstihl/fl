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

export function getSalariesFromLocalStorage(): Salary[] {
  const localStorageData = localStorage.getItem("salaries") || "[]";
  try {
    return JSON.parse(localStorageData);
  } catch (e) {
    return [];
  }
}

export function setSalariesLocalStorage(salaries: Salary[]) {
  localStorage.setItem("salaries", JSON.stringify(salaries));
}
