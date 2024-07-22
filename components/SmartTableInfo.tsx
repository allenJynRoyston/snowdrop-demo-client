import React from 'react';
import Dropdown from '@component/Dropdown';
import {SmartTableInfoProps} from '@type/type'

export default function SmartTableInfo<T>({ data, onSizeSelection }: SmartTableInfoProps<T>) {
  return (
    <div className="flex gap-10 items-center justify-between text-black">
      <p>Total entries: {data.length}</p>
      <div className="flex gap-2 items-center">
        <p>List size:</p>
        <div className="w-[200px] text-black">
          <Dropdown
            items={[50, 100, 150, 200]}
            defaultSelection={0}
            onSelection={onSizeSelection}
          />
        </div>
      </div>
    </div>
  );
};
