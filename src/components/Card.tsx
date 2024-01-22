import { PropsWithChildren, useState } from "react";

type CardWidth = "full" | "max";

export type Props = PropsWithChildren & {
  width?: CardWidth;
  title?: string;
  collapsible?: boolean;
};

export default function Card({
  children,
  width = "max",
  title,
  collapsible = false,
}: Props & {}) {
  const [isCollapsed, setIsCollapsed] = useState(collapsible);
  return (
    <div
      className={`border-transparent shadow-sm shadow-black py-3 px-2 ${width} rounded-sm bg-white`}
    >
      {title && !collapsible && (
        <h2
          className="px-2 py-2 text-xl font-bold"
          onClick={() => collapsible && setIsCollapsed((c) => !c)}
        >
          {title}
        </h2>
      )}
      {title && collapsible && (
        <div
          className="flex items-center gap-2 px-2 select-none cursor-pointer"
          onClick={() => collapsible && setIsCollapsed((c) => !c)}
        >
          <svg
            data-accordion-icon
            className={`w-3 h-3 ${isCollapsed && "rotate-180"} shrink-0`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      )}
      {!isCollapsed && children}
    </div>
  );
}
