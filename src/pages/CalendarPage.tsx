import { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import SelectedDatesList from "../components/SelectedDatesList";
import { MyDate, addDates, removeDates } from "../utils/DateUtilities";
import {
  getAllocatedDatesFromLocalStorage,
  getSelectedDatesFromLocalStorage,
  setAllocatedDatesLocalStorage,
} from "../utils/LocalStorageUtil";
function CalendarPage() {
  const [selectedDates, setSelectedDates] = useState<MyDate[]>([]);
  const [allocatedDates, setAllocatedDates] = useState<MyDate[]>([]);

  useEffect(() => {
    setSelectedDates(getSelectedDatesFromLocalStorage());
  }, []);

  useEffect(() => {
    setAllocatedDates(getAllocatedDatesFromLocalStorage());
  }, []);

  const updateSelectedDates = (dates: MyDate[]) => {
    setSelectedDates(dates);
    localStorage.setItem("selectedDates", JSON.stringify(dates));
  };

  const clearSelectedDates = () => {
    updateSelectedDates([]);
  };

  const addSelectedDates = () => {
    let updatedAllocatedDates: MyDate[] = [...allocatedDates];
    updatedAllocatedDates = addDates(selectedDates, allocatedDates);
    setAllocatedDatesLocalStorage(updatedAllocatedDates);
    updateSelectedDates([]);
    setAllocatedDates(getAllocatedDatesFromLocalStorage());
  };

  const removeSelectedDates = () => {
    let updatedAllocatedDates: MyDate[] = [...allocatedDates];
    updatedAllocatedDates = removeDates(selectedDates, allocatedDates);
    console.log("remove");
    setAllocatedDatesLocalStorage(updatedAllocatedDates);
    updateSelectedDates([]);
    setAllocatedDates(getAllocatedDatesFromLocalStorage());
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
          <div className="flex flex-col border-transparent shadow-sm shadow-black rounded-md p-2">
            <div className="flex justify-start">
              <button
                className="rounded-md m-2 px-2 py-1 bg-blue-300 hover:bg-blue-400 shadow-sm shadow-black"
                onClick={clearSelectedDates}
              >
                Avmarkera alla
              </button>
            </div>
            <SelectedDatesList
              selectedDates={selectedDates}
              setSelectedDates={updateSelectedDates}
            />
            <div className="flex justify-end gap-2 m-3">
              <button
                onClick={addSelectedDates}
                className={`bg-green-300 rounded-md px-2 py-1 hover:bg-green-400 shadow-sm shadow-black flex items-center justify-center ${
                  selectedDates.length === 0 ? "cursor-not-allowed" : ""
                }`}
              >
                100%
              </button>
              <button
                onClick={removeSelectedDates}
                className={`bg-red-300 rounded-md px-2 py-1 hover:bg-red-400 shadow-sm shadow-black flex items-center justify-center ${
                  selectedDates.length === 0 ? "cursor-not-allowed" : ""
                }`}
              >
                Återställ
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="pl-4">
        <DateButton
          date={convertToMyDate(new Date())}
          selected={true}
          allocated={false}
          today={false}
          activeMonth={true}
          toggleSelectedDate={() => {}}
        />
      </div> */}
    </>
  );
}

export default CalendarPage;
