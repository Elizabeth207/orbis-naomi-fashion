interface FilterOption {
  value: string;
  label: string;
}

interface FilterTabsProps {
  options: FilterOption[];
  activeValue: string;
  onChange: (value: string) => void;
}

export default function FilterTabs({ options, activeValue, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap justify-center max-w-full w-full sm:w-auto border border-line rounded-sm overflow-hidden mx-auto divide-x divide-y sm:divide-y-0 divide-line">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`min-w-0 flex-1 basis-[calc(50%-1px)] sm:flex-none sm:basis-auto px-2 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors text-center leading-snug ${
            option.value === activeValue
              ? "bg-ink text-paper"
              : "bg-paper text-ink-soft hover:text-ink"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
