import { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
  return (
    <div className="border-transparent shadow-sm shadow-black flex flex-col items-center w-max py-3 px-2 rounded-md">
      {children}
    </div>
  );
}
