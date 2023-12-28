import { popSelectedDate } from "../utils/DateUtilities";

export type Props = {
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
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
              .sort((a, b) => a.getTime() - b.getTime())
              .map((sd) => (
                <div
                  key={sd.toDateString()}
                  className="flex justify-between p-2 border-black border-2"
                >
                  <button
                    onClick={() =>
                      updateSelectedDates(popSelectedDate(sd, selectedDates))
                    }
                    className="font-bold border-2 border-black px-2 rounded-md bg-red-300"
                  >
                    -
                  </button>
                  <div>{sd.toDateString()}</div>
                </div>
              ))}
        <div className="flex justify-center">
          <button
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
