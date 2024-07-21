import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import {DropdownProps} from '@type/type'


const Dropdown = <T,>({ items, onSelect, onClose }: DropdownProps<T>) => {
  return (
    <ul className="absolute bg-white border border-gray-300 mt-2 w-full shadow-lg z-10">
      {items.map((item) => (
        <li
          key={String(item)} // Ensure the key is a string
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            onSelect(item);
            onClose();
          }}
        >
          {String(item)} 
        </li>
      ))}
    </ul>
  );
};

const InputButtonWithDropdown = <T,>({ items, defaultText = "Select an option", onSelection }: { items: T[], defaultText:String , onSelection:(_val:unknown) => {} }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<T | ''>('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (item: T) => {
    setSelectedItem(item)
    onSelection(item)
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 border rounded bg-slate-500 text-white w-full"
      >
        {selectedItem || defaultText}
      </button>
      {isOpen && (
        <div ref={dropdownRef}>
          <Dropdown
            items={items}
            onSelect={handleSelect}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default InputButtonWithDropdown;