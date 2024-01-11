type DateCell = {
  date: MyDate;
  current: boolean;
};

type Leave = {
  pace: number;
  payment: number;
};

type MyDate = {
  year: number;
  month: number;
  date: number;
};

type MyAllocatedDate = MyDate & {
  pace: number;
  payment: number;
  parentId: string;
  childId: string;
};

type Child = {
  name: string;
  dateOfBirth?: MyDate;
  id: string;
};

type Parent = {
  name: string;
  id: string;
  color: "green" | "red" | "blue";
};

type Salary = {
  id: string;
  employer: string;
  parentId: string;
  startDate: MyDate;
  endDate?: MyDate;
  amountSEK: number;
};

type SalaryAdjustment = {
  from: MyDate;
  amountSEK: number;
};

type Employment = {
  id: string;
  employer: string;
  parentId: string;
  startDate: MyDate;
  endDate?: MyDate;
  monthlySalary: number;
};
