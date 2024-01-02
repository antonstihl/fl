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
import Card from "../components/Card";
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
    <div className="m-2">
      <div className="flex items-start gap-4">
        <Card>
          <Calendar
            selectedDates={selectedDates}
            setSelectedDates={updateSelectedDates}
            allocatedDates={allocatedDates}
          />
        </Card>
        <Card>
          <div className="flex flex-col gap-3">
            <div className="flex justify-end">
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
        </Card>
        <Card>
          <DateButton
            date={convertToMyDate(new Date())}
            selected={false}
            leaves={[{ pace: 1, payment: 0 }]}
            today={false}
            activeMonth={true}
            toggleSelectedDate={() => {}}
          />
          <DateButton
            date={convertToMyDate(new Date())}
            selected={false}
            leaves={[{ pace: 1, payment: 0 }]}
            today={false}
            activeMonth={true}
            toggleSelectedDate={() => {}}
          />
          <DateButton
            date={convertToMyDate(new Date())}
            selected={false}
            leaves={[{ pace: 1, payment: 0.5 }]}
            today={false}
            activeMonth={true}
            toggleSelectedDate={() => {}}
          />
          <DateButton
            date={convertToMyDate(new Date())}
            selected={false}
            leaves={[
              { pace: 1, payment: 1 },
              { pace: 0.5, payment: 1 },
            ]}
            today={false}
            activeMonth={true}
            toggleSelectedDate={() => {}}
          />
          <DateButton
            date={convertToMyDate(new Date())}
            selected={false}
            leaves={[
              { pace: 1, payment: 0.75 },
              { pace: 0.5, payment: 0.5 },
            ]}
            today={false}
            activeMonth={true}
            toggleSelectedDate={() => {}}
          />
        </Card>
      </div>
    </div>
  );
}

export default CalendarPage;
