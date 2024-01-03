import { useEffect, useState } from "react";
import Button from "../components/Button";
import Calendar from "../components/Calendar";
import Card from "../components/Card";
import SelectedDatesList from "../components/SelectedDatesList";
import { addDates, removeDates } from "../utils/DateUtilities";
import {
  getAllocatedDatesFromLocalStorage,
  getSelectedDatesFromLocalStorage,
  setAllocatedDatesLocalStorage,
} from "../utils/LocalStorageUtil";
function CalendarPage() {
  const [selectedDates, setSelectedDates] = useState<MyDate[]>([]);
  const [allocatedDates, setAllocatedDates] = useState<MyAllocatedDate[]>([]);
  const [leave, setLeave] = useState<number>(1);
  const [payment, setPayment] = useState<number>(1);

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
    const updatedDates: MyDate[] = [...allocatedDates];
    const updatedAllocatedDates: MyAllocatedDate[] = addDates(
      selectedDates,
      updatedDates
    ).map((date) => ({ pace: leave, payment, ...date }));
    setAllocatedDatesLocalStorage(updatedAllocatedDates);
    updateSelectedDates([]);
    setAllocatedDates(getAllocatedDatesFromLocalStorage());
  };

  const removeSelectedDates = () => {
    const updatedDates: MyAllocatedDate[] = [...allocatedDates];
    const updatedAllocatedDates: MyAllocatedDate[] = removeDates(
      selectedDates,
      updatedDates
    ) as MyAllocatedDate[];
    setAllocatedDatesLocalStorage(updatedAllocatedDates);
    updateSelectedDates([]);
    setAllocatedDates(getAllocatedDatesFromLocalStorage());
  };

  const updatePayment = (p: number) => {
    if (p > leave) {
      setLeave(p);
      setPayment(p);
    } else {
      setPayment(p);
    }
  };

  const updateLeave = (p: number) => {
    if (p < payment) {
      setLeave(p);
      setPayment(p);
    } else {
      setLeave(p);
    }
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
              <Button variant="delete" onClick={clearSelectedDates}>
                Avmarkera alla
              </Button>
            </div>
            <SelectedDatesList
              selectedDates={selectedDates}
              setSelectedDates={updateSelectedDates}
            />
            {selectedDates.length === 0 && <p>Inga datum valda.</p>}
            <div className="grid items-center grid-cols-[35%_65%] gap-2">
              <p>Ledig</p>
              <div className="flex justify-between items-center gap-4">
                <div className="flex justify-center gap-0">
                  <button
                    className={`rounded-l-md py-1 px-1 shadow-sm shadow-black ${
                      leave === 1
                        ? "bg-green-700 text-white"
                        : "bg-white border-l-2 border-y-2 border-green-700"
                    }`}
                    onClick={() => updateLeave(1)}
                  >
                    100%
                  </button>
                  <button
                    className={`py-1 px-1 shadow-sm shadow-black ${
                      leave === 0.75
                        ? "bg-green-700 text-white"
                        : "bg-white border-r-2 border-y-2 border-green-700"
                    }`}
                    onClick={() => updateLeave(0.75)}
                  >
                    75%
                  </button>
                  <button
                    className={`py-1 px-1 shadow-sm shadow-black ${
                      leave === 0.5
                        ? "bg-green-700 text-white"
                        : "bg-white border-r-2 border-y-2 border-green-700"
                    }`}
                    onClick={() => updateLeave(0.5)}
                  >
                    50%
                  </button>
                  <button
                    className={`rounded-r-md py-1 px-1 shadow-sm shadow-black ${
                      leave === 0.25
                        ? "bg-green-700 text-white"
                        : "bg-white border-r-2 border-y-2 border-green-700"
                    }`}
                    onClick={() => updateLeave(0.25)}
                  >
                    25%
                  </button>
                </div>
              </div>
              <p>Föräldrapenning</p>
              <div className="flex justify-between items-center gap-4">
                <div className="flex justify-center gap-0">
                  <button
                    className={`rounded-l-md py-1 px-1 shadow-sm shadow-black ${
                      payment === 1
                        ? "bg-green-700 text-white"
                        : "bg-white border-l-2 border-y-2 border-green-700"
                    }`}
                    onClick={() => updatePayment(1)}
                  >
                    100%
                  </button>
                  <button
                    className={`py-1 px-1 shadow-sm shadow-black ${
                      payment === 0.75
                        ? "bg-green-700 text-white"
                        : "bg-white border-r-2 border-y-2 border-green-700"
                    }`}
                    onClick={() => updatePayment(0.75)}
                  >
                    75%
                  </button>
                  <button
                    className={`py-1 px-1 shadow-sm shadow-black ${
                      payment === 0.5
                        ? "bg-green-700 text-white"
                        : "bg-white border-r-2 border-y-2 border-green-700"
                    }`}
                    onClick={() => updatePayment(0.5)}
                  >
                    50%
                  </button>
                  <button
                    className={`py-1 px-1 shadow-sm shadow-black ${
                      payment === 0.25
                        ? "bg-green-700 text-white"
                        : "bg-white border-r-2 border-y-2 border-green-700"
                    }`}
                    onClick={() => updatePayment(0.25)}
                  >
                    25%
                  </button>
                  <button
                    className={`rounded-r-md py-1 px-1 shadow-sm shadow-black ${
                      payment === 0
                        ? "bg-green-700 text-white"
                        : "bg-white border-r-2 border-y-2 border-green-700"
                    }`}
                    onClick={() => updatePayment(0)}
                  >
                    0%
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="primary" onClick={addSelectedDates}>
                Uppdatera
              </Button>
              <Button variant="delete" onClick={removeSelectedDates}>
                Ta bort
              </Button>
            </div>
          </div>
        </Card>

        {/* <Card>
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
        </Card> */}
      </div>
    </div>
  );
}

export default CalendarPage;
