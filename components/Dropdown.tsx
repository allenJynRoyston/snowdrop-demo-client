import React, { useState, useRef, useEffect, MouseEvent } from 'react';

// Define types for the Dropdown props
interface DropdownProps {
  items: string[];
  onSelect: (item: string) => void;
  onClose: () => void;
}

// Dropdown component
const Dropdown: React.FC<DropdownProps> = ({ items, onSelect, onClose }) => {
  return (
    <ul className="absolute bg-white border border-gray-300 mt-2 w-full shadow-lg z-10">
      {items.map((item) => (
        <li
          key={item}
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            onSelect(item);
            onClose();
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

// Define types for the InputButtonWithDropdown state
type Item = 'Item A' | 'Item B' | 'Item C';

const InputButtonWithDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Item | ''>('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Handle item selection
  const handleSelect = (item: Item) => setSelectedItem(item);

  // Close dropdown if clicked outside
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
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 border rounded bg-blue-500 text-white"
      >
        {selectedItem || 'Select an item'}
      </button>
      {isOpen && (
        <div ref={dropdownRef}>
          <Dropdown
            items={['Item A', 'Item B', 'Item C']}
            onSelect={handleSelect}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default InputButtonWithDropdown;