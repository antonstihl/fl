export function isDateInArray(date: Date, selectedDates: Date[]) {
  return !!selectedDates
    .map((selectedDate) => selectedDate.toDateString())
    .find((sd) => sd === date.toDateString());
}

export function popSelectedDate(
  dateToPop: Date,
  selectedDates: Date[]
): Date[] {
  if (!isDateInArray(dateToPop, selectedDates)) {
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

export function pushDate(
  dateToPush: Date,
  selectedDates: Date[]
): Date[] {
  if (!isDateInArray(dateToPush, selectedDates)) {
    return [...selectedDates, dateToPush];
  } else {
    return [...selectedDates];
  }
}
