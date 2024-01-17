import { useState } from "react";
import {
  convertToMyDate,
  getDayOfMyDate,
  isDateInArray,
  myDatesEqual,
  toggleDateInArray,
} from "../utils/DateUtilities";
import Button from "./Button";
import DateButton from "./DateButton";
import { DateCell, MyAllocatedDate, MyDate } from "../types/types";

const Months = [
  "Januari",
  "Februari",
  "Mars",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "Augusti",
  "September",
  "Oktober",
  "November",
  "December",
];

const Weekdays = ["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getDateCells(year: number, month: number): DateCell[] {
  const daysInMonth = getDaysInMonth(year, month);
  const dates: DateCell[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push({
      date: { year, month, date: i },
      current: true,
    });
  }
  const isJanuary = month === 0;
  const previousMonth: number = isJanuary ? 12 : month - 1;
  const yearOfPreviousMonth: number = isJanuary ? year - 1 : year;
  const isDecember = month === 11;
  const nextMonth = isDecember ? 0 : month + 1;
  const yearOfNextMonth = isDecember ? year + 1 : year;
  for (
    let d = {
      year: yearOfPreviousMonth,
      month: previousMonth,
      date: getDaysInMonth(yearOfPreviousMonth, previousMonth),
    };
    getDayOfMyDate(d) > 0;
    d = { year: yearOfPreviousMonth, month: previousMonth, date: d.date - 1 }
  ) {
    dates.unshift({
      date: d,
      current: false,
    });
  }
  for (
    let d = { year: yearOfNextMonth, month: nextMonth, date: 1 };
    getDayOfMyDate(d) !== 1;
    d = { year: yearOfNextMonth, month: nextMonth, date: d.date + 1 }
  ) {
    dates.push({
      date: d,
      current: false,
    });
  }
  return dates;
}

export type Props = {
  selectedDates: MyDate[];
  setSelectedDates: (d: MyDate[]) => void;
  allocatedDates: MyAllocatedDate[];
  allAllocatedDates: MyAllocatedDate[];
  parentId?: string;
  childId?: string;
};

const Calendar = ({
  selectedDates,
  setSelectedDates,
  allocatedDates,
  allAllocatedDates,
  parentId,
  childId,
}: Props) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const monthName = Months[month];

  const toggleSelectedDate = (date: MyDate) => {
    setSelectedDates(toggleDateInArray(date, selectedDates));
  };

  const decreaseMonth = () => {
    const isJanuary = month === 0;
    if (isJanuary) {
      setYear((y) => y - 1);
      setMonth(11);
      return;
    }
    setMonth((m) => m - 1);
  };

  const increaseMonth = () => {
    const isDecember = month === 11;
    if (isDecember) {
      setYear((y) => y + 1);
      setMonth(0);
      return;
    }
    setMonth((m) => m + 1);
  };

  const resetMonth = () => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  };

  const dates = getDateCells(year, month);

  return (
    <>
      <div className="flex justify-center gap-2 w-full min-w-fit items-center pb-4">
        <Button onClick={decreaseMonth}>{"<"}</Button>
        <div className="flex flex-col items-center w-36">
          <div>{monthName + " " + year}</div>
          <a
            className="cursor-pointer text-green-700 text-sm font-mono select-none"
            onClick={resetMonth}
          >
            {">"}Idag{"<"}
          </a>
        </div>
        <Button onClick={increaseMonth}>{">"}</Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Weekdays.map((weekday) => (
          <div key={weekday} className="flex justify-center items-center">
            {weekday}
          </div>
        ))}
        {dates.map((dateCell) => {
          const leaves = allocatedDates
            .filter((allocatedDate) =>
              myDatesEqual(allocatedDate, dateCell.date)
            )
            .map((allocatedDate) => ({
              pace: allocatedDate.pace,
              payment: allocatedDate.payment,
            }));
          const secondaryLeaves = parentId
            ? allAllocatedDates
                .filter(
                  (allocatedDate) =>
                    myDatesEqual(allocatedDate, dateCell.date) &&
                    (allocatedDate.parentId !== parentId ||
                      allocatedDate.childId !== childId)
                )
                .map((allocatedDate) => ({
                  pace: allocatedDate.pace,
                  payment: allocatedDate.payment,
                }))
            : [];
          return (
            <DateButton
              key={`${dateCell.date.year}+${dateCell.date.month}+${dateCell.date.date}`}
              date={dateCell.date}
              selected={isDateInArray(dateCell.date, selectedDates)}
              leaves={[...leaves]}
              secondaryLeaves={[...secondaryLeaves]}
              today={myDatesEqual(convertToMyDate(today), dateCell.date)}
              activeMonth={dateCell.current}
              toggleSelectedDate={() => toggleSelectedDate(dateCell.date)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Calendar;
