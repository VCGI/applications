import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';

interface DropdownOption {
  displayLabel: string;
  actualValue: string;
  sortKey: string; 
}

interface FilterableSelectProps {
  options: DropdownOption[];
  value: string; // actualValue of the selected option
  onChange: (selectedValue: string) => void; // callback with actualValue
  placeholder?: string;
  ariaLabel?: string;
}

const FilterableSelect: React.FC<FilterableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "-- Please choose an option --",
  ariaLabel = "Filterable select",
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<DropdownOption[]>(options);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Effect to update input display when external value changes
  useEffect(() => {
    const selectedOption = options.find(opt => opt.actualValue === value);
    setInputValue(selectedOption ? selectedOption.displayLabel : '');
    if (!value) { // If value is cleared externally, also clear filtered options to show all
        setFilteredOptions(options);
    }
  }, [value, options]);

  // Effect for filtering options based on input
  useEffect(() => {
    if (inputValue === '' && !isOpen) { // if input is empty and dropdown not explicitly opened
        setFilteredOptions(options); // show all options if input is cleared
        return;
    }
    if (isOpen) { // Only filter if dropdown is open or input is actively being typed into
        const lowercasedInput = inputValue.toLowerCase();
        const newFilteredOptions = options.filter(option =>
          option.displayLabel.toLowerCase().includes(lowercasedInput)
        );
        setFilteredOptions(newFilteredOptions);
    }
  }, [inputValue, options, isOpen]);

  // Effect for handling clicks outside the component to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset input to selected value's displayLabel if user clicks away without selecting
        const selectedOption = options.find(opt => opt.actualValue === value);
        setInputValue(selectedOption ? selectedOption.displayLabel : '');

      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [value, options]); // Added options to dependencies

  // Scroll to highlighted item
   useEffect(() => {
    if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length && listRef.current) {
      const listItem = listRef.current.children[highlightedIndex] as HTMLLIElement;
      if (listItem) {
        listItem.scrollIntoView({ block: 'nearest', inline: 'start' });
      }
    }
  }, [highlightedIndex, filteredOptions]);


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);
    setIsOpen(true); // Open dropdown on input change
    setHighlightedIndex(-1); // Reset highlight
  };

  const handleOptionClick = (option: DropdownOption) => {
    setInputValue(option.displayLabel);
    onChange(option.actualValue);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsOpen(true);
    // If input is already the displayLabel of the selected value, don't filter initially
    const selectedOption = options.find(opt => opt.actualValue === value);
    if (selectedOption && inputValue === selectedOption.displayLabel) {
        setFilteredOptions(options); // Show all options initially
    } else {
        // Otherwise, filter based on current (potentially partial) input
        const lowercasedInput = inputValue.toLowerCase();
        setFilteredOptions(options.filter(opt => opt.displayLabel.toLowerCase().includes(lowercasedInput)));
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter')) {
        setIsOpen(true); // Open dropdown with arrow keys or Enter if closed
        // When opening with keys, if input matches a selected value, show all options, else filter
        const currentSelectedOption = options.find(opt => opt.actualValue === value);
        if (currentSelectedOption && inputValue === currentSelectedOption.displayLabel) {
            setFilteredOptions(options);
        } else {
            const lowercasedInput = inputValue.toLowerCase();
            setFilteredOptions(options.filter(opt => opt.displayLabel.toLowerCase().includes(lowercasedInput)));
        }
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex(prevIndex =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
        break;
      case 'Enter':
        event.preventDefault();
        if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        } else if (isOpen && filteredOptions.length === 1) {
          // If there's only one option and Enter is pressed, select it
          handleOptionClick(filteredOptions[0]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        // Reset input to selected value's displayLabel if user Escapes
        const selectedOpt = options.find(opt => opt.actualValue === value);
        setInputValue(selectedOpt ? selectedOpt.displayLabel : '');
        setHighlightedIndex(-1);
        break;
      default:
        break;
    }
  };
  
  const isOptionSelected = (option: DropdownOption) => option.actualValue === value;

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm appearance-none bg-white hover:border-blue-500 transition duration-150 ease-in-out text-slate-900"
        aria-label={ariaLabel}
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls="filterable-select-listbox"
        aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 3a.75.75 0 01.53.22l3.5 3.5a.75.75 0 01-1.06 1.06L10 4.81 6.53 8.28a.75.75 0 01-1.06-1.06l3.5-3.5A.75.75 0 0110 3zm-.53 13.56a.75.75 0 011.06 0l3.5-3.5a.75.75 0 01-1.06-1.06L10 15.19l-3.47-3.47a.75.75 0 01-1.06 1.06l3.5 3.5z" clipRule="evenodd" />
        </svg>
      </div>

      {isOpen && (
        <ul
          ref={listRef}
          id="filterable-select-listbox"
          role="listbox"
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 overflow-auto focus:outline-none sm:text-sm border border-slate-300"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={option.actualValue + option.displayLabel} // Ensure unique key
                id={`option-${index}`}
                role="option"
                aria-selected={isOptionSelected(option)}
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 transition-colors duration-150 ease-in-out
                  ${highlightedIndex === index ? 'bg-[#007834] text-white' : 'text-slate-900'}
                  ${isOptionSelected(option) && highlightedIndex !== index ? 'bg-[#003300] text-white' : ''}
                  ${isOptionSelected(option) && highlightedIndex === index ? 'bg-[#007834] text-white' : ''} 
                  hover:bg-[#007834] hover:text-white 
                `}
              >
                <span className={`block truncate ${isOptionSelected(option) ? 'font-semibold' : 'font-normal'}`}>
                  {option.displayLabel}
                </span>
                {isOptionSelected(option) && (
                  <span
                    className={`absolute inset-y-0 right-0 flex items-center pr-4 
                      ${highlightedIndex === index ? 'text-white' : 'text-green-700'}
                      ${isOptionSelected(option) && highlightedIndex !==index ? 'text-white' : ''}
                    `}
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </li>
            ))
          ) : (
            <li className="cursor-default select-none relative py-2 pl-3 pr-9 text-slate-700">
              No options found.
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default FilterableSelect;
