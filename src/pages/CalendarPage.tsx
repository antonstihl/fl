import { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import SelectedDatesList from "../components/SelectedDatesList";
import { MyDate, convertToMyDate, pushDates } from "../utils/DateUtilities";
import {
  getAllocatedDatesFromLocalStorage,
  getSelectedDatesFromLocalStorage,
  setAllocatedDatesLocalStorage,
} from "../utils/LocalStorageUtil";
import DateButton from "../components/DateButton";

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

  const saveSelectedDates = () => {
    setAllocatedDatesLocalStorage(
      pushDates(selectedDates, getAllocatedDatesFromLocalStorage())
    );
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
