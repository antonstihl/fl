import { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import SelectedDatesList from "../components/SelectedDatesList";

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

  const saveSelectedDates = () => {
    updateSelectedDates([]);
    alert("Aaaand its gone...");
  };

  return (
    <>
      <div className="p-4">
        <div className="flex items-start gap-4">
          <Calendar
            selectedDates={selectedDates}
            setSelectedDates={updateSelectedDates}
          />
          <div className="flex flex-col border-black border-2">
            <div className="flex justify-end m-2">
              <button
                className="border-black rounded-md border-2 px-1"
                onClick={clearSelectedDates}
              >
                Rensa
              </button>
            </div>
            <SelectedDatesList
              selectedDates={selectedDates}
              setSelectedDates={updateSelectedDates}
              saveDates={saveSelectedDates}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarPage;
