import {SmartTablePaginationProps} from '@type/type'

//----------------------
const classNames = {
  btn: 'hover:bg-slate-800 text-white font-bold py-2 px-4 rounded',
  active: 'bg-slate-700 text-white',
  inactive: 'bg-slate-500 '
};
//----------------------

export default function SmartTablePagination({ totalEntries, entriesPerPage, currentPage, handleClick}: SmartTablePaginationProps) {
  return (
    <div className="flex justify-center mt-4 gap-2">
      {Array.from({ length: Math.ceil(totalEntries / entriesPerPage) }, (_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`${classNames.btn} ${currentPage === index ? classNames.active : classNames.inactive}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}