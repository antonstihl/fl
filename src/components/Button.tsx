export type Variant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({ variant = 'secondary', ...props }: ButtonProps) {
  const colorStyle =
    variant === "primary"
      ? "bg-green-300"
      : variant === "secondary"
      ? "bg-white"
      : "";
  const hoverColorStyle =
    "hover:" + colorStyle.slice(0, colorStyle.length - 3) + "400";
  return (
    <button
      className={`${colorStyle} rounded-md border-black px-2 py-1 ${hoverColorStyle} active:shadow-sm active:shadow-black shadow-md shadow-black flex items-center justify-center ${
        props.disabled ? "cursor-not-allowed" : ""
      }`}
      {...props}
    >
      {props.children}
    </button>
  );
}
