import { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import SelectedDatesList from "../components/SelectedDatesList";
import {
  getAllocatedDatesFromLocalStorage,
  getSelectedDatesFromLocalStorage,
} from "../utils/LocalStorageUtil";

function CalendarPage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [allocatedDates, setAllocatedDates] = useState<Date[]>([]);

  useEffect(() => {
    setSelectedDates(getSelectedDatesFromLocalStorage());
  }, []);

  useEffect(() => {
    setAllocatedDates(getAllocatedDatesFromLocalStorage());
  }, []);

  const updateSelectedDates = (dates: Date[]) => {
    setSelectedDates(dates);
    localStorage.setItem("selectedDates", JSON.stringify(dates));
  };

  const clearSelectedDates = () => {
    updateSelectedDates([]);
  };

  const saveSelectedDates = () => {
    updateSelectedDates([]);
    alert("Aaaand its gone...");
  };

  return (
    <>
      <div className="p-4">
        <div className="flex items-start gap-4">
          <Calendar
            selectedDates={selectedDates}
            setSelectedDates={updateSelectedDates}
            allocatedDates={allocatedDates}
          />
          <div className="flex flex-col border-black border-2">
            <div className="flex justify-end m-2">
              <button
                className="border-black rounded-md border-2 px-1"
                onClick={clearSelectedDates}
              >
                Rensa
              </button>
            </div>
            <SelectedDatesList
              selectedDates={selectedDates}
              setSelectedDates={updateSelectedDates}
              saveDates={saveSelectedDates}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarPage;
