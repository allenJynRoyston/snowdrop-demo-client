import { DropdownMenuProps } from "@/types/type";

export default function DropdownMenu<T extends Record<string, any>>({ items, onSelect, onClose }: DropdownMenuProps<T>) {
  return (
    <ul className="absolute bg-white border border-gray-300 mt-2 w-full shadow-lg z-10">
      {items.map((item) => (
        <li
          key={String(item)} 
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