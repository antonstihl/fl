import { getDay } from "date-fns";
import { useEffect, useState } from "react";
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

const PARENTS: Parent[] = [
  {
    id: "1",
    name: "Simon",
  },
  {
    id: "2",
    name: "Anna",
  },
];

function CalendarPage() {
  const [selectedDates, setSelectedDates] = useState<MyDate[]>([]);
  const [allocatedDates, setAllocatedDates] = useState<MyAllocatedDate[]>([]);
  const [leave, setLeave] = useState<number>(1);
  const [payment, setPayment] = useState<number>(1);
  const [childId, setChildId] = useState(CHILDREN[0].id);
  const [parentId, setParentId] = useState(PARENTS[0].id);

  useEffect(() => {
    setAllocatedDates(getAllocatedDatesFromLocalStorage(childId, parentId));
  }, [childId, parentId]);

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
    setAllocatedDatesLocalStorage(updatedAllocatedDates, childId, parentId);
    updateSelectedDates([]);
    setAllocatedDates(getAllocatedDatesFromLocalStorage(childId, parentId));
  };

  const removeSelectedDates = () => {
    const updatedDates: MyAllocatedDate[] = [...allocatedDates];
    const updatedAllocatedDates: MyAllocatedDate[] = removeDates(
      selectedDates,
      updatedDates
    ) as MyAllocatedDate[];
    setAllocatedDatesLocalStorage(updatedAllocatedDates, childId, parentId);
    updateSelectedDates([]);
    setAllocatedDates(getAllocatedDatesFromLocalStorage(childId, parentId));
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

  const isWeekday = (date: Date) => {
    const day = getDay(date);
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
    <div className="m-4 flex flex-col justify-start gap-2">
      <div className="flex items-start gap-4 w-1/2">
        <div className="flex flex-col items-start gap-4">
          <Card width="w-full">
            <div className="flex items-center gap-4">
              <select
                onChange={(e) => setChildId(e.target.value)}
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
            </div>
          </Card>
          <Card>
            <Calendar
              selectedDates={selectedDates}
              setSelectedDates={updateSelectedDates}
              allocatedDates={allocatedDates}
            />
          </Card>
          <div className="flex gap-2 w-full">
            <Card width="w-1/2">
              <div className="ml-2 flex flex-col">
                <p>
                  <b>{daysWithLeave} dagar</b> föräldraledighet
                </p>
                <p>
                  (<b>{weekdaysWithLeave}</b> vardagar)
                </p>
              </div>
              {/* <div className="translate-x-1 translate-y-0 w-0 h-0 border-l-[15px] border-l-transparent border-b-[15px] border-b-black border-r-[15px] border-r-transparent" /> */}
              <div className="ml-2 mt-1 mb-2 border-transparent shadow-sm shadow-black py-1 px-2 w-max rounded-md grid grid-cols-2 gap-x-2">
                <p>{allocatedDates.filter((ad) => ad.pace === 1).length}</p>
                <p>100%</p>
                <p>{allocatedDates.filter((ad) => ad.pace === 0.75).length}</p>
                <p>75%</p>
                <p>{allocatedDates.filter((ad) => ad.pace === 0.5).length}</p>
                <p>50%</p>
                <p>{allocatedDates.filter((ad) => ad.pace === 0.25).length}</p>
                <p>25%</p>
              </div>
            </Card>
            <Card width="w-1/2">
              <div>
                <div className="ml-2 flex flex-col">
                  <p>
                    <b>{daysWithPayment} dagar</b> med föräldrapenning
                  </p>
                  <p>
                    ({`${((daysWithPayment / 480) * 100).toPrecision(2)}% av `}
                    <span
                      className="text-blue-700 font-bold cursor-default"
                      title="390 sjukpenningnivå + 90 lågkostnadsdagar"
                    >
                      480 st
                    </span>
                    )
                  </p>
                </div>
              </div>

              {/* <div className="translate-x-1 translate-y-0 w-0 h-0 border-l-[15px] border-l-transparent border-b-[15px] border-b-black border-r-[15px] border-r-transparent" /> */}
              <div className="ml-2 mt-1 mb-2 border-transparent shadow-sm shadow-black py-1 px-2 w-max rounded-md grid grid-cols-2 gap-x-2">
                <p>{allocatedDates.filter((ad) => ad.payment === 1).length}</p>
                <p>100%</p>
                <p>
                  {allocatedDates.filter((ad) => ad.payment === 0.75).length}
                </p>
                <p>75%</p>
                <p>
                  {allocatedDates.filter((ad) => ad.payment === 0.5).length}
                </p>
                <p>50%</p>
                <p>
                  {allocatedDates.filter((ad) => ad.payment === 0.25).length}
                </p>
                <p>25%</p>
                <p>{allocatedDates.filter((ad) => ad.payment === 0).length}</p>
                <p>0%</p>
              </div>
            </Card>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Card width="w-full">
            <div className="flex items-center gap-4">
              <select
                onChange={(e) => setParentId(e.target.value)}
                className="rounded-md p-2 w-full"
                name="parent"
                value={parentId}
              >
                {PARENTS.map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
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
