import React, { useMemo, useState } from "react";
import Icon from "./Icon";

const SearchCombo = () => {
  // Demo grouped dataset; replace with real data via props when available
  const employees = useMemo(
    () => [
      { name: "Bender, Ruth", dept: "Marketing" },
      { name: "Rupert, Murdock", dept: "Product Development" },
      { name: "Varun, Nair", dept: "Human Resources" },
    ],
    []
  );

  const rules = useMemo(
    () => [
      "Paycode",
      "Leave",
      "Public Holidays",
      "Slacktime",
      "Position Priority",
    ],
    []
  );

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const qLower = query.trim().toLowerCase();

  const filteredEmployees = useMemo(() => {
    if (!qLower) return [];
    return employees.filter((e) => e.name.toLowerCase().includes(qLower));
  }, [employees, qLower]);

  const filteredRules = useMemo(() => {
    if (!qLower) return [];
    return rules.filter((r) => r.toLowerCase().includes(qLower));
  }, [rules, qLower]);

  const hasAnyResults = filteredEmployees.length > 0 || filteredRules.length > 0;

  const getHighlightedText = (text, highlight) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-300 text-gray-900 font-semibold rounded-sm">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const handleSelect = (value) => {
    setQuery(value);
    setShowDropdown(false);
  };

  const shouldShowDropdown = showDropdown && query.trim().length > 0;

  return (
    <div className="relative w-full">
      <div
        className="self-stretch p-3 bg-zinc-100 rounded-lg inline-flex w-full justify-start items-center gap-2.5 overflow-hidden"
        role="search"
        aria-label="Global search"
      >
        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          placeholder="Search Employees, Rules, Reports etc"
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-neutral-500 text-base font-normal font-['Poppins']"
        />

        <div className="flex justify-end items-center gap-3">
          {/* Filter icon */}
          <button
            type="button"
            aria-label="Filter"
            className="size-6 grid place-items-center rounded-md text-zinc-700 hover:bg-zinc-200 transition"
            onMouseDown={(e) => e.preventDefault()}
          >
            <Icon name="filter_alt" size={24} type="symbols" />
          </button>

          {/* Search icon */}
          <button
            type="button"
            aria-label="Search"
            className="size-6 grid place-items-center rounded-md text-zinc-700 hover:bg-zinc-200 transition"
            onMouseDown={(e) => e.preventDefault()}
          >
            <Icon name="Search" size={24} />
          </button>
        </div>
      </div>

      {/* Dropdown - Figma styled, only when typing */}
      {shouldShowDropdown && hasAnyResults && (
        <div className="w-full p-4 bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden mt-2 z-20 animate-fadeIn">
          {/* Employees section */}
          {filteredEmployees.length > 0 && (
            <div className="self-stretch pb-4 border-b border-zinc-300 flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch pb-2 border-b border-zinc-300 inline-flex justify-start items-center gap-2.5">
                <div className="justify-start text-black text-base font-medium font-['Poppins']">Employees</div>
              </div>

              {filteredEmployees.map((emp, i) => (
                <div key={i} className="self-stretch inline-flex justify-start items-start gap-2.5">
                  <button
                    type="button"
                    className="size- flex justify-center items-center gap-2.5 text-left"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(emp.name)}
                  >
                    <div className="justify-start text-black text-base font-normal font-['Poppins']">
                      {getHighlightedText(emp.name, query)}
                    </div>
                  </button>
                  <div className="flex-1 flex justify-end items-center gap-2.5">
                    <div className="justify-start text-black text-base font-light font-['Poppins']">{emp.dept}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rules section */}
          {filteredRules.length > 0 && (
            <>
              <div className="self-stretch pb-2 border-b border-zinc-300 inline-flex justify-start items-center gap-2.5">
                <div className="justify-start text-black text-base font-medium font-['Poppins']">LSL Rules Engine</div>
              </div>

              {filteredRules.map((rule, i) => (
                <div key={i} className="self-stretch inline-flex justify-start items-start gap-2.5">
                  <button
                    type="button"
                    className="size- flex justify-center items-center gap-2.5 text-left"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(rule)}
                  >
                    <div className="justify-start text-black text-base font-normal font-['Poppins']">
                      {getHighlightedText(rule, query)}
                    </div>
                  </button>
                  <div className="flex-1 h-6" />
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* Empty-state when typing but no results */}
      {shouldShowDropdown && !hasAnyResults && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-200 mt-2 rounded-xl shadow-lg max-h-56 overflow-y-auto z-20 animate-fadeIn">
          <li className="px-4 py-3 text-gray-600 italic">No results found</li>
        </ul>
      )}

      {/* Inline keyframes for fadeIn animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default SearchCombo;