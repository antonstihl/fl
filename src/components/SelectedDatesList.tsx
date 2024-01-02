import {
  MyDate,
  convertToDate,
  toggleDateInArray,
} from "../utils/DateUtilities";
import Button from "./Button";

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
      <div className="flex w-64 flex-col gap-2 justify-end">
        {selectedDates.length === 0
          ? "Inga datum valda."
          : selectedDates
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
                  className="flex justify-between items-center p-2 shadow-sm shadow-black rounded-md"
                >
                  <div className="font-mono text-sm">{`${sd.year}-${String(
                    sd.month + 1
                  ).padStart(2, "0")}-${String(sd.date).padStart(
                    2,
                    "0"
                  )}`}</div>
                  <Button
                    onClick={() =>
                      updateSelectedDates(toggleDateInArray(sd, selectedDates))
                    }
                    variant={"secondary"}
                  >
                    -
                  </Button>
                </div>
              ))}
      </div>
    </>
  );
}
