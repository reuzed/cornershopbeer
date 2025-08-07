import React, { useState, useMemo } from "react";

export interface Option {
  value: string;
  label: string;
}

interface SearchableDropdownProps {
  options: Option[];
  selected: string | null;
  setSelected: (value: string | null) => void;
  placeholder?: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  selected,
  setSelected,
  placeholder = "Search...",
}) => {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);

  const filteredOptions = useMemo(() => {
    if (!query) return options;
    const lower = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(lower));
  }, [query, options]);

  const handleSelect = (value: string) => {
    setSelected(value);
    setQuery(options.find((o) => o.value === value)?.label || "");
    setShowList(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowList(true);
          setSelected(null);
        }}
        onFocus={() => setShowList(true)}
        onBlur={() => {
          // delay hide to capture click
          setTimeout(() => setShowList(false), 150);
        }}
        className="w-full px-4 py-2 border rounded focus:outline-none"
      />
      {showList && filteredOptions.length > 0 && (
        <ul className="absolute z-10 left-0 right-0 max-h-60 overflow-y-auto bg-white border border-gray-200 shadow-lg">
          {filteredOptions.map((o) => (
            <li
              key={o.value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer lowercase"
              onMouseDown={() => handleSelect(o.value)}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
      {selected && <input type="hidden" value={selected} />}
    </div>
  );
};

export default SearchableDropdown;
