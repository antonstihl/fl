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

export type Props = {
  date: MyDate;
  selected: boolean;
  leaves: Leave[];
  secondaryLeaves: Leave[];
  today: boolean;
  activeMonth: boolean;
  toggleSelectedDate: () => void;
};

export default function DateButton({
  date,
  selected,
  leaves,
  secondaryLeaves,
  today,
  activeMonth,
  toggleSelectedDate,
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

  const dateButtonClasses =
    "flex justify-between flex-col rounded-sm h-max select-none";
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
              selected ? "border-b-green-700" : "border-b-transparent"
            }
            border-r-[15px] border-r-transparent
            -rotate-45 -translate-x-3 -translate-y-1 z-0`}
            />
            <div className="flex justify-end w-2 pr-1">
              <div>{today ? <p>{date.date}</p> : date.date}</div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full">
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
