import { MyAllocatedDate, MyDate, MyMonth, Schedule } from "../types/types";

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

export function getAllocatedDatesInMonthFromLeave(
  month: MyMonth,
  leaves: Schedule[],
  childId: string,
  parentId: string
): MyAllocatedDate[] {
  const daysInMonth = new Date(month.year, month.month, 0).getDate();
  return leaves.flatMap((l) => {
    const startDate = convertToDate(l.startDate);
    const endDate = convertToDate(l.endDate);
    let allocatedDates: MyAllocatedDate[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(month.year, month.month, i);
      if (startDate <= d && endDate >= d) {
        allocatedDates.push({
          childId,
          parentId,
          year: d.getFullYear(),
          month: d.getMonth(),
          date: d.getDate(),
          pace: l.pace,
          payment: l.payment,
        });
      }
    }
    return allocatedDates;
  });
}
