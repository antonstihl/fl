export type Variant = "primary" | "secondary" | "delete" | "select";

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
        "text-white bg-green-700 hover:bg-green-900 shadow-black shadow-md active:shadow-sm active:shadow-black";
      break;
    case "secondary":
      variantStyle =
        "bg-white shadow-black hover:bg-green-700 hover:text-white shadow-md active:shadow-sm active:shadow-black text-black";
      break;
    case "delete":
      variantStyle =
        "bg-white shadow-black hover:bg-red-800 hover:text-white shadow-md active:shadow-sm active:shadow-black text-black";
      break;
    case "select":
      variantStyle =
        "text-white bg-blue-500 hover:bg-blue-700 shadow-black shadow-md active:shadow-sm active:shadow-black";
  }
  const shadowStyle =
    variant === "primary"
      ? "shadow-black shadow-md active:shadow-sm active:shadow-black"
      : "shadow-black shadow-sm";

  return (
    <button
      className={`${variantStyle} rounded-l-full rounded-r-full border-black px-3 py-1 ${shadowStyle} flex items-center justify-center ${
        props.disabled ? "cursor-not-allowed" : ""
      }`}
      {...props}
    >
      {props.children}
    </button>
  );
}
