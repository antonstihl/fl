import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Button from "../components/Button";
import Card from "../components/Card";
import { useParents } from "../context/ParentContext";
import { useSalaries } from "../hooks/useSalaries";
import { convertToDate, convertToMyDate } from "../utils/DateUtilities";
import { PRISBASBELOPP } from "../utils/Forsakringskassan";

type SalaryToAdd = {
  id: string;
  employer?: string;
  parentId?: string;
  startDate?: MyDate;
  endDate?: MyDate;
  amountSEK?: number;
};

export default function SalaryPage() {
  const parents = useParents();
  const [salaryToAdd, setSalaryToAdd] = useState<SalaryToAdd>({
    id: crypto.randomUUID(),
  });
  const [salaryDate, setSalaryDate] = useState<Date>(new Date());
  const { addSalary, deleteSalary, salaries } = useSalaries();

  const validateSalary = (s: SalaryToAdd): boolean => {
    if (s.employer && s.parentId && s.startDate && s.amountSEK) {
      return true;
    }
    return false;
  };

  const handleAddSalaryClick = () => {
    if (validateSalary(salaryToAdd)) {
      addSalary(salaryToAdd as Salary);
      setSalaryToAdd({ id: crypto.randomUUID() });
    }
  };

  const pbb = PRISBASBELOPP.find(
    (pb) => pb.year === salaryDate.getFullYear()
  )?.amount;
  const roof = pbb ? pbb * 10 : undefined;

  const salaryGraphData = parents.map((p) => {
    const parentYearlySalary = salaries
      .filter((s) => s.parentId === p.id)
      .filter(
        (s) =>
          convertToDate(s.startDate) <= salaryDate &&
          (s.endDate ? convertToDate(s.endDate) >= salaryDate : true)
      )
      .reduce((a, b) => a + b.amountSEK, 0);
    return {
      name: p.name,
      salaryBelowRoof: roof && Math.min(parentYearlySalary, roof),
      salaryAboveRoof: roof && Math.max(parentYearlySalary - roof, 0),
    };
  });
  return (
    <div className="flex gap-2 flex-wrap">
      <div className="m-4 flex flex-col items-start gap-2">
        <Card width="w-full">
          <div className="grid grid-cols-2 gap-2 p-2 items-center">
            <label htmlFor="employer">Arbetsgivare</label>
            <input
              type="text"
              name="employer"
              value={salaryToAdd.employer || ""}
              onChange={(e) =>
                setSalaryToAdd((s) => ({ ...s, employer: e.target.value }))
              }
              className="border-2 border-black p-1"
            />
            <label htmlFor="parentId">Förälder</label>
            <select
              name="parentId"
              value={salaryToAdd.parentId || "-1"}
              defaultValue="-1"
              onChange={(e) =>
                setSalaryToAdd((s) => ({ ...s, parentId: e.target.value }))
              }
              className="border-2 border-black p-1"
            >
              <option value="-1" hidden disabled>
                ---
              </option>
              {parents.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <label htmlFor="startDate">Start</label>
            <input
              name="startDate"
              type="date"
              value={
                salaryToAdd.startDate
                  ? convertToDate(salaryToAdd.startDate).toLocaleDateString(
                      "sv-SE"
                    )
                  : ""
              }
              max={"3000-01-01"}
              min={"1990-01-01"}
              onChange={(e) =>
                setSalaryToAdd((s) => ({
                  ...s,
                  startDate: convertToMyDate(new Date(e.target.value)),
                }))
              }
              className="border-2 border-black p-1"
            />
            <label htmlFor="endDate">Slut</label>
            <input
              name="endDate"
              value={
                salaryToAdd.endDate
                  ? convertToDate(salaryToAdd.endDate).toLocaleDateString(
                      "sv-SE"
                    )
                  : ""
              }
              type="date"
              max={"3000-01-01"}
              min={"1990-01-01"}
              onChange={(e) =>
                setSalaryToAdd((s) => ({
                  ...s,
                  endDate: convertToMyDate(new Date(e.target.value)),
                }))
              }
              className="border-2 border-black p-1"
            />
            <label htmlFor="salary">Månadslön (SEK)</label>
            <input
              name="salary"
              value={salaryToAdd.amountSEK ? salaryToAdd.amountSEK / 12 : ""}
              type="number"
              min={0}
              onChange={(e) =>
                setSalaryToAdd((s) => ({
                  ...s,
                  amountSEK: Number(e.target.value) * 12,
                }))
              }
              className="border-2 border-black p-1"
            />
          </div>
          <div className="flex justify-end m-2">
            <Button variant="primary" onClick={handleAddSalaryClick}>
              Lägg till
            </Button>
          </div>
        </Card>
        <Card width="w-fit">
          <div className="flex flex-col items-center">
            <div className="flex justify-end w-full pr-8">
              <input
                className="border-2 border-black p-1"
                type="date"
                max={"3000-01-01"}
                min={"1990-01-01"}
                value={salaryDate.toLocaleDateString("sv-SE")}
                onChange={(e) => setSalaryDate(new Date(e.target.value))}
              />
            </div>
            <BarChart
              width={500}
              height={300}
              data={salaryGraphData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                name={`Lön under FK tak (${
                  roof ? roof / 1000 : "?"
                }k år ${salaryDate.getFullYear()})`}
                dataKey="salaryBelowRoof"
                stackId="a"
                fill="#8884d8"
              />
              <Bar
                name="Lön över FK tak"
                dataKey="salaryAboveRoof"
                stackId="a"
                fill="#82ca9d"
              />
            </BarChart>
          </div>
        </Card>
      </div>
      <div className="m-4 flex flex-col gap-2">
        <Card>
          {salaries.length === 0 ? (
            <p>No salaries saved.</p>
          ) : (
            <ul className="flex w-full flex-col gap-2 justify-start">
              {salaries.map((s) => (
                <li
                  className="grid grid-cols-9 bg-green-700 text-white justify-between items-center shadow-sm shadow-black rounded-md gap-4"
                  title={JSON.stringify(s, null, 2)}
                >
                  <div className="pl-2 py-1 col-span-5">
                    {s.employer} (
                    {parents.find((p) => p.id === s.parentId)?.name || "?"})
                  </div>
                  <div className="mx-2 col-span-3">{s.amountSEK} SEK</div>
                  <button
                    className="text-white px-3 py-1 hover:bg-green-900 h-full rounded-md col-span-1"
                    onClick={() => {
                      deleteSalary(s.id);
                    }}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
