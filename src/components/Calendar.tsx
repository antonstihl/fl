import { useState } from "react";
import {
  MyDate,
  convertToMyDate,
  getDayOfMyDate,
  isDateInArray,
  myDatesEqual,
  toggleDateInArray,
} from "../utils/DateUtilities";

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

type DateCell = {
  date: MyDate;
  current: boolean;
};

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

  const dateButton = (d: DateCell) => {
    const isToday = myDatesEqual(convertToMyDate(today), d.date);
    const isSelected = isDateInArray(d.date, selectedDates);
    const isAllocated = isDateInArray(d.date, allocatedDates);
    const dateButtonClasses =
      "flex items-end justify-between flex-col rounded-sm border-2 h-12";
    const whiteBorderClasses = "border-white border-4 rounded-sm";
    if (d.current) {
      return (
        <div
          key={`${d.date.year}+${d.date.month}+${d.date.date}`}
          className={whiteBorderClasses}
        >
          <button
            className={`${dateButtonClasses} border-black`}
            onClick={() => toggleSelectedDate(d.date)}
          >
            <div className="flex justify-end">
              <div
                className={`w-0 h-0 
            border-l-[15px] border-l-transparent
            border-b-[15px] ${
              isSelected ? "border-b-green-500" : "border-b-transparent"
            }
            border-r-[15px] border-r-transparent
            -rotate-45 -translate-x-3 -translate-y-1 -z-50`}
              />
              <div className="flex justify-end w-4 pr-1">
                <div>{isToday ? <u>{d.date.date}</u> : d.date.date}</div>
              </div>
            </div>
            {isAllocated && <div className="h-2 w-full bg-green-500" />}
          </button>
        </div>
      );
    } else {
      return (
        <div
          key={`${d.date.year}+${d.date.month}+${d.date.date}`}
          className={whiteBorderClasses}
        >
          <div className={`${dateButtonClasses} border-gray-400 text-gray-400`}>
            {d.date.date}
          </div>
        </div>
      );
    }
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
    <div className="border-black border-2 flex-col items-center w-max p-4">
      <div className="flex justify-between w-full items-center">
        <button
          onClick={decreaseMonth}
          className="border-black bg-green-100 rounded-md border-2 h-full w-12"
        >
          {"<"}
        </button>
        <div className="flex flex-col items-center px-4 py-4">
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
          className="border-black bg-green-100 rounded-md border-2 h-full w-12"
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
        {dates.map((date) => dateButton(date))}
      </div>
    </div>
  );
};

export default Calendar;
