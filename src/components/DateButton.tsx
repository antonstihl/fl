import { MyDate } from "../types/types";

function getAllocationBarWidthStyle(allocation?: number) {
  if (!allocation || allocation < 0.25) {
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

type Leave = {
  pace: number;
  payment: number;
};

export type Props = {
  date: MyDate;
  selected: boolean;
  leaves: Leave[];
  secondaryLeaves: Leave[];
  today: boolean;
  activeMonth: boolean;
  toggleSelectedDate: () => void;
  highlight: boolean;
  clickable: boolean;
};

export default function DateButton({
  date,
  selected,
  leaves,
  secondaryLeaves,
  today,
  activeMonth,
  toggleSelectedDate,
  highlight,
  clickable,
}: Props) {
  const decoratedLeaves = leaves.map((leave: Leave) => ({
    paceStyle: getAllocationBarWidthStyle(leave.pace),
    paymentStyle: getAllocationBarWidthStyle(
      Math.min(leave.payment, leave.pace)
    ),
  }));
  const decoratedSecondaryLeaves = secondaryLeaves.map((leave: Leave) => ({
    paceStyle: getAllocationBarWidthStyle(leave.pace),
    paymentStyle: getAllocationBarWidthStyle(
      Math.min(leave.payment, leave.pace)
    ),
  }));

  return !activeMonth ? (
    <div className="flex justify-between flex-col rounded-sm h-max select-none items-end shadow-sm shadow-gray-400 border-gray-400 text-gray-400 pr-1">
      {date.date}
    </div>
  ) : (
    <button
      className={`flex justify-between flex-col rounded-sm h-max min-w-fit select-none shadow-black shadow-sm ${
        highlight ? "bg-blue-900 text-white" : "bg-white"
      }`}
      disabled={!clickable}
      onClick={clickable ? toggleSelectedDate : () => {}}
    >
      <div className="flex justify-center">
        <div
          className={`w-0 h-0 
            border-l-[15px] border-l-transparent
            border-b-[15px] ${
              selected ? "border-b-blue-500" : "border-b-transparent"
            }
            border-r-[15px] border-r-transparent
            -rotate-45 -translate-x-3 -translate-y-1 z-0`}
        />
        <div className="flex justify-end w-2 pr-2">
          <div>{today ? <p>{date.date}</p> : date.date}</div>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full">
        {decoratedLeaves.map((decoratedLeave, index) => {
          return (
            <div key={index}>
              <div
                className={`h-2 border-2 bg-white rounded-sm ${"border-green-700"} ${
                  decoratedLeave.paceStyle
                }`}
              ></div>
              <div
                className={`-mt-2 h-2 ${decoratedLeave.paymentStyle} bg-green-700 rounded-sm`}
              />
            </div>
          );
        })}
        {decoratedSecondaryLeaves.map((decoratedLeave, index) => {
          return (
            <div key={index}>
              <div
                className={`h-2 border-2 bg-white rounded-sm ${"border-slate-400"} ${
                  decoratedLeave.paceStyle
                }`}
              ></div>
              <div
                className={`-mt-2 h-2 ${decoratedLeave.paymentStyle} bg-slate-400 rounded-sm`}
              />
            </div>
          );
        })}
      </div>
    </button>
  );
}
