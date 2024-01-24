import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddSchedule from "../components/AddSchedule";
import Button from "../components/Button";
import Calendar from "../components/Calendar";
import Card from "../components/Card";
import ConfirmModal from "../components/ConfirmModal";
import SegmentedControl, { Option } from "../components/SegmentedControl";
import { useChild, useChildUpdate, useChildren } from "../context/ChildContext";
import { useParent } from "../context/ParentContext";
import { useAllAllocatedDates } from "../hooks/useAllocatedDates";
import { MyDate } from "../types/types";
import { convertToDate, toggleDateInArray } from "../utils/DateUtilities";
import { useLeaveDelete, useLeaves } from "../context/LeaveContext";

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

export default function () {
  const [selectedDates, setSelectedDates] = useState<MyDate[]>([]);
  const [leave, setLeave] = useState<number>(1);
  const [payment, setPayment] = useState<number>(1);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [isSelectDatesActive, setIsSelectDatesActive] = useState(false);
  const child = useChild();
  const children = useChildren();
  const childId = child ? child.id : undefined;
  const setChildId = useChildUpdate();
  const parent = useParent();
  const { allAllocatedDates, addAllocatedDates, removeAllocatedDates } =
    useAllAllocatedDates();
  const allocatedDates =
    childId && parent?.id
      ? [
          ...allAllocatedDates.filter(
            (ad) => ad.childId === childId && ad.parentId === parent.id
          ),
        ]
      : [];
  const [level, setLevel] = useState<Level>("Sjukpenning");
  const [hoveredDate, setHoveredDate] = useState<MyDate | undefined>(undefined);
  const leaves = useLeaves();
  const deleteLeave = useLeaveDelete();

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

  const isEnabled = child && parent;

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
      {isAddScheduleModalOpen && (
        <AddSchedule close={() => setIsAddScheduleModalOpen(false)} />
      )}
      <div className="flex justify-center m-4">
        <div className="flex flex-col gap-4">
          {!isEnabled ? (
            <Card width="full">
              Både barn och föräldrar krävs för kalendern. Konfigurera på{" "}
              <Link to="/family" className="font-bold text-blue-700">
                familjsidan.
              </Link>
            </Card>
          ) : (
            <>
              <Card width="full">
                <select
                  onChange={(e) => setChildId(e.target.value)}
                  className="rounded-md p-2 pr-4 w-full"
                  name="child"
                  value={childId}
                >
                  {children.map((c) => (
                    <option value={c.id} key={c.id}>{`${c.name} (${
                      c.dateOfBirth
                        ? diffYearsFloor(
                            new Date(),
                            convertToDate(c.dateOfBirth)
                          )
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
              <Card width="full">
                <div className="flex flex-col gap-4">
                  <Calendar
                    selectedDates={isSelectDatesActive ? selectedDates : []}
                    toggleSelectedDate={
                      isSelectDatesActive
                        ? (date: MyDate) => {
                            setSelectedDates(
                              toggleDateInArray(date, selectedDates)
                            );
                          }
                        : undefined
                    }
                    allocatedDates={allocatedDates}
                    allAllocatedDates={allAllocatedDates}
                    parentId={parent.id}
                    childId={child.id}
                    hoveredDate={hoveredDate}
                  />
                  <div className="w-full flex justify-between">
                    <Button
                      variant="secondary"
                      onClick={() => setIsAddScheduleModalOpen(true)}
                    >
                      📅 Lägg till schema
                    </Button>
                    <Button
                      variant="select"
                      onClick={() => setIsSelectDatesActive((b) => !b)}
                    >
                      ✏️ Välj datum
                    </Button>
                  </div>
                </div>
              </Card>
              {isSelectDatesActive && (
                <div className="flex flex-col gap-4">
                  <Card width="full" title="Lägg till datum">
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-end">
                        <Button variant="delete" onClick={clearSelectedDates}>
                          Avmarkera alla
                        </Button>
                      </div>
                      <div className="flex w-full flex-col gap-2 justify-start">
                        {selectedDates
                          .sort(
                            (a, b) =>
                              convertToDate(a).getTime() -
                              convertToDate(b).getTime()
                          )
                          .map((sd) => (
                            <div
                              key={
                                sd.year.toString() +
                                sd.month.toString() +
                                sd.date.toString()
                              }
                              className="flex bg-blue-500 text-white justify-between items-center shadow-sm shadow-black rounded-md"
                              onMouseEnter={() => setHoveredDate(sd)}
                              onMouseLeave={() => setHoveredDate(undefined)}
                            >
                              <div className="font-mono text-sm pl-2 py-1">{`${
                                sd.year
                              }-${String(sd.month + 1).padStart(
                                2,
                                "0"
                              )}-${String(sd.date).padStart(2, "0")}`}</div>
                              <button
                                className="text-white px-3 py-1 hover:bg-blue-900 h-full rounded-md"
                                onClick={() =>
                                  updateSelectedDates(
                                    toggleDateInArray(sd, selectedDates)
                                  )
                                }
                              >
                                x
                              </button>
                            </div>
                          ))}
                      </div>
                      {selectedDates.length === 0 && (
                        <p className="w-full text-center">Inga datum valda.</p>
                      )}
                      <div className="flex flex-col gap-2">
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
                </div>
              )}
              <Card title="Scheman" collapsible={leaves.length > 0}>
                {leaves.length === 0 ? (
                  <p className="px-2 pb-2">Inga scheman tillagda.</p>
                ) : (
                  <table className="border-separate border-spacing-x-2 border-spacing-y-1">
                    <thead>
                      <tr className="text-left">
                        <th>Start</th>
                        <th>Slut</th>
                        <th>Ledig</th>
                        <th>FP</th>
                      </tr>
                    </thead>
                    {leaves.map((l) => (
                      <tr key={l.id}>
                        <td>
                          {convertToDate(l.startDate).toLocaleDateString(
                            "sv-SE"
                          )}
                        </td>
                        <td>
                          {convertToDate(l.endDate).toLocaleDateString("sv-SE")}
                        </td>
                        <td>{l.pace}</td>
                        <td>{l.payment}</td>
                        <td>
                          <Button
                            variant="delete"
                            onClick={() => deleteLeave(l.id)}
                          >
                            x
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </table>
                )}
              </Card>
            </>
          )}
        </div>
      </div>
    </>
  );
}
