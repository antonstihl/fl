import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Calendar from "../components/Calendar";
import Card from "../components/Card";
import ConfirmModal from "../components/ConfirmModal";
import SegmentedControl, { Option } from "../components/SegmentedControl";
import SelectedDatesList from "../components/SelectedDatesList";
import { useChild, useChildUpdate, useChildren } from "../context/ChildContext";
import { useParent } from "../context/ParentContext";
import { useAllAllocatedDates } from "../hooks/useAllocatedDates";
import { convertToDate } from "../utils/DateUtilities";

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

type Level = "Sjukpenning" | "Lägstanivå";

function CalendarPage() {
  const [selectedDates, setSelectedDates] = useState<MyDate[]>([]);
  const [leave, setLeave] = useState<number>(1);
  const [payment, setPayment] = useState<number>(1);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const child = useChild();
  const children = useChildren();
  const childId = child ? child.id : undefined;
  const setChildId = useChildUpdate();
  const parent = useParent();
  const { allAllocatedDates, addAllocatedDates, removeAllocatedDates } =
    useAllAllocatedDates();
  const allocatedDates =
    childId && parent?.id
      ? allAllocatedDates.filter(
          (ad) => ad.childId === childId && ad.parentId === parent.id
        )
      : [];

  const [level, setLevel] = useState<Level>("Sjukpenning");

  useEffect(() => {
    const selectedDates = JSON.parse(
      localStorage.getItem("selectedDates") || "[]"
    );
    if (Array.isArray(selectedDates)) {
      setSelectedDates(selectedDates);
    }
  }, []);

  const updateSelectedDates = (dates: MyDate[]) => {
    localStorage.setItem("selectedDates", JSON.stringify(dates));
    setSelectedDates(dates);
  };

  const clearSelectedDates = () => {
    updateSelectedDates([]);
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

  // const isWeekday = (date: Date) => {
  //   const day = date.getDay();
  //   return day >= 1 && day <= 5;
  // };

  const diffYearsFloor = (d1: Date, d2: Date) => {
    const timeDiff = Math.abs(d1.getTime() - d2.getTime());
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
  };

  const handleSave = () => {
    if (childId && parent && selectedDates.length > 0) {
      clearSelectedDates();
      addAllocatedDates(parent.id, childId, selectedDates, leave, payment);
    }
  };

  const handleClickDelete = () => {
    if (selectedDates.length > 0) {
      setIsRemoveModalOpen(true);
    }
  };

  const handleDelete = () => {
    if (childId && parent) {
      removeAllocatedDates(parent.id, childId, selectedDates);
      clearSelectedDates();
      setIsRemoveModalOpen(false);
    }
  };

  // const daysWithPayment = allocatedDates
  //   .map((ad) => ad.payment)
  //   .reduce((acc, current) => {
  //     return acc + current;
  //   }, 0);
  // const allocatedWeekdayDates = allocatedDates.filter((ad) =>
  //   isWeekday(convertToDate(ad))
  // );
  // const weekdaysWithLeave = allocatedWeekdayDates
  //   .map((ad) => ad.pace)
  //   .reduce((acc, current) => {
  //     return acc + current;
  //   }, 0);
  // const daysWithLeave = allocatedDates
  //   .map((ad) => ad.pace)
  //   .reduce((acc, current) => {
  //     return acc + current;
  //   }, 0);

  return (
    <>
      {isRemoveModalOpen && (
        <ConfirmModal
          text="Vill du verkligen rensa föräldraledighet för valda datum?"
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="primary" onClick={handleDelete}>
                Rensa
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsRemoveModalOpen(false)}
              >
                Avbryt
              </Button>
            </div>
          }
        />
      )}
      <div className="flex justify-center w-full gap-4 m-4">
        <div className="flex flex-col gap-4">
          {(children.length === 0 || !parent) && (
            <Card>
              Både barn och föräldrar krävs för kalendern. Konfigurera på{" "}
              <Link to="/family" className="font-bold text-blue-700">
                familjsidan.
              </Link>
            </Card>
          )}
          {child && (
            <Card width="w-full">
              <select
                onChange={(e) => setChildId(e.target.value)}
                className="rounded-md p-2 w-full"
                name="child"
                value={childId}
              >
                {children.map((c) => (
                  <option value={c.id} key={c.id}>{`${c.name} (${
                    c.dateOfBirth
                      ? diffYearsFloor(new Date(), convertToDate(c.dateOfBirth))
                      : "?"
                  } år, ${
                    c.dateOfBirth &&
                    c.dateOfBirth?.year +
                      "-" +
                      c.dateOfBirth.month.toString().padStart(2, "0") +
                      "-" +
                      c.dateOfBirth.date.toString().padStart(2, "0")
                  })`}</option>
                ))}
              </select>
            </Card>
          )}
          {child && (
            <Card>
              <Calendar
                selectedDates={selectedDates}
                setSelectedDates={updateSelectedDates}
                allocatedDates={allocatedDates}
                allAllocatedDates={allAllocatedDates}
                parentId={parent?.id}
                childId={childId}
              />
            </Card>
          )}
          {child && (
            <div className="flex flex-col gap-4">
              {!parent ? (
                <Card>
                  Ingen förälder tillagd. Konfigurera på{" "}
                  <Link to="/family" className="font-bold text-blue-700">
                    familjsidan.
                  </Link>
                </Card>
              ) : (
                <Card width="w-full">
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
                      <Button variant="primary" onClick={handleSave}>
                        Spara
                      </Button>
                      <Button variant="delete" onClick={handleClickDelete}>
                        Rensa
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CalendarPage;
