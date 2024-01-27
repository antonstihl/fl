import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useChildren } from "../context/ChildContext";
import { useLeaveAdd } from "../context/LeaveContext";
import { useParents } from "../context/ParentContext";
import { NewSchedule, NewScheduleSchema } from "../types/types";
import Button from "./Button";
import Card from "./Card";
import Modal from "./Modal";
import WeekdaySelect from "./WeekdaySelect";

type Props = {
  close: () => any;
};

export default function AddSchedule({ close }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    getValues,
    watch,
  } = useForm<NewSchedule>({
    resolver: zodResolver(NewScheduleSchema),
    defaultValues: {
      cadence: "daily",
    },
  });
  const addLeave = useLeaveAdd();
  const parents = useParents();
  const children = useChildren();

  console.log({ values: getValues() });

  const onSubmit: SubmitHandler<NewSchedule> = (data) => {
    console.log(data);
    addLeave(data);
    reset();
    close();
  };

  const todayDateString = new Date().toLocaleDateString("sv-SE");

  return (
    <Modal>
      <Card title="Skapa schema">
        <div className="m-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-1 items-center"
          >
            <label>Förälder</label>
            <select
              autoFocus
              className={"border border-black p-1 rounded-sm"}
              {...register("parentId", {
                required: true,
              })}
            >
              {parents.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <p className="text-red-800 col-span-2">
              {errors.parentId?.message}
            </p>
            <label>Barn</label>
            <select
              className={"border border-black p-1 rounded-sm"}
              {...register("childId", {
                required: true,
              })}
            >
              {children.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <p className="text-red-800 col-span-2">{errors.childId?.message}</p>
            <label>Start</label>
            <input
              type="date"
              defaultValue={todayDateString}
              className={"border border-black p-1 rounded-sm"}
              min="1900-01-01"
              max="3000-01-01"
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
              defaultValue={todayDateString}
              className={"border border-black p-1 rounded-sm"}
              min="1900-01-01"
              max="3000-01-01"
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
              {...register("cadence", {
                required: true,
              })}
            >
              <option value="daily" id="daily">
                Varje dag
              </option>
              <option value="weekly" id="weekly">
                Varje vecka
              </option>
            </select>
            {watch().cadence == "weekly" && (
              <>
                <label>Veckodagar</label>
                <Controller
                  control={control}
                  name="weekdays"
                  render={({ field: { onChange, value } }) => (
                    <WeekdaySelect onChange={onChange} value={value} />
                  )}
                />
              </>
            )}
            <p className="text-red-800 col-span-2">{errors.cadence?.message}</p>
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
