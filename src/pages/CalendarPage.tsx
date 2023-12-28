import { useEffect, useRef, useState } from "react";
import Calendar from "../components/Calendar";
import { popSelectedDate } from "../utils/DateUtilities";

function CalendarPage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  useEffect(() => {
    const localStorageData = localStorage.getItem("selectedDates");
    if (localStorageData === null) {
      return;
    }
    let selectedDatesFromLocalStorage;
    try {
      selectedDatesFromLocalStorage = JSON.parse(localStorageData);
    } catch (e) {
      return;
    }
    if (Array.isArray(selectedDatesFromLocalStorage)) {
      setSelectedDates(
        selectedDatesFromLocalStorage.map((sds) => new Date(sds))
      );
    }
  }, []);

  const updateSelectedDates = (dates: Date[]) => {
    setSelectedDates(dates);
    localStorage.setItem("selectedDates", JSON.stringify(dates));
  };

  const clearSelectedDates = () => {
    updateSelectedDates([]);
  };

  return (
    <>
      <div className="p-4">
        <div className="flex items-start gap-4">
          <Calendar
            selectedDates={selectedDates}
            setSelectedDates={updateSelectedDates}
          ></Calendar>
          <div className="flex flex-col border-black border-2">
            <div className="flex justify-end m-2">
              <button
                className="border-black rounded-md border-2 px-1 bg-red-300"
                onClick={clearSelectedDates}
              >
                Rensa
              </button>
            </div>
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
                            updateSelectedDates(
                              popSelectedDate(sd, selectedDates)
                            )
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
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarPage;
