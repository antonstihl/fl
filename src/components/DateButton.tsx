import { MyDate } from "../utils/DateUtilities";

export type Props = {
  date: MyDate;
  selected: boolean;
  allocations: number[];
  today: boolean;
  activeMonth: boolean;
  toggleSelectedDate: () => void;
};

function getAllocationBarWidthStyle(allocation?: number) {
  if (!allocation) {
    return "";
  } else if (allocation < 0.25) {
    return "w-0";
  } else if (allocation >= 0.25 && allocation < 0.5) {
    return "w-1/4";
  } else if (allocation >= 0.5 && allocation < 0.75) {
    return "w-1/2";
  } else if (allocation >= 0.75 && allocation < 1) {
    return "w-3/4";
  } else if (allocation >= 1) {
    return "w-full";
  }
}

const COLORS = ["green-700", "orange-700", "indigo-700"];

export default function DateButton({
  date,
  selected,
  allocations,
  today,
  activeMonth,
  toggleSelectedDate,
}: Props) {
  const allocationBarWidthStyles = allocations?.map((allocation) =>
    getAllocationBarWidthStyle(allocation)
  );

  const dateButtonClasses = "flex justify-between flex-col rounded-sm h-12";
  const whiteBorderClasses = "border-white border-4 rounded-sm";
  if (activeMonth) {
    return (
      <div className={whiteBorderClasses}>
        <button
          className={`${dateButtonClasses} shadow-sm shadow-black`}
          onClick={toggleSelectedDate}
        >
          <div className="flex justify-center">
            <div
              className={`w-0 h-0 
            border-l-[15px] border-l-transparent
            border-b-[15px] ${
              selected ? "border-b-black" : "border-b-transparent"
            }
            border-r-[15px] border-r-transparent
            -rotate-45 -translate-x-3 -translate-y-1 -z-50`}
            />
            <div className="flex justify-end w-4 pr-1">
              <div>{today ? <p>{date.date}</p> : date.date}</div>
            </div>
          </div>
          <div className="flex flex-col gap-0 align-bottom w-full">
            {allocations.map((_, index) => {
              console.log("border-" + COLORS[index]);
              return (
                <div
                  key={index}
                  className={`h-2 border-2 ${"border-" + COLORS[index]} ${
                    allocationBarWidthStyles[index]
                  } bg-white rounded-sm`}
                />
              );
            })}
          </div>
        </button>
      </div>
    );
  } else {
    return (
      <div className={whiteBorderClasses}>
        <div
          className={`${dateButtonClasses} items-end shadow-sm shadow-gray-400 border-gray-400 text-gray-400 pr-1`}
        >
          {date.date}
        </div>
      </div>
    );
  }
}
