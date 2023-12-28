export function isDateInArray(date: Date, selectedDates: Date[]) {
  return !!selectedDates
    .map((selectedDate) => selectedDate.toDateString())
    .find((sd) => sd === date.toDateString());
}

export function toggleDateInArray(
  dateToToggle: Date,
  dates: Date[]
): Date[] {
  if (!isDateInArray(dateToToggle, dates)) {
    return [...dates, dateToToggle];
  } else {
    const indexOfDate = dates.findIndex((sd, _) => {
      return sd.toDateString() === dateToToggle.toDateString();
    });
    const newSds = [...dates];
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
