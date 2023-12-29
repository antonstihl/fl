import {
  MyDate,
  convertToDate,
  toggleDateInArray,
} from "../utils/DateUtilities";

export type Props = {
  selectedDates: MyDate[];
  setSelectedDates: (dates: MyDate[]) => void;
  saveDates: () => void;
};

export default function SelectedDatesList({
  selectedDates,
  setSelectedDates: updateSelectedDates,
  saveDates,
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
                  className="flex justify-between items-center p-1 border-black border-2 rounded-md"
                >
                  <button
                    onClick={() =>
                      updateSelectedDates(toggleDateInArray(sd, selectedDates))
                    }
                    className="font-bold border-2 border-black px-2 rounded-md"
                  >
                    -
                  </button>
                  <div>{`${sd.year}-${sd.month}-${String(sd.date).padStart(
                    2,
                    "0"
                  )}`}</div>
                </div>
              ))}
        <div className="flex justify-center">
          <button
            onClick={saveDates}
            className={`border-2 border-black rounded-md ${
              selectedDates.length > 0
                ? "bg-green-200"
                : "bg-slate-200 cursor-not-allowed"
            }  w-full`}
          >
            Spara
          </button>
        </div>
      </div>
    </>
  );
}
