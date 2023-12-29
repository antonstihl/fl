
export type Props = {
  dateCell: DateCell;
  selected: boolean;
  allocated: boolean;
  today: boolean;
  toggleSelectedDate: () => void;
};

export default function DateButton({
  dateCell,
  selected,
  allocated,
  today,
  toggleSelectedDate,
}: Props) {
  const isToday = today;
  const isSelected = selected;
  const isAllocated = allocated;
  const dateButtonClasses =
    "flex items-end justify-between flex-col rounded-sm border-2 h-12";
  const whiteBorderClasses = "border-white border-4 rounded-sm";
  if (dateCell.current) {
    return (
      <div
        key={`${dateCell.date.year}+${dateCell.date.month}+${dateCell.date.date}`}
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
              isSelected ? "border-b-green-500" : "border-b-transparent"
            }
            border-r-[15px] border-r-transparent
            -rotate-45 -translate-x-3 -translate-y-1 -z-50`}
            />
            <div className="flex justify-end w-4 pr-1">
              <div>
                {isToday ? <u>{dateCell.date.date}</u> : dateCell.date.date}
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
        key={`${dateCell.date.year}+${dateCell.date.month}+${dateCell.date.date}`}
        className={whiteBorderClasses}
      >
        <div className={`${dateButtonClasses} border-gray-400 text-gray-400`}>
          {dateCell.date.date}
        </div>
      </div>
    );
  }
}
