import { useState } from "react";
import {
  useLeaveAdd,
  useLeaveDelete,
  useLeaves,
} from "../context/LeaveContext";
import { ALL_WEEKDAYS, Parent, Weekday } from "../types/types";
import { convertToDate } from "../utils/DateUtilities";
import Button from "./Button";
import { useParents } from "../context/ParentContext";
import { useChildren } from "../context/ChildContext";

export default function () {
  const leaves = useLeaves();
  const deleteLeave = useLeaveDelete();
  const parents = useParents();
  const children = useChildren();

  const buildWeekdayString = (weekdays: Weekday[]) => {
    let weekdaysString = "";
    for (const weekday of ALL_WEEKDAYS) {
      weekdaysString += weekdays.includes(weekday)
        ? weekday.slice(0, 2) + " "
        : "   ";
    }
    console.log({ weekdaysString });
    return weekdaysString;
  };

  const cadenceTranslation = {
    daily: "Dag",
    weekly: "Vecka",
  };

  const getParentById = (id: string) => {
    return parents.find((p) => p.id === id);
  };
  const getChildById = (id: string) => {
    return children.find((p) => p.id === id);
  };

  return (
    <>
      <div className="m-2 flex flex-col gap-2">
        {leaves.length === 0 ? (
          <p className="px-2 pb-2">Inga scheman tillagda.</p>
        ) : (
          <table className="border-separate border-spacing-x-2 border-spacing-y-1">
            <thead>
              <tr className="text-left">
                <th>Förälder</th>
                <th>Barn</th>
                <th>Start</th>
                <th>Slut</th>
                <th>Ledig</th>
                <th>FP</th>
                <th>Frekvens</th>
                <th style={{ textAlign: "center" }}>Dagar</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((l) => (
                <tr key={l.id}>
                  <td>{getParentById(l.parentId)?.name}</td>
                  <td>{getChildById(l.childId)?.name}</td>
                  <td>
                    {convertToDate(l.startDate).toLocaleDateString("sv-SE")}
                  </td>
                  <td>
                    {convertToDate(l.endDate).toLocaleDateString("sv-SE")}
                  </td>
                  <td>{l.pace}</td>
                  <td>{l.payment}</td>
                  <td>{cadenceTranslation[l.cadence]}</td>
                  <td
                    style={{
                      fontFamily: "monospace",
                      whiteSpace: "break-spaces",
                    }}
                  >
                    {l.cadence === "weekly" && buildWeekdayString(l.weekdays)}
                  </td>
                  <td>
                    <Button variant="delete" onClick={() => deleteLeave(l.id)}>
                      x
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
