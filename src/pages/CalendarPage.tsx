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
          <div className="flex flex-col border-black border-2 rounded-md">
            <div className="flex justify-start">
              <button
                className="border-black rounded-md border-2 m-2 px-1"
                onClick={clearSelectedDates}
              >
                Rensa
              </button>
            </div>
            <SelectedDatesList
              selectedDates={selectedDates}
              setSelectedDates={updateSelectedDates}
            />
            <div className="flex justify-end gap-2 m-2">
              <button
                onClick={addSelectedDates}
                className={`border-2 border-black rounded-md px-1 ${
                  selectedDates.length > 0
                    ? "bg-green-200"
                    : "bg-slate-200 cursor-not-allowed"
                }`}
              >
                100%
              </button>
              <button
                onClick={removeSelectedDates}
                className={`border-2 border-black rounded-md px-2 ${
                  selectedDates.length > 0
                    ? "bg-red-200"
                    : "bg-slate-200 cursor-not-allowed"
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
