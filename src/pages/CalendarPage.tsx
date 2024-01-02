import { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import SelectedDatesList from "../components/SelectedDatesList";
import {
  MyDate,
  addDates,
  convertToMyDate,
  removeDates,
} from "../utils/DateUtilities";
import {
  getAllocatedDatesFromLocalStorage,
  getSelectedDatesFromLocalStorage,
  setAllocatedDatesLocalStorage,
} from "../utils/LocalStorageUtil";
import DateButton from "../components/DateButton";
import Button from "../components/Button";
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
          <div className="flex flex-col gap-2 border-transparent shadow-sm shadow-black rounded-md px-3 py-4">
            <div className="flex justify-start">
              <Button onClick={clearSelectedDates}>Avmarkera alla</Button>
            </div>
            <SelectedDatesList
              selectedDates={selectedDates}
              setSelectedDates={updateSelectedDates}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="primary"
                onClick={addSelectedDates}
                disabled={selectedDates.length === 0}
              >
                100%
              </Button>
              <Button onClick={removeSelectedDates}>Ta bort</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-4">
        <DateButton
          date={convertToMyDate(new Date())}
          selected={false}
          allocated={1}
          today={false}
          activeMonth={true}
          toggleSelectedDate={() => {}}
        />{" "}
        <DateButton
          date={convertToMyDate(new Date())}
          selected={false}
          allocated={0}
          today={false}
          activeMonth={true}
          toggleSelectedDate={() => {}}
        />{" "}
        <DateButton
          date={convertToMyDate(new Date())}
          selected={false}
          allocated={0.75}
          today={false}
          activeMonth={true}
          toggleSelectedDate={() => {}}
        />
        <DateButton
          date={convertToMyDate(new Date())}
          selected={false}
          allocated={0.5}
          today={false}
          activeMonth={true}
          toggleSelectedDate={() => {}}
        />
        <DateButton
          date={convertToMyDate(new Date())}
          selected={false}
          allocated={0.25}
          today={false}
          activeMonth={true}
          toggleSelectedDate={() => {}}
        />
      </div>
    </>
  );
}

export default CalendarPage;
