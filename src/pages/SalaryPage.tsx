import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import { useParents } from "../context/ParentContext";
import { useSalaries } from "../hooks/useSalaries";
import { convertToDate, convertToMyDate } from "../utils/DateUtilities";

type SalaryToAdd = {
  employer?: string;
  parentId?: string;
  startDate?: MyDate;
  endDate?: MyDate;
  amountSEK?: number;
};

export default function SalaryPage() {
  const parents = useParents();
  const [salaryToAdd, setSalaryToAdd] = useState<SalaryToAdd>({});
  const { addSalary, salaries } = useSalaries();

  const validateSalary = (s: SalaryToAdd): boolean => {
    if (s.employer && s.parentId && s.startDate && s.amountSEK) {
      return true;
    }
    return false;
  };

  const handleAddSalaryClick = () => {
    if (validateSalary(salaryToAdd)) {
      addSalary(salaryToAdd as Salary);
      setSalaryToAdd({});
    }
  };
  return (
    <div className="m-4">
      <Card>
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
      <p className="p-6 m-2 w-fit rounded-md flex-wrap border-black border-2">
        {JSON.stringify(salaryToAdd, null, 2)}
      </p>
      <p className="p-6 m-2 w-fit rounded-md flex-wrap border-black border-2">
        <ul>
          {salaries.map((s) => (
            <li className="list-disc mx-2">{JSON.stringify(s, null, 2)}</li>
          ))}
        </ul>
      </p>
    </div>
  );
}
