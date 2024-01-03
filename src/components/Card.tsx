import { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
  return (
    <div className="border-transparent shadow-sm shadow-black py-3 px-2 w-max rounded-md">
      {children}
    </div>
  );
}
