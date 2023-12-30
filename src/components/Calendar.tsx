import { useState } from "react";
import {
  MyDate,
  convertToMyDate,
  getDayOfMyDate,
  isDateInArray,
  myDatesEqual,
  toggleDateInArray,
} from "../utils/DateUtilities";
import DateButton from "./DateButton";

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
  const previousMonth: number = isJanuary ? 11 : month - 1;
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
  allocatedDates: MyDate[];
};

const Calendar = (props: Props) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const { selectedDates, setSelectedDates, allocatedDates } = props;
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
    <div className="border-transparent shadow-sm shadow-black flex-col items-center w-max p-2 rounded-md">
      <div className="flex justify-between w-full items-center pb-4">
        <button
          onClick={decreaseMonth}
          className="rounded-md m-2 px-4 py-1 bg-blue-300 hover:bg-blue-400 shadow-sm shadow-black"
        >
          {"<"}
        </button>
        <div className="flex flex-col items-center">
          <div>{monthName + " " + year}</div>
          <a
            className="cursor-pointer text-blue-500 text-sm font-mono"
            onClick={resetMonth}
          >
            {"> "}Idag{" <"}
          </a>
        </div>
        <button
          onClick={increaseMonth}
          className="rounded-md m-2 px-4 py-1 bg-blue-300 hover:bg-blue-400 shadow-sm shadow-black"
        >
          {">"}
        </button>
      </div>
      <div className="grid grid-cols-7">
        {Weekdays.map((weekday) => (
          <div key={weekday} className="flex justify-center items-center">
            {weekday}
          </div>
        ))}
        {dates.map((dateCell) => (
          <DateButton
            key={`${dateCell.date.year}+${dateCell.date.month}+${dateCell.date.date}`}
            date={dateCell.date}
            selected={isDateInArray(dateCell.date, selectedDates)}
            allocated={isDateInArray(dateCell.date, allocatedDates) ? 0.75 : 0}
            today={myDatesEqual(convertToMyDate(today), dateCell.date)}
            activeMonth={dateCell.current}
            toggleSelectedDate={() => toggleSelectedDate(dateCell.date)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
