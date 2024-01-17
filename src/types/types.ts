export type DateCell = {
  date: MyDate;
  current: boolean;
};

export type MyDate = {
  year: number;
  month: number;
  date: number;
};

export type MyAllocatedDate = MyDate & {
  pace: number;
  payment: number;
  parentId: string;
  childId: string;
};

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
