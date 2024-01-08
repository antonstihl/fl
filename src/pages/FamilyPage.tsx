import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import { useChildAdd, useChildren } from "../context/ChildContext";

function FamilyPage() {
  const children = useChildren();
  const addChild = useChildAdd();
  const [newChildName, setNewChildName] = useState("");
  return (
    <div className="m-4 flex flex-col gap-4">
      <Card>
        {children.map((c) => (
          <p>{`${c.id.length > 4 ? c.id.slice(0, 4) + "..." : c.id} - ${
            c.name
          }`}</p>
        ))}
      </Card>
      <Card>
        <form>
          <label htmlFor="name">Namn</label>
          <input
            type="text"
            name="name"
            className="border-2 border-black m-2 p-1"
            onChange={(e) => setNewChildName(e.target.value)}
          />
          <Button
            variant="primary"
            onClick={() => addChild(crypto.randomUUID(), newChildName)}
          >
            Lägg till
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default FamilyPage;
