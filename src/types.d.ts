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

type MyAllocatedDate = MyAllocatedDate & { pace: number; payment: number };
