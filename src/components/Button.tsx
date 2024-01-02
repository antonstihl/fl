export type Variant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({
  variant = "secondary",
  ...props
}: ButtonProps) {
  let variantStyle;
  switch (variant) {
    case "primary":
      variantStyle =
        "text-slate-200 bg-green-700 hover:bg-green-900 shadow-black shadow-md active:shadow-sm active:shadow-black";
      break;
    case "secondary":
      variantStyle =
        "bg-white shadow-black hover:bg-green-700 hover:text-slate-200 shadow-md active:shadow-sm active:shadow-black text-black";
  }
  const shadowStyle =
    variant === "primary"
      ? "shadow-black shadow-md active:shadow-sm active:shadow-black"
      : "shadow-black shadow-sm";

  return (
    <button
      className={`${variantStyle} rounded-md border-black px-2 py-1 ${shadowStyle} flex items-center justify-center ${
        props.disabled ? "cursor-not-allowed" : ""
      }`}
      {...props}
    >
      {props.children}
    </button>
  );
}
