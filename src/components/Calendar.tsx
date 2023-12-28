import { useState } from "react";
import { isDateInArray, toggleDateInArray } from "../utils/DateUtilities";

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
  date: Date;
  current: boolean;
};

function getDateCells(year: number, month: number): DateCell[] {
  const daysInMonth = getDaysInMonth(year, month);
  const dates: DateCell[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push({
      date: new Date(year, month, i),
      current: true,
    });
  }
  const isJanuary = month === 0;
  const previousMonth = isJanuary ? 11 : month - 1;
  const yearOfPreviousMonth = isJanuary ? year - 1 : year;
  const isDecember = month === 11;
  const nextMonth = isDecember ? 0 : month + 1;
  const yearOfNextMonth = isDecember ? year + 1 : year;
  for (
    let d = new Date(
      yearOfPreviousMonth,
      previousMonth,
      getDaysInMonth(yearOfPreviousMonth, previousMonth)
    );
    d.getDay() > 0;
    d = new Date(yearOfPreviousMonth, previousMonth, d.getDate() - 1)
  ) {
    dates.unshift({
      date: d,
      current: false,
    });
  }
  for (
    let d = new Date(yearOfNextMonth, nextMonth, 1);
    d.getDay() !== 1;
    d = new Date(yearOfNextMonth, nextMonth, d.getDate() + 1)
  ) {
    dates.push({
      date: d,
      current: false,
    });
  }
  return dates;
}

export type Props = {
  selectedDates: Date[];
  setSelectedDates: (d: Date[]) => void;
  allocatedDates: Date[];
};

const Calendar = (props: Props) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const { selectedDates, setSelectedDates, allocatedDates } = props;
  const monthName = Months[month];

  const toggleSelectedDate = (date: Date) => {
    setSelectedDates(toggleDateInArray(date, selectedDates));
  };

  const dateButton = (d: DateCell) => {
    const isToday = d.date.toDateString() == new Date().toDateString();
    const isSelected = isDateInArray(d.date, selectedDates);
    const isAllocated = isDateInArray(d.date, allocatedDates);
    const dateButtonClasses = `flex justify-end pr-1 rounded-sm border-2 h-12 ${
      isAllocated && "bg-green-100"
    }`;
    if (d.current) {
      return (
        <button
          key={d.date.toDateString()}
          className={`${dateButtonClasses} ${
            isToday ? "border-orange-500" : "border-black"
          }`}
          onClick={() => toggleSelectedDate(d.date)}
        >
          <div
            className={`w-0 h-0 
            border-l-[15px] border-l-transparent
            border-b-[15px] ${
              isSelected ? "border-b-green-500" : "border-b-transparent"
            }
            border-r-[15px] border-r-transparent
            -rotate-45 -translate-x-3 -translate-y-1 -z-50`}
          ></div>
          <div className="flex justify-end grow">{d.date.getDate()}</div>
        </button>
      );
    } else {
      return (
        <div
          key={d.date.toDateString()}
          className={`${dateButtonClasses} border-gray-400 text-gray-400`}
        >
          {d.date.getDate()}
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
      <div className="grid grid-cols-7 gap-2">
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
