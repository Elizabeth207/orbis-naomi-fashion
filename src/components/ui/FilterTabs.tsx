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
    <div className="inline-flex border border-line rounded-sm overflow-hidden mx-auto w-fit divide-x divide-line">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-5 py-2.5 text-sm font-medium transition-colors ${
            option.value === activeValue
              ? 'bg-ink text-paper'
              : 'bg-paper text-ink-soft hover:text-ink'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
