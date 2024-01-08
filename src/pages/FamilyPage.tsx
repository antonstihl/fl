import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import { useChildAdd, useChildren } from "../context/ChildContext";
import { convertToMyDate } from "../utils/DateUtilities";

function FamilyPage() {
  const children = useChildren();
  const addChild = useChildAdd();
  const [newChildName, setNewChildName] = useState("");
  const [newChildDOB, setNewChildDOB] = useState(new Date());

  return (
    <div className="m-4 flex flex-col gap-4">
      <Card>
        {children.length === 0 && (
          <p>No children configured. Please add below.</p>
        )}
        {children.map((c) => (
          <p>{`${c.id.length > 4 ? c.id.slice(0, 4) + "..." : c.id} - ${
            c.name
          }`}</p>
        ))}
      </Card>
      <Card title="Add child">
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
          <Button
            variant="primary"
            onClick={() =>
              addChild(
                crypto.randomUUID(),
                newChildName,
                convertToMyDate(newChildDOB)
              )
            }
          >
            Lägg till
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default FamilyPage;
