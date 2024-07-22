//----------------------
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SmartTableProps, DynamicBooleanObject } from '@/types/type';

import SmartTableEmpty from '@component/SmartTableEmpty'
import SmartTablePagination from '@component/SmartTablePagination'
import SmartTableInfo from '@component/SmartTableInfo';
import Iconify from '@component/Iconify'
import Dropdown from '@component/Dropdown'
//----------------------

//----------------------
const classNames = {
  th: 'px-6 tracking-wider',
  headerBtn: 'py-3 w-full h-full text-left text-xs font-medium text-slate-800 uppercase font-bold flex items-center',
  td: 'px-6 py-4 text-black whitespace-nowrap',  
  input: 'border border-gray-300 shadow-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
}
//----------------------

//----------------------
export default function SmartTable<T extends Record<string, any>>({
  data,
  sortByKey = (_key, _reversed) => {},
  dropdownFunc = {},
  dropdownList = {},
  convertFunc = {},
  filterFunc = {},
  isFetching = true,
  hasError = false
}: SmartTableProps<T>) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [entriesPerPage, setEntriesPerPage] = useState<number>(50);
  const [headerData, setHeaderData] = useState<DynamicBooleanObject>();
  const [headers, setHeaders] = useState<T | undefined>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [elementWidths, setElementWidths] = useState<Record<string, number>>({});
  const tdRefs = useRef<Record<string, HTMLTableCellElement | null>>({});

  // -------------------------------
  useEffect(() => {
    const newWidths: Record<string, number> = {}
    Object.keys(tdRefs.current).forEach((key) => {
      const element = tdRefs.current[key]
      if (element) {
        newWidths[key] = element.offsetWidth
      }
    });

    setElementWidths(newWidths);
  }, [data])
  // -------------------------------

  // -------------------------------
  const tableHeaders = useMemo(() => {
    if (!isFetching && data.length > 0) {
      setHeaders(data[0]);
      return data[0];
    }
    return headers || {};
  }, [data, isFetching, headers])
  // -------------------------------

  // -------------------------------
  const memoizedHeaderData = useMemo(() => {
    if (!isFetching && data.length > 0 && !isLoaded && headerData === undefined) {
      const newHeaderData: DynamicBooleanObject = Object.keys(tableHeaders).reduce((acc, key) => {
        acc[key] = false
        return acc
      }, {} as DynamicBooleanObject)

      setIsLoaded(true);
      setHeaderData(newHeaderData)
      return newHeaderData;
    }
    return headerData;
  }, [data, isFetching, tableHeaders, headerData, isLoaded])
  // -------------------------------

  // -------------------------------
  function checkForConversions(key: string, val: string){
    if (convertFunc && convertFunc.hasOwnProperty(key)) {    
      // @ts-ignore  
      return convertFunc[key](val)
    }
    return val
  }
  // -------------------------------

  // -------------------------------
  function checkForFilter(key: string, val: string){
    if (filterFunc && filterFunc.hasOwnProperty(key)) {
      // @ts-ignore
      return filterFunc[key](val)
    }
    return val
  }
  // -------------------------------

  // -------------------------------
  function onPaginationUpdate(index: number){
    setCurrentPage(index)
  }
  // -------------------------------

  // -------------------------------
  function getPaginatedData(){
    if(data.length < currentPage * entriesPerPage){
      return data
    }
    return data.slice(currentPage * entriesPerPage, (currentPage + 1) * entriesPerPage)
  }
  // -------------------------------

  return (
    <>
      {data.length === 0 && !isFetching && !isLoaded ? (
        <SmartTableEmpty />
      ) : (
        <div className="overflow-x-auto pb-10">
          {isFetching ? (
            <>
              <p className='text-red-400 text-center'>
                The server is sleeping... waking it up now :D
                <br></br>
                (It could take a minute)
              </p>              
            </>
          ) : (
            <div className='flex flex-col gap-10 bg-slate-300 bg-opacity-70 min-h-[600px] p-10 rounded-xl'>
  
              <SmartTablePagination
                totalEntries={data.length}
                currentPage={currentPage}
                entriesPerPage={entriesPerPage}
                handleClick={onPaginationUpdate}
              />
  
              <SmartTableInfo data={data} onSizeSelection={(val) => setEntriesPerPage(val)} />
                  
              <table className="min-w-full divide-y divide-gray-200 text-xs">
                {/* ------------ HEADER ---------------- */}
                <thead className="bg-gray-100">
                  <tr>
                    {Object.keys(tableHeaders).map((key) => (
                      <th key={key} className={classNames.th}>
                        <button
                          className={classNames.headerBtn}
                          onClick={() => {
                            if (memoizedHeaderData && memoizedHeaderData.hasOwnProperty(key)) {
                              memoizedHeaderData[key] = !memoizedHeaderData[key];
                              setHeaderData({ ...memoizedHeaderData });
                              sortByKey(key, memoizedHeaderData[key]);
                            }
                          }}
                        >
                          {key.replaceAll("_", " ")}
                          {memoizedHeaderData && memoizedHeaderData.hasOwnProperty(key) ? (
                            <Iconify type={memoizedHeaderData[key] ? 'arrowdown' : 'arrowup'} />
                          ) : null}
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
  
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* ------------ FILTERS AND DROPDOWNS ---------------- */}
                  <tr>
                    {Object.keys(tableHeaders).map((key) => (
                      filterFunc.hasOwnProperty(key) ? (
                        <td key={key} className={classNames.td}>
                          <div className='flex gap-1 text-black items-center'>
                            <Iconify type='filter' height={15} width={15} />
                            <input
                              type="text"
                              className={`${classNames.input} w-full`}
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => { checkForFilter(key, event.target.value) }}
                            />
                          </div>
                        </td>
                      ) : (
                        dropdownFunc.hasOwnProperty(key) ? (
                          <td key={key} className={classNames.td}>
                            <div className='flex gap-1 text-black items-center w-min-[150px]'>
                              <Dropdown 
                                defaultSelection={0}
                                items={dropdownList[key]}  
                                onSelection={(val) => {
                                   // @ts-ignore
                                  dropdownFunc[key](val)                              
                                }}
                              />
                            </div>
                          </td>
                        ) : (
                          <td key={key} className={classNames.td}></td>
                        )
                      )
                    ))}
                  </tr>
                 
                  {data.length === 0 ? (
                    /* ------------ WHEN EMPTY, PRESERVES THE CORRECT WIDTH OF THE GRID ---------------- */
                    <tr className='w-full'>
                      {Object.keys(tableHeaders).map((key) => (
                        <td key={key} className={classNames.td} style={{ "width": `${elementWidths[key]}px` }}>
                          {elementWidths[key]}
                        </td>
                      ))}
                    </tr>
                  ) : (
                    /* ------------ GRID CONTENT ------------------------------------------------------- */
                    getPaginatedData().map((item) => (
                      <tr key={item._id}>
                        {Object.keys(tableHeaders).map((key) => (
                          <td
                            key={key}
                            className={classNames.td}
                             // @ts-ignore
                            ref={(el) => (tdRefs.current[key] = el)}
                          >
                            {checkForConversions(key, item[key as keyof T])}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              

              <SmartTablePagination
                totalEntries={data.length}
                currentPage={currentPage}
                entriesPerPage={entriesPerPage}
                handleClick={onPaginationUpdate}
              />
  
            </div>
          )}
        </div>
      )}
    </>
  );
  
}