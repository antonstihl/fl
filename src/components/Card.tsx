import { PropsWithChildren } from "react";

export type Props = PropsWithChildren & {
  width?: string;
  title?: string;
};

export default function Card({ children, width = "w-max", title }: Props & {}) {
  return (
    <div className={`border-transparent shadow-sm shadow-black py-3 px-2 ${width} rounded-md bg-white`}>
      {title && <h1 className="px-2 py-2 text-xl font-bold">{title}</h1>}
      {children}
    </div>
  );
}
