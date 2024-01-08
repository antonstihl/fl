import { PropsWithChildren } from "react";

export default function Modal({ children }: PropsWithChildren) {
  return (
    <div className="m-0 w-screen h-screen fixed top-12 bg-black bg-opacity-50 z-30">
      <div className="flex justify-center items-center h-full">{children}</div>
    </div>
  );
}
