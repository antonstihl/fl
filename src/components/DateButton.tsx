import { MyDate } from "../utils/DateUtilities";

export type Props = {
  date: MyDate;
  selected: boolean;
  allocated: boolean;
  today: boolean;
  activeMonth: boolean;
  toggleSelectedDate: () => void;
};

export default function DateButton({
  date,
  selected,
  allocated,
  today,
  activeMonth,
  toggleSelectedDate,
}: Props) {
  const isToday = today;
  const isSelected = selected;
  const isAllocated = allocated;
  const dateButtonClasses =
    "flex items-end justify-between flex-col rounded-sm border-2 h-12";
  const whiteBorderClasses = "border-white border-4 rounded-sm";
  if (activeMonth) {
    return (
      <div
        className={whiteBorderClasses}
      >
        <button
          className={`${dateButtonClasses} border-black`}
          onClick={toggleSelectedDate}
        >
          <div className="flex justify-end">
            <div
              className={`w-0 h-0 
            border-l-[15px] border-l-transparent
            border-b-[15px] ${
              isSelected && !isAllocated ? "border-b-green-500": (isSelected && isAllocated ? "border-b-red-500" : "border-b-transparent")
            }
            border-r-[15px] border-r-transparent
            -rotate-45 -translate-x-3 -translate-y-1 -z-50`}
            />
            <div className="flex justify-end w-4 pr-1">
              <div>
                {isToday ? <u>{date.date}</u> : date.date}
              </div>
            </div>
          </div>
          {isAllocated && <div className="h-2 w-full bg-green-500" />}
        </button>
      </div>
    );
  } else {
    return (
      <div
        className={whiteBorderClasses}
      >
        <div className={`${dateButtonClasses} border-gray-400 text-gray-400`}>
          {date.date}
        </div>
      </div>
    );
  }
}
