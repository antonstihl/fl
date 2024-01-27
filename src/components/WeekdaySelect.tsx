
type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

type Props = {
  onChange: (value: Weekday[]) => void;
  value: Weekday[];
};

export default function WeekdaySelect({
  onChange: setSelectedWeekdays,
  value: selectedWeekdays,
}: Props) {
  console.log({ selectedWeekdays });

  const toggleWeekday = (w: Weekday) => {
    if (!selectedWeekdays) {
      setSelectedWeekdays([w]);
      return;
    }
    if (selectedWeekdays.includes(w)) {
      const i = selectedWeekdays.findIndex(
        (selectedWeekday) => selectedWeekday === w
      );
      const updatedSelectedWeekdays = selectedWeekdays
        ? [...selectedWeekdays]
        : [];
      updatedSelectedWeekdays.splice(i, 1);
      setSelectedWeekdays(updatedSelectedWeekdays);
      return;
    }
    setSelectedWeekdays([...selectedWeekdays, w]);
  };

  return (
    <div className="flex flex-col">
      {[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((weekday) => (
        <div className="flex items-center gap-2" key={weekday}>
          <input
            type="checkbox"
            name={weekday}
            onChange={() => toggleWeekday(weekday as Weekday)}
            checked={
              selectedWeekdays && selectedWeekdays.includes(weekday as Weekday)
            }
          />
          <label htmlFor={weekday}>{weekday}</label>
        </div>
      ))}
    </div>
  );
}
