import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLeaveAdd } from "../context/LeaveContext";
import { NewSchedule, NewScheduleSchema } from "../types/types";
import Button from "./Button";
import Card from "./Card";
import Modal from "./Modal";

type Props = {
  close: () => any;
};

export default function AddSchedule({ close }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewSchedule>({ resolver: zodResolver(NewScheduleSchema) });

  const addLeave = useLeaveAdd();

  const onSubmit: SubmitHandler<NewSchedule> = (data) => {
    addLeave(data);
    reset();
    close();
  };

  return (
    <Modal>
      <Card title="Skapa schema">
        <div className="m-2">
          {/* <ul>
            {leaves.map((l) => (
              <li key={l.pace}>{JSON.stringify(l)}</li>
            ))}
          </ul> */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-1 items-center"
          >
            <label>Start</label>
            <input
              type="date"
              className={"border border-black p-1 rounded-sm"}
              min="1900-01-01"
              max="3000-01-01"
              defaultValue={new Date().toLocaleDateString("sv-SE")}
              {...register("startDate", {
                required: true,
                valueAsDate: true,
              })}
            />
            <p className="text-red-800 col-span-2">
              {errors.startDate?.message}
            </p>
            <label>Slut</label>
            <input
              type="date"
              className={"border border-black p-1 rounded-sm"}
              min="1900-01-01"
              max="3000-01-01"
              defaultValue={new Date().toLocaleDateString("sv-SE")}
              {...register("endDate", {
                required: true,
                valueAsDate: true,
              })}
            />
            <p className="text-red-800 col-span-2">{errors.endDate?.message}</p>
            <label>Ledig</label>
            <input
              type="number"
              step="any"
              className={"border border-black p-1 rounded-sm"}
              {...register("pace", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <p className="text-red-800 col-span-2">{errors.pace?.message}</p>
            <label>Föräldrapenning</label>
            <input
              type="number"
              step="any"
              className={"border border-black p-1 rounded-sm"}
              {...register("payment", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <p className="text-red-800 col-span-2">{errors.payment?.message}</p>
            <label>Frekvens</label>
            <select
              className={"border border-black p-1 rounded-sm"}
              {...register("cadence", { required: true })}
            >
              <option value="daily">Varje dag</option>
              <option value="weekly">Varje vecka</option>
            </select>
            <p className="text-red-800 col-span-2">{errors.payment?.message}</p>
            <p className="text-red-800 col-span-2">
              {Object.values(errors)
                .filter((v) => v.type === "custom")
                .map((v) => v.message)}
            </p>
            <div className="flex justify-end w-full"></div>
            <div className="flex justify-end gap-2">
              <Button type="submit" variant="primary">
                Lägg till
              </Button>
              <Button type="reset" variant="secondary" onClick={close}>
                Avbryt
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </Modal>
  );
}
