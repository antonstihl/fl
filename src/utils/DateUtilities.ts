export function isDateSelected(date: Date, selectedDates: Date[]) {
  return !!selectedDates
    .map((selectedDate) => selectedDate.toDateString())
    .find((sd) => sd === date.toDateString());
}

export function popSelectedDate(
  dateToPop: Date,
  selectedDates: Date[]
): Date[] {
  if (!isDateSelected(dateToPop, selectedDates)) {
    return [...selectedDates, dateToPop];
  } else {
    const indexOfDate = selectedDates.findIndex((sd, _) => {
      return sd.toDateString() === dateToPop.toDateString();
    });
    const newSds = [...selectedDates];
    newSds.splice(indexOfDate, 1);
    return newSds;
  }
}
