import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import DropdownMenu from '@component/DropdownMenu';
import {DropdownProps} from '@type/type'

export default function Dropdown<T>({items = ["None"] as unknown as T[], defaultSelection = 0, onSelection}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<T | ''>(items[defaultSelection]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // -------------------------------
  function toggleDropdown(){
    setIsOpen((prev) => !prev)
  }
  // -------------------------------

  // -------------------------------
  function handleSelect(item: T){
    setSelectedItem(item)
    onSelection(item)
  };
  // -------------------------------

  // -------------------------------
  function handleClickOutside(event: Event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }
  // -------------------------------

  // -------------------------------
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // -------------------------------

  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 border rounded bg-slate-500 text-white w-full"
      >
        {String(selectedItem)}
      </button>
      {isOpen && (
        <div ref={dropdownRef}>
          <DropdownMenu
            items={items}
            onSelect={handleSelect}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
};