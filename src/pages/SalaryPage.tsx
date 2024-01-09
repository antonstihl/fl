import { useReducer, useRef, useState } from "react";
import Card from "../components/Card";
import { useParents } from "../context/ParentContext";
import { convertToDate, convertToMyDate } from "../utils/DateUtilities";
import Button from "../components/Button";
import { useSalaries } from "../hooks/useSalaries";

type StagedSalary = {
  employer?: string;
  parentId?: string;
  startDate?: MyDate;
  endDate?: MyDate;
  amountSEK?: number;
};

export default function SalaryPage() {
  const parents = useParents();
  const [salaryToAdd, setSalaryToAdd] = useState<StagedSalary>({});
  const { addSalary, salaries } = useSalaries();

  const handleAddSalaryClick = () => {
    addSalary(salaryToAdd as Salary);
    setSalaryToAdd({});
  };

  console.log(
    salaryToAdd.startDate ? convertToDate(salaryToAdd.startDate) : "bla"
  );
  return (
    <div className="m-4">
      <Card>
        <form className="grid grid-cols-2 gap-2 p-2 items-center">
          <label htmlFor="employer">Arbetsgivare</label>
          <input
            type="text"
            name="employer"
            value={salaryToAdd.employer}
            onChange={(e) =>
              setSalaryToAdd((s) => ({ ...s, employer: e.target.value }))
            }
            className="border-2 border-black p-1"
          />
          <label htmlFor="parentId">Förälder</label>
          <select
            name="parentId"
            value={salaryToAdd.parentId}
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
                ? convertToDate(salaryToAdd.endDate).toLocaleDateString("sv-SE")
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
            value={salaryToAdd.amountSEK}
            type="number"
            min={0}
            onChange={(e) =>
              setSalaryToAdd((s) => ({
                ...s,
                salary: Number(e.target.value) * 12,
              }))
            }
            className="border-2 border-black p-1"
          />
        </form>
        <div className="flex justify-end m-2">
          <Button variant="primary" onClick={handleAddSalaryClick}>
            Lägg till
          </Button>
        </div>
      </Card>
      <p className="p-6 m-2 w-fit rounded-md flex-wrap border-black border-2">
        {JSON.stringify(salaryToAdd, null, 2)}
      </p>
      <p className="p-6 m-2 w-fit rounded-md flex-wrap border-black border-2">
        {JSON.stringify(salaries, null, 2)}
      </p>
    </div>
  );
}
