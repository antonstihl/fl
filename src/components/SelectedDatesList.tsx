import {
  MyDate,
  convertToDate,
  toggleDateInArray,
} from "../utils/DateUtilities";

export type Props = {
  selectedDates: MyDate[];
  setSelectedDates: (dates: MyDate[]) => void;
};

export default function SelectedDatesList({
  selectedDates,
  setSelectedDates: updateSelectedDates,
}: Props) {
  return (
    <>
      <div className="flex w-64 flex-col gap-2 justify-end p-2">
        {selectedDates.length === 0
          ? "Inga datum valda."
          : selectedDates
              .sort(
                (a, b) =>
                  convertToDate(a).getTime() - convertToDate(b).getTime()
              )
              .map((sd) => (
                <div
                  key={sd.year + sd.month + sd.date}
                  className="flex justify-between items-center p-2 shadow-sm shadow-black rounded-md"
                >
                  <button
                    onClick={() =>
                      updateSelectedDates(toggleDateInArray(sd, selectedDates))
                    }
                    className="font-bold px-2 rounded-md shadow-black shadow-sm bg-blue-200"
                  >
                    -
                  </button>
                  <div className="font-mono text-sm">{`${sd.year}-${String(sd.month).padStart(2,"0")}-${String(sd.date).padStart(
                    2,
                    "0"
                  )}`}</div>
                </div>
              ))}
      </div>
    </>
  );
}
