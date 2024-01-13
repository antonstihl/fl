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
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";

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
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);
  const [isAddParentModalOpen, setIsAddParentModalOpen] = useState(false);
  const [childToDelete, setChildToDelete] = useState<Child | undefined>(
    undefined
  );
  const [parentToDelete, setParentToDelete] = useState<Parent | undefined>(
    undefined
  );

  const handleAddChildClick = () => {
    setIsAddChildModalOpen(true);
  };

  const handleAddChild = () => {
    addChild(
      crypto.randomUUID(),
      newChildName,
      newChildDOB && convertToMyDate(newChildDOB)
    );
    setIsAddChildModalOpen(false);
    setNewChildName("");
    setNewChildDOB(undefined);
  };

  const handleAddParentClick = () => {
    setIsAddParentModalOpen(true);
  };

  const handleAddParent = () => {
    addParent(newParentName);
    setIsAddParentModalOpen(false);
  };

  const handleDeleteChild = () => {
    if (childToDelete) {
      deleteChild(childToDelete.id);
    }
    setChildToDelete(undefined);
  };

  const handleDeleteParent = () => {
    if (parentToDelete) {
      deleteParent(parentToDelete.id);
    }
    setParentToDelete(undefined);
  };
  return (
    <>
      {isAddChildModalOpen && (
        <Modal>
          <Card title="Lägg till barn">
            <div className="grid grid-cols-2 m-2 items-center">
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
            </div>
            <div className="flex justify-end m-4 gap-2">
              <Button variant="primary" onClick={handleAddChild}>
                Lägg till
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsAddChildModalOpen(false)}
              >
                Avbryt
              </Button>
            </div>
          </Card>
        </Modal>
      )}
      {isAddParentModalOpen && (
        <Modal>
          <Card title="Lägg till förälder">
            <div className="grid grid-cols-2 m-2 items-center">
              <label htmlFor="name">Namn</label>
              <input
                type="text"
                name="name"
                className="border-2 border-black m-2 p-1"
                onChange={(e) => setNewParentName(e.target.value)}
              />
            </div>
            <div className="flex justify-end m-4 gap-2">
              <Button variant="primary" onClick={handleAddParent}>
                Lägg till
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsAddParentModalOpen(false)}
              >
                Avbryt
              </Button>
            </div>
          </Card>
        </Modal>
      )}
      {childToDelete && (
        <ConfirmModal
          text={`Vill du verkligen ta bort barnet ${childToDelete.name} (${childToDelete.id})?`}
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="primary" onClick={handleDeleteChild}>
                Ta bort
              </Button>
              <Button
                variant="secondary"
                onClick={() => setChildToDelete(undefined)}
              >
                Avbryt
              </Button>
            </div>
          }
        />
      )}
      {parentToDelete && (
        <ConfirmModal
          text={`Vill du verkligen ta bort föräldern ${parentToDelete.name} (${parentToDelete.id})?`}
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="primary" onClick={handleDeleteParent}>
                Ta bort
              </Button>
              <Button
                variant="secondary"
                onClick={() => setParentToDelete(undefined)}
              >
                Avbryt
              </Button>
            </div>
          }
        />
      )}
      <div className="flex m-4 justify-center">
        <div className="flex flex-col gap-4 items-center w-max">
          <Card title="Barn" width="full">
            <div className="m-2">
              {children.length === 0 ? (
                <p>Inga barn tillagda.</p>
              ) : (
                <ul className="list-disc list-inside flex flex-col gap-2">
                  {children.map((c) => (
                    <li key={c.id} className="flex items-center gap-2">
                      <Button
                        variant="delete"
                        onClick={() => setChildToDelete(c)}
                      >
                        x
                      </Button>
                      {`
                ${c.name}${
                        c.dateOfBirth
                          ? ", " +
                            c.dateOfBirth.year +
                            "-" +
                            c.dateOfBirth.month.toString().padStart(2, "0") +
                            "-" +
                            c.dateOfBirth.date.toString().padStart(2, "0")
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
            <div className="flex justify-end m-2">
              <Button variant="primary" onClick={handleAddChildClick}>
                Lägg till
              </Button>
            </div>
          </Card>
          <Card title="Föräldrar" width="full">
            <div className="m-2">
              {parents.length === 0 ? (
                <p>Inga föräldrar tillagda.</p>
              ) : (
                <ul className="list-disc list-inside flex flex-col gap-2">
                  {parents.map((p) => (
                    <li key={p.id} className="flex items-center gap-2">
                      <Button
                        variant="delete"
                        onClick={() => setParentToDelete(p)}
                      >
                        x
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
            <div className="flex justify-end m-2">
              <Button variant="primary" onClick={handleAddParentClick}>
                Lägg till
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default FamilyPage;
