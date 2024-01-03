import { useEffect, useState } from "react";
import Button from "../components/Button";
import Calendar from "../components/Calendar";
import Card from "../components/Card";
import SelectedDatesList from "../components/SelectedDatesList";
import { addDates, convertToDate, removeDates } from "../utils/DateUtilities";
import {
  getAllocatedDatesFromLocalStorage,
  getSelectedDatesFromLocalStorage,
  setAllocatedDatesLocalStorage,
} from "../utils/LocalStorageUtil";
import SegmentedControl, { Option } from "../components/SegmentedControl";

const leaveOptions: Option[] = [
  { label: "100%", value: 1 },
  { label: "75%", value: 0.75 },
  { label: "50%", value: 0.5 },
  { label: "25%", value: 0.25 },
];

const paymentOptions: Option[] = [
  { label: "100%", value: 1 },
  { label: "75%", value: 0.75 },
  { label: "50%", value: 0.5 },
  { label: "25%", value: 0.25 },
  { label: "0%", value: 0 },
];

const children: Child[] = [
  {
    id: "1",
    name: "Alfred",
    dateOfBirth: { year: 2020, month: 3, date: 14 },
  },
  {
    id: "2",
    name: "Alma",
    dateOfBirth: { year: 2023, month: 2, date: 30 },
  },
];

function CalendarPage() {
  const [selectedDates, setSelectedDates] = useState<MyDate[]>([]);
  const [allocatedDates, setAllocatedDates] = useState<MyAllocatedDate[]>([]);
  const [leave, setLeave] = useState<number>(1);
  const [payment, setPayment] = useState<number>(1);
  const [child, setChild] = useState<Child>(children[0]);

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

  const diffYearsFloor = (d1: Date, d2: Date) => {
    const timeDiff = Math.abs(d1.getTime() - d2.getTime());
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
  };

  return (
    <div className="m-4 flex flex-col justify-start gap-2">
      {/* <Card>
        <div className="flex items-center gap-4">
          <select className="rounded-md p-2" name="child">
            {children.map((c) => (
              <option key={c.id}>{`${c.name} (${diffYearsFloor(
                new Date(),
                convertToDate(c.dateOfBirth)
              )} år)`}</option>
            ))}
          </select>
        </div>
      </Card> */}
      <div className="flex items-start gap-4">
        <Card>
          <Calendar
            selectedDates={selectedDates}
            setSelectedDates={updateSelectedDates}
            allocatedDates={allocatedDates}
          />
        </Card>
        <Card>
          <div className="flex flex-col items-center w-max">
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
                <SegmentedControl
                  optionValue={leave}
                  setOptionValue={updateLeave}
                  options={leaveOptions}
                />
                <p>Föräldrapenning</p>
                <SegmentedControl
                  optionValue={payment}
                  setOptionValue={updatePayment}
                  options={paymentOptions}
                />
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
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CalendarPage;
