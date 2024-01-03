import { PropsWithChildren } from "react";

export type Props = PropsWithChildren & {
  width?: string;
};

export default function Card({ children, width = "w-max" }: Props & {}) {
  return (
    <div className={`border-transparent shadow-sm shadow-black py-3 px-2 ${width} rounded-md`}>
      {children}
    </div>
  );
}
