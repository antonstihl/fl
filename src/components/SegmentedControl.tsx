export type Option = {
  label: string;
  value: any;
};

export type Props = {
  options: Option[];
  optionValue: number;
  setOptionValue: (ov: number) => any;
};

export default function SegmentedControl({
  options,
  optionValue,
  setOptionValue,
}: Props) {
  const isActive = (o: Option) => {
    return optionValue === o.value;
  };

  const startButton = (option: Option) => {
    return (
      <button
        className={`rounded-l-md py-1 px-1 shadow-sm shadow-black border-green-700 border-2 ${
          isActive(option) ? "bg-green-700 text-white" : "bg-white"
        }`}
        onClick={() => setOptionValue(option.value)}
        key={option.value}
      >
        {option.label}
      </button>
    );
  };

  const middleButton = (option: Option) => {
    return (
      <button
        className={`py-1 px-1 shadow-sm shadow-black border-green-700 border-y-2 border-r-2 ${
          isActive(option) ? "bg-green-700 text-white" : "bg-white"
        }`}
        onClick={() => setOptionValue(option.value)}
        key={option.value}
      >
        {option.label}
      </button>
    );
  };

  const endButton = (option: Option) => {
    return (
      <button
        className={`rounded-r-md py-1 px-1 shadow-sm shadow-black border-green-700 border-y-2 border-r-2 ${
          isActive(option) ? "bg-green-700 text-white" : "bg-white"
        }`}
        onClick={() => setOptionValue(option.value)}
        key={option.value}
      >
        {option.label}
      </button>
    );
  };

  const startItem = options.length > 0 ? options[0] : undefined;
  const endItem = options.length > 1 ? options[options.length - 1] : undefined;
  const middleItems =
    options.length > 2 ? options.slice(1, options.length - 1) : [];

  return (
    <div className="flex justify-start items-center gap-0">
      {startItem && startButton(startItem)}
      {middleItems.map((mi) => middleButton(mi))}
      {endItem && endButton(endItem)}
    </div>
  );
}
