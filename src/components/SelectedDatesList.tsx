import { convertToDate, toggleDateInArray } from "../utils/DateUtilities";

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
      <div className="flex w-full flex-col gap-2 justify-start">
        {selectedDates
              .sort(
                (a, b) =>
                  convertToDate(a).getTime() - convertToDate(b).getTime()
              )
              .map((sd) => (
                <div
                  key={
                    sd.year.toString() +
                    sd.month.toString() +
                    sd.date.toString()
                  }
                  className="flex bg-green-700 text-white justify-between items-center shadow-sm shadow-black rounded-md"
                >
                  <div className="font-mono text-sm pl-2 py-1">{`${
                    sd.year
                  }-${String(sd.month + 1).padStart(2, "0")}-${String(
                    sd.date
                  ).padStart(2, "0")}`}</div>
                  <button
                    className="text-white px-3 py-1 hover:bg-green-900 h-full rounded-md"
                    onClick={() =>
                      updateSelectedDates(toggleDateInArray(sd, selectedDates))
                    }
                  >
                    x
                  </button>
                </div>
              ))}
      </div>
    </>
  );
}
