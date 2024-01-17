import { PropsWithChildren } from "react";

type CardWidth = "full" | "max";

export type Props = PropsWithChildren & {
  width?: CardWidth;
  title?: string;
};

export default function Card({ children, width = "max", title }: Props & {}) {
  return (
    <div
      className={`border-transparent shadow-sm shadow-black py-3 px-2 ${width} rounded-sm bg-white`}
    >
      {title && <h1 className="px-2 py-2 text-xl font-bold">{title}</h1>}
      {children}
    </div>
  );
}
