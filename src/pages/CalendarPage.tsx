import { useState } from "react";
import Calendar from "../components/Calendar";
import { popSelectedDate } from "../utils/DateUtilities";

function CalendarPage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  return (
    <div className="p-4">
      <div className="flex items-start gap-4">
        <Calendar
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        ></Calendar>
        <div className="flex w-48 flex-col gap-2 justify-end border-black border-2 p-2">
          {selectedDates.map((sd) => (
            <div className="flex justify-between p-2 bg-green-100 border-black border-2">
              <button
                onClick={() =>
                  setSelectedDates(popSelectedDate(sd, selectedDates))
                }
                className="font-bold"
              >
                x
              </button>
              <div>{sd.toDateString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
