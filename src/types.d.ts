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

type MyAllocatedDate = MyDate & { pace: number; payment: number };

type Child = {
  name: string;
  dateOfBirth: MyDate;
  id: string;
}

type Parent = {
  name: string;
  id: string;
}
