import { useState } from "react";
import AddSchedule from "../components/AddSchedule";
import Button from "../components/Button";
import Card from "../components/Card";
import ScheduleList from "../components/ScheduleList";

export default function SchedulePage() {
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  return (
    <>
      {isAddScheduleModalOpen && (
        <AddSchedule close={() => setIsAddScheduleModalOpen(false)} />
      )}
      <div className="flex justify-center m-4">
        <div className="flex flex-col gap-4">
          <Card title="Scheman">
            <ScheduleList />
            <div className="w-full flex justify-end">
              <Button
                variant="secondary"
                onClick={() => setIsAddScheduleModalOpen(true)}
              >
                📅 Lägg till schema
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
