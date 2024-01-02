

export function getDayOfMyDate(myDate: MyDate): number {
  return new Date(myDate.year, myDate.month, myDate.date).getDay();
}

export function myDatesEqual(a: MyDate, b: MyDate) {
  return a.year === b.year && a.month === b.month && a.date === b.date;
}

export function convertToMyDate(date: Date): MyDate {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };
}

export function convertToDate(myDate: MyDate): Date {
  return new Date(myDate.year, myDate.month - 1, myDate.date);
}

export function isDateInArray(date: MyDate, selectedDates: MyDate[]) {
  return !!selectedDates.find((sd) => myDatesEqual(sd, date));
}

export function toggleDateInArray(
  dateToToggle: MyDate,
  dates: MyDate[]
): MyDate[] {
  if (!isDateInArray(dateToToggle, dates)) {
    return [...dates, dateToToggle];
  } else {
    const indexOfDate = dates.findIndex((sd, _) => {
      return myDatesEqual(sd, dateToToggle);
    });
    const newSds = [...dates];
    newSds.splice(indexOfDate, 1);
    return newSds;
  }
}

export function toggleAllocatedDates(
  dates: MyDate[],
  allocatedDates: MyDate[]
): MyDate[] {
  let newAllocatedDates = [...allocatedDates];
  dates.forEach((date) => {
    newAllocatedDates = toggleDateInArray(date, newAllocatedDates);
  });
  return newAllocatedDates;
}

export function addDates(datesToAdd: MyDate[], dates: MyDate[]) {
  let newDates = [...dates];
  datesToAdd.forEach((date) => {
    if (!isDateInArray(date, newDates)) {
      newDates.push(date);
    }
  });
  return newDates;
}

export function removeDates(datesToRemove: MyDate[], dates: MyDate[]) {
  let newDates = [...dates];
  datesToRemove.forEach((date) => {
    if (isDateInArray(date, newDates)) {
      const index = newDates.findIndex((newDate, _) =>
        myDatesEqual(newDate, date)
      );
      newDates.splice(index, 1);
    }
  });
  return newDates;
}
