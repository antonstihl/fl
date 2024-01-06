import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useParent } from "../utils/ParentContext";
import Button from "../components/Button";
import Calendar from "../components/Calendar";
import Card from "../components/Card";
import SegmentedControl, { Option } from "../components/SegmentedControl";
import SelectedDatesList from "../components/SelectedDatesList";
import { addDates, convertToDate, removeDates } from "../utils/DateUtilities";
import {
  getAllocatedDatesFromLocalStorage,
  setAllocatedDatesLocalStorage,
} from "../utils/LocalStorage";

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

const CHILDREN: Child[] = [
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

type Level = "Sjukpenning" | "Lägstanivå";

function CalendarPage() {
  const [selectedDates, setSelectedDates] = useState<MyDate[]>([]);
  const [allocatedDates, setAllocatedDates] = useState<MyAllocatedDate[]>([]);
  const [leave, setLeave] = useState<number>(1);
  const [payment, setPayment] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [childId, setChildId] = useState(
    searchParams.get("child") || CHILDREN[0].id
  );
  const parent = useParent();
  const [level, setLevel] = useState<Level>("Sjukpenning");
  console.log({ parent });
  console.log({ allocatedDates });

  useEffect(() => {
    setAllocatedDates(getAllocatedDatesFromLocalStorage(childId, parent.id));
  }, [childId, parent]);

  const updateSelectedDates = (dates: MyDate[]) => {
    setSelectedDates(dates);
    localStorage.setItem("selectedDates", JSON.stringify(dates));
  };

  const clearSelectedDates = () => {
    updateSelectedDates([]);
  };

  const addSelectedDates = () => {
    console.log(allocatedDates.length, { childId });
    const updatedDates: MyDate[] = [...allocatedDates];
    const updatedAllocatedDates: MyAllocatedDate[] = addDates(
      selectedDates,
      updatedDates
    ).map((date) => ({ pace: leave, payment, ...date }));
    console.log(updatedAllocatedDates.length, { childId });
    setAllocatedDatesLocalStorage(updatedAllocatedDates, childId, parent.id);
    updateSelectedDates([]);
    setAllocatedDates(getAllocatedDatesFromLocalStorage(childId, parent.id));
  };

  const removeSelectedDates = () => {
    const updatedDates: MyAllocatedDate[] = [...allocatedDates];
    const updatedAllocatedDates: MyAllocatedDate[] = removeDates(
      selectedDates,
      updatedDates
    ) as MyAllocatedDate[];
    setAllocatedDatesLocalStorage(updatedAllocatedDates, childId, parent.id);
    updateSelectedDates([]);
    setAllocatedDates(getAllocatedDatesFromLocalStorage(childId, parent.id));
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

  const updateChildId = (childId: string) => {
    setChildId(childId);
    searchParams.set("child", childId);
    setSearchParams(searchParams);
  };

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day >= 1 && day <= 5;
  };

  const diffYearsFloor = (d1: Date, d2: Date) => {
    const timeDiff = Math.abs(d1.getTime() - d2.getTime());
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
  };

  const daysWithPayment = allocatedDates
    .map((ad) => ad.payment)
    .reduce((acc, current) => {
      return acc + current;
    }, 0);
  const allocatedWeekdayDates = allocatedDates.filter((ad) =>
    isWeekday(convertToDate(ad))
  );
  const weekdaysWithLeave = allocatedWeekdayDates
    .map((ad) => ad.pace)
    .reduce((acc, current) => {
      return acc + current;
    }, 0);
  const daysWithLeave = allocatedDates
    .map((ad) => ad.pace)
    .reduce((acc, current) => {
      return acc + current;
    }, 0);

  return (
    <div className="m-4 flex flex-col justify-start gap-2 w-full">
      <div className="flex items-start gap-4 w-1/2">
        <div className="flex flex-col items-start gap-4">
          <Card width="w-full">
            <select
              onChange={(e) => updateChildId(e.target.value)}
              className="rounded-md p-2 w-full"
              name="child"
              value={childId}
            >
              {CHILDREN.map((c) => (
                <option value={c.id} key={c.id}>{`${c.name} (${diffYearsFloor(
                  new Date(),
                  convertToDate(c.dateOfBirth)
                )} år)`}</option>
              ))}
            </select>
          </Card>
          <Card>
            <Calendar
              selectedDates={selectedDates}
              setSelectedDates={updateSelectedDates}
              allocatedDates={allocatedDates}
            />
          </Card>
        
        </div>
        <div className="flex flex-col gap-4">
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
                  <p>Nivå</p>
                  <SegmentedControl
                    optionValue={level}
                    setOptionValue={(s) => setLevel(s)}
                    options={[
                      { label: "Sjukpenning", value: "Sjukpenning" },
                      { label: "Lägstanivå", value: "Lägstanivå" },
                    ]}
                  />
                </div>
                <div className="flex justify-end gap-2">
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
    </div>
  );
}

export default CalendarPage;
