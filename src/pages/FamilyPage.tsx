import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import {
  useChildAdd,
  useChildDelete,
  useChildren,
} from "../context/ChildContext";
import {
  useParentAdd,
  useParentDelete,
  useParents,
} from "../context/ParentContext";
import { convertToMyDate } from "../utils/DateUtilities";

function FamilyPage() {
  const children = useChildren();
  const addChild = useChildAdd();
  const deleteChild = useChildDelete();
  const parents = useParents();
  const deleteParent = useParentDelete();
  const addParent = useParentAdd();
  const [newChildName, setNewChildName] = useState("");
  const [newChildDOB, setNewChildDOB] = useState<Date | undefined>(undefined);
  const [newParentName, setNewParentName] = useState("");

  return (
    <div className="flex m-4 gap-4 flex-col lg:flex-row">
      <div className="flex flex-col gap-4">
        <Card title="Barn" width="w-full">
          <div className="m-2">
            {children.length === 0 ? (
              <p>Inga barn tillagda.</p>
            ) : (
              <ul className="list-disc list-inside flex flex-col gap-2">
                {children.map((c) => (
                  <li key={c.id} className="flex items-center gap-2">
                    <Button variant="delete" onClick={() => deleteChild(c.id)}>
                      X
                    </Button>
                    {`
                ${c.name}${
                      c.dateOfBirth
                        ? ", " +
                          c.dateOfBirth.year +
                          "-" +
                          c.dateOfBirth.month.toString().padStart(2, "0") +
                          "-" +
                          c.dateOfBirth.date
                        : ""
                    }`}
                    <span title={c.id}>
                      {` (${
                        c.id.length > 9 ? c.id.slice(0, 9) + "..." : c.id
                      })`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
        <Card title="Lägg till barn">
          <form className="grid grid-cols-2 m-2 items-center">
            <label htmlFor="name">Namn</label>
            <input
              type="text"
              name="name"
              className="border-2 border-black m-2 p-1"
              onChange={(e) => setNewChildName(e.target.value)}
            />
            <label htmlFor="dateOfBirth">Födelsedatum</label>
            <input
              type="date"
              name="dateOfBirth"
              max={"3000-01-01"}
              min={"1990-01-01"}
              className="border-2 border-black m-2 p-1"
              onChange={(e) => setNewChildDOB(new Date(e.target.value))}
            />
          </form>
          <div className="flex justify-end m-4">
            <Button
              variant="primary"
              onClick={() =>
                addChild(
                  crypto.randomUUID(),
                  newChildName,
                  newChildDOB && convertToMyDate(newChildDOB)
                )
              }
            >
              Lägg till
            </Button>
          </div>
        </Card>
      </div>
      <div className="flex flex-col gap-4">
        <Card title="Föräldrar" width="w-full">
          <div className="m-2">
            {parents.length === 0 ? (
              <p>Inga föräldrar tillagda.</p>
            ) : (
              <ul className="list-disc list-inside flex flex-col gap-2">
                {parents.map((p) => (
                  <li key={p.id} className="flex items-center gap-2">
                    <Button variant="delete" onClick={() => deleteParent(p.id)}>
                      X
                    </Button>
                    {p.name}
                    <span title={p.id}>
                      {` (${
                        p.id.length > 9 ? p.id.slice(0, 9) + "..." : p.id
                      })`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
        <Card title="Lägg till förälder">
          <form className="grid grid-cols-2 m-2 items-center">
            <label htmlFor="name">Namn</label>
            <input
              type="text"
              name="name"
              className="border-2 border-black m-2 p-1"
              onChange={(e) => setNewParentName(e.target.value)}
            />
          </form>
          <div className="flex justify-end m-4">
            <Button variant="primary" onClick={() => addParent(newParentName)}>
              Lägg till
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default FamilyPage;
