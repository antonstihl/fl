import {
  getAllAllocatedDatesFromLocalStorage
} from "./LocalStorage";

export function useLeaves() {
  return getAllAllocatedDatesFromLocalStorage();
}
