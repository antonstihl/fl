import { z } from "zod";
import { convertToDate, convertToMyDate } from "../utils/DateUtilities";

export type DateCell = {
  date: MyDate;
  current: boolean;
};

const MyDateSchema = z.object({
  year: z.number().int().min(1970).max(3000),
  month: z.number().int().min(0).max(11),
  date: z.number().int().min(1).max(31),
});

export type MyDate = z.infer<typeof MyDateSchema>;

const MyMonthSchema = MyDateSchema.omit({ date: true });

export type MyMonth = z.infer<typeof MyMonthSchema>;

export type MyAllocatedDate = MyDate & {
  pace: number;
  payment: number;
  parentId: string;
  childId: string;
};

const WeekdayEnum = z.enum([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]);
export type Weekday = z.infer<typeof WeekdayEnum>;

export const ScheduleSchema = z.object({
  startDate: z
    .date()
    .min(new Date("1900-01-01"))
    .max(new Date("3000-01-01"))
    .transform((d) => convertToMyDate(d)),
  endDate: z
    .date()
    .min(new Date("1900-01-01"))
    .max(new Date("3000-01-01"))
    .transform((d) => convertToMyDate(d)),
  pace: z.number().min(0.125).max(1),
  payment: z.number().min(0).max(1),
  cadence: z.enum(["daily", "weekly"]),
  id: z.string().uuid(),
  weekdays: z.array(WeekdayEnum).optional(), //.nonempty()
});

export const NewScheduleSchema = ScheduleSchema.omit({ id: true }).refine(
  (s) => convertToDate(s.endDate) >= convertToDate(s.startDate),
  "End date must be after start date."
);

export type Schedule = z.infer<typeof ScheduleSchema>;
export type NewSchedule = z.infer<typeof NewScheduleSchema>;

export type Parent = {
  name: string;
  id: string;
  color: "green" | "red" | "blue";
};

export type Salary = {
  id: string;
  employer: string;
  parentId: string;
  startDate: MyDate;
  endDate?: MyDate;
  amountSEK: number;
};

export type SalaryAdjustment = {
  from: MyDate;
  amountSEK: number;
};

export type Employment = {
  id: string;
  employer: string;
  parentId: string;
  monthlySalary: number;
};
