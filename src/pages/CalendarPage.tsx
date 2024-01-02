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
            <div className="flex flex-col items-en gap-2">
              <div className="flex justify-center gap-2">
                <Button
                  variant="secondary"
                  onClick={addSelectedDates}
                  disabled={selectedDates.length === 0}
                >
                  100% m. FP
                </Button>
                <Button
                  variant="secondary"
                  onClick={addSelectedDates}
                  disabled={selectedDates.length === 0}
                >
                  75%
                </Button>
                <Button
                  variant="secondary"
                  onClick={addSelectedDates}
                  disabled={selectedDates.length === 0}
                >
                  50%
                </Button>
                <Button
                  variant="secondary"
                  onClick={addSelectedDates}
                  disabled={selectedDates.length === 0}
                >
                  25%
                </Button>
              </div>
              <div className="flex justify-center gap-0">
                <button
                  className={`rounded-l-md py-1 px-2 shadow-sm shadow-black ${
                    true
                      ? "bg-green-700 text-white"
                      : "bg-white border-2 border-green-700"
                  }`}
                  onClick={addSelectedDates}
                >
                  100%
                </button>
                <button
                  className={`rounded-r-md py-1 px-2 shadow-sm shadow-black ${
                    false
                      ? "bg-green-700 text-white"
                      : "bg-white border-2 border-green-700"
                  }`}
                  onClick={addSelectedDates}
                >
                  50%
                </button>
              </div>
              <Button variant="primary" onClick={addSelectedDates}>
                Lägg till
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
              { pace: 0.5, payment: 0.25 },
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
