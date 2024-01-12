import { useState } from "react";
import Chart, { ChartWrapperOptions } from "react-google-charts";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { useParents } from "../context/ParentContext";
import { useEmployments } from "../hooks/useEmployments";
import { PRISBASBELOPP } from "../utils/Forsakringskassan";

type EmploymentUnderEdit = Partial<Employment>;

export default function SalaryPage() {
  const parents = useParents();
  const [employmentToAdd, setEmploymentToAdd] = useState<EmploymentUnderEdit>({
    id: crypto.randomUUID(),
  });
  const [employmentToEdit, setEmploymentToEdit] = useState<
    EmploymentUnderEdit | undefined
  >(undefined);
  const [employmentIdToDelete, setEmploymentIdToDelete] = useState<
    string | undefined
  >(undefined);
  const { employments, addEmployment, deleteEmployment, updateEmployment } =
    useEmployments();

  const validateEmployment = (e: EmploymentUnderEdit): boolean => {
    if (e.employer && e.parentId && e.monthlySalary) {
      return true;
    }
    return false;
  };

  const handleAddEmploymentClick = () => {
    if (validateEmployment(employmentToAdd)) {
      addEmployment(employmentToAdd as Employment);
      setEmploymentToAdd({ id: crypto.randomUUID() });
    }
  };

  const handleEditEmploymentClick = () => {
    if (employmentToEdit && validateEmployment(employmentToEdit)) {
      updateEmployment(employmentToEdit as Employment);
      setEmploymentToEdit(undefined);
    }
  };

  const handleDeleteEmploymentClick = () => {
    if (employmentIdToDelete) {
      deleteEmployment(employmentIdToDelete);
      setEmploymentIdToDelete(undefined);
    }
  };

  const pbb = PRISBASBELOPP.find(
    (pb) => pb.year === new Date().getFullYear()
  )?.amount;
  const roof = pbb ? pbb * 10 : undefined;

  const options: ChartWrapperOptions["options"] = {
    title: "Årslöner",
    chartArea: { width: "75%" },
    legend: {
      position: "none",
    },
    isStacked: true,
    hAxis: {
      minValue: 0,
    },
  };

  const salaryGraphData: any = [
    ["Namn", "Lön under tak", "Lön ovan tak", "Föräldrapenning"],
  ];

  salaryGraphData.push(
    ...parents.flatMap((p) => {
      const parentYearlySalary = employments
        .filter((e) => e.parentId === p.id)
        .reduce((a, b) => a + b.monthlySalary * 12, 0);
      const salaryBelowRoof = roof && Math.min(parentYearlySalary, roof);
      const salaryAboveRoof = roof && Math.max(parentYearlySalary - roof, 0);
      return [
        [p.name, salaryBelowRoof, salaryAboveRoof, 0],
        [`${p.name} ledig`, 0, 0, salaryBelowRoof && 0.8 * salaryBelowRoof],
      ];
    })
  );

  const getParentWithId = (id?: string) => parents.find((p) => p.id === id);

  return (
    <>
      {employmentToEdit && (
        <Modal>
          <div className="m-2 w-fit">
            <Card width="w-full" title="Uppdatera anställning">
              <div className="p-2 flex-col gap-2 flex">
                <label htmlFor="employmentToDelete"></label>
                <select
                  className="border-2 border-black p-1 rounded-sm w-min"
                  name="employmentToDelete"
                  value={employmentToEdit.id}
                  onChange={(e) => {
                    setEmploymentToEdit(
                      employments.find(
                        (employment) => employment.id === e.target.value
                      )
                    );
                  }}
                >
                  {employments.map((e) => (
                    <option value={e.id} key={e.id}>
                      {`${e.employer} (${getParentWithId(e.parentId)?.name})`}
                    </option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-2 items-center">
                  <label htmlFor="employer">Arbetsgivare</label>
                  <input
                    type="text"
                    name="employer"
                    value={employmentToEdit.employer || ""}
                    onChange={(event) =>
                      setEmploymentToEdit((e) => ({
                        ...e,
                        employer: event.target.value,
                      }))
                    }
                    className="border-2 border-black p-1 rounded-sm"
                  />
                  <label htmlFor="parentId">Förälder</label>
                  <select
                    name="parentId"
                    value={employmentToEdit.parentId || "-1"}
                    defaultValue="-1"
                    onChange={(e) =>
                      setEmploymentToEdit((employment) => ({
                        ...employment,
                        parentId: e.target.value,
                      }))
                    }
                    className="border-2 border-black p-1 rounded-sm"
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
                  <label htmlFor="salary">Månadslön (SEK)</label>
                  <input
                    name="salary"
                    value={employmentToEdit?.monthlySalary || ""}
                    type="number"
                    min={0}
                    onChange={(e) =>
                      setEmploymentToEdit((employment) => ({
                        ...employment,
                        monthlySalary: Number(e.target.value),
                      }))
                    }
                    className="border-2 border-black p-1 rounded-sm"
                  />
                </div>
                <div className="flex justify-end m-2 gap-2">
                  <Button variant="primary" onClick={handleEditEmploymentClick}>
                    Spara
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setEmploymentToEdit(undefined)}
                  >
                    Avbryt
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </Modal>
      )}
      {employmentIdToDelete && (
        <Modal>
          <div className="m-2 w-fit">
            <Card width="w-full" title="Radera anställning">
              <div className="p-2 flex-col gap-2 flex">
                <label htmlFor="employmentToDelete"></label>
                <select
                  className="border-2 border-black p-1 rounded-sm"
                  name="employmentToDelete"
                  value={employmentIdToDelete}
                  onChange={(e) => {
                    setEmploymentIdToDelete(
                      employments.find(
                        (employment) => employment.id === e.target.value
                      )?.id
                    );
                  }}
                >
                  {employments.map((e) => (
                    <option value={e.id} key={e.id}>
                      {`${e.employer} (${getParentWithId(e.parentId)?.name})`}
                    </option>
                  ))}
                </select>

                <div className="flex justify-end m-2 gap-2">
                  <Button
                    variant="delete"
                    onClick={handleDeleteEmploymentClick}
                  >
                    Radera
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setEmploymentIdToDelete(undefined)}
                  >
                    Avbryt
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </Modal>
      )}
      <div className="m-4 flex flex-col items-center gap-4">
        <Card width="w-max" title="Anställningar">
          {employments.length === 0 ? (
            <p className="m-2">No employments saved.</p>
          ) : (
            <>
              <table className="table-auto border-separate border-spacing-2 w-full">
                <thead>
                  <th className="text-left">Förälder</th>
                  <th className="text-left">Arbetsgivare</th>
                  <th className="text-left">Månadslön</th>
                </thead>
                <tbody>
                  {employments.map((e) => (
                    <>
                      <tr key={e.id}>
                        <td>
                          {parents.find((p) => p.id === e.parentId)?.name}
                        </td>
                        <td>{e.employer}</td>
                        <td>
                          {e.monthlySalary &&
                            Number(e.monthlySalary.toFixed(0)).toLocaleString(
                              "sv-SE"
                            )}{" "}
                          SEK
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-row justify-end gap-2">
                {employments.length > 0 && (
                  <Button
                    onClick={() => {
                      setEmploymentToEdit(
                        employments[0] as EmploymentUnderEdit
                      );
                    }}
                  >
                    Ändra
                  </Button>
                )}
                {employments.length > 0 && (
                  <Button
                    onClick={() => {
                      setEmploymentIdToDelete(employments[0].id);
                    }}
                    variant="delete"
                  >
                    Ta bort
                  </Button>
                )}
              </div>
            </>
          )}
        </Card>
        <Card width="w-max">
          <Chart
            chartType="BarChart"
            width="100%"
            data={salaryGraphData}
            options={options}
          />
        </Card>
        <Card width="w-max" title="Lägg till anställning">
          <div className="grid grid-cols-2 gap-2 p-2 items-center">
            <label htmlFor="employer">Arbetsgivare</label>
            <input
              type="text"
              name="employer"
              value={employmentToAdd.employer || ""}
              onChange={(event) =>
                setEmploymentToAdd((e) => ({
                  ...e,
                  employer: event.target.value,
                }))
              }
              className="border-2 border-black p-1 rounded-sm"
            />
            <label htmlFor="parentId">Förälder</label>
            <select
              name="parentId"
              value={employmentToAdd.parentId || "-1"}
              defaultValue="-1"
              onChange={(e) =>
                setEmploymentToAdd((employment) => ({
                  ...employment,
                  parentId: e.target.value,
                }))
              }
              className="border-2 border-black p-1 rounded-sm"
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
            <label htmlFor="salary">Månadslön (SEK)</label>
            <input
              name="salary"
              value={employmentToAdd?.monthlySalary || ""}
              type="number"
              min={0}
              onChange={(e) =>
                setEmploymentToAdd((employment) => ({
                  ...employment,
                  monthlySalary: Number(e.target.value),
                }))
              }
              className="border-2 border-black p-1 rounded-sm"
            />
          </div>
          <div className="flex justify-end m-2">
            <Button variant="primary" onClick={handleAddEmploymentClick}>
              Lägg till
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
