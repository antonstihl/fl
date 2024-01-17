import { PropsWithChildren } from "react";

export default function Modal({ children }: PropsWithChildren) {
  return (
    <div className="m-0 w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 z-30">
      <div className="m-2 flex justify-center items-center h-full">{children}</div>
    </div>
  );
}
