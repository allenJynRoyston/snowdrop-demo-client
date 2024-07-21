"use client"

// ------------------------
import React, { useState, useEffect  } from 'react';
import {TypeTransaction, TransactionStatus} from '@type/type'
import {apiUrl} from '@config/config'

import SmartTable from '@component/SmartTable'
// ------------------------


// ------------------------
export default function TransactionsPage() {
  const [restoreData, setRestoreData] = useState<TypeTransaction[]>([])
  const [tableData, setTableData] = useState<TypeTransaction[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [hasError, setHasError] = useState<boolean>(true)
  const [filterByKeys, setFilterByKeys] = useState<Record<string, string | null>>({});
  const inDevMode:Boolean = process.env.NODE_ENV === 'development'
  const lsKey:string = "transactions"
  const debounceTime:number = 300


  // ------------------------
  // I want to keep the SmartTable as reusable as possible, so to add any kind of mutations (i.e. transactions status (number) -> into string values)
  // I'm going to pass the conversion functionality as an object.  Can extend this by just passing the key of the property you want to edit and how
  // you want it returned
  const convertFunc = {
    transaction_status: (val:number):TransactionStatus => {
      // list of status codes that I'm making up for this demo
      switch (val) {
        case 0:
          return "Pending"
        case 1:
          return "Completed"
        case 2:
          return "Failed"
        case 3:
          return "Cancelled"
        case 4:
          return "Refunded"
        case 5:
          return "In Review"
      }
      return 'Unknown'
    },    
    date: (val:Date):string => {
      // converts from ISO date into simplier YYYY-MM-DD
      return formatDate(val)
    },
    amount: (val: string): string => {
      // stored in db as a double int (so it's easier to sort)
      return `€${Number(val).toFixed(2)}`;
    }
  }
  // ------------------------

  // ------------------------
  const dropdownFunc = {
    transaction_status: (val:any):void => {
      var filter_val:null | string = null

      switch (val) {
        case "Pending":
          filter_val = "0"
          break
        case "Completed":
          filter_val = "1"
          break
        case "Failed":
          filter_val = "2"
          break
        case "Cancelled":
          filter_val = "3"
          break
        case "Refunded":
          filter_val = "4"
          break
        case "In Review":
          filter_val = "5"
          break
      }   

      filterByKeys.transaction_status = filter_val

      customFilter()
    },  
  }
   // ------------------------  

  // ------------------------
  // would normally send this to the server and have it return the filtered dataset, but
  // again for demo purposes it's just done locally
  const filterFunc = {
    _id: debounce((val: string) => {
      filterByKeys._id = val.length === 0 ? null : val
      customFilter()
    }, debounceTime),    
    id: debounce((val: string) => {
      filterByKeys.id = val.length === 0 ? null : val
      customFilter()
    }, debounceTime),   
    userid: debounce((val: string) => {
      filterByKeys.userid = val.length === 0 ? null : val
      customFilter()
    }, debounceTime),   
    username: debounce((val: string) => {
      filterByKeys.username = val.length === 0 ? null : val
      customFilter()
    }, debounceTime),      
    amount: debounce((val: string) => {
      filterByKeys.amount = val.length === 0 ? null : val
      customFilter()
    }, debounceTime), 
    date: debounce((val: string) => {
      filterByKeys.date = val.length === 0 ? null : val
      customFilter()
    }, debounceTime),                    
    vender: debounce((val: string) => {
      filterByKeys.vender = val.length === 0 ? null : val
      customFilter()
    }, debounceTime)    
  }

  function customFilter(){
    let filterd = [...restoreData]; 

    filterd = filterd.filter((item:any) => {  
      var has_match:Boolean = true
      Object.keys(item).forEach((key) => {   
        if(filterByKeys[key] !== null && has_match){
          has_match = String(item[key].toLowerCase()).includes(filterByKeys[key].toLowerCase())
        }
      })

      return has_match
    })
    
    setTableData(filterd)    
  }
  // ------------------------  

  // ------------------------
  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;

    return function(...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }  
  // ------------------------

 // ------------------------
  function formatDate(isoString:Date) {
    const date = new Date(isoString);
  
    // Get year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    // Return formatted date
    return `${year}-${month}-${day}`;
  }
  // ------------------------

  // ------------------------
  // I would normally include this sort functionality into the SmartTable itself, 
  // but it would make more sense to have the server return a pruned version of the dataset first.
  // However, for purposes of this demo I'll just handle it locally and return the dataset
  async function sortByKey(key:string, reversed:Boolean = false){
    let sorted = [...tableData];  

    sorted.sort((a:any, b:any) => {
      const valueA = a[key]
      const valueB = b[key]
  
      if (valueA < valueB) return -1
      if (valueA > valueB) return 1
      return 0;
    })

    setTableData(reversed ? sorted.reverse() : sorted )
  }
  // ------------------------

  // ------------------------
  function setupFilterKeys(entry){
    var filter_by = {}
    Object.keys(entry).forEach((key) => {   
      filter_by[key] = null
    })
    setFilterByKeys(filter_by)
  }
  // ------------------------

  // ------------------------
  useEffect(() => {
    fetchTransactions();
  }, []);
  // ------------------------

  // ------------------------
  async function fetchTransactions(){
      // fetch from local storage check 
      // wanted to save this to localStorage while developing 
      // so I don't burn my free api calls while testing
      if(inDevMode){
        const ls:string | null = localStorage.getItem(lsKey);
        if(ls !== null){
          let parsed = JSON.parse(ls)
          setRestoreData(parsed)
          setTableData(parsed)
          setIsFetching(false)

          if(parsed.length > 0){
            setupFilterKeys(parsed[0])
          }          
          return
        }
      }

      // otherwise, pull from api
      try {
        const response = await fetch(`${apiUrl}/transactions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const res:TypeTransaction[] = await response.json()

        // sets restore data and current data set
        setRestoreData(res)
        setTableData(res) 

        if(res.length > 0){
          setupFilterKeys(res[0])
        }              

        if(inDevMode){
          localStorage.setItem(lsKey, JSON.stringify(res));
        }

      } catch (err) {
        setHasError(true)
        console.error(`Error fetching transactions: ${err}`)
      } finally {
        setIsFetching(false);
      }
  }  
  // ------------------------

  // ------------------------
  return (
    <>
        <div className='flex justify-center items-center'>
          <h1>Transactions</h1>
        </div>
        <div className='w-full h-auto'>
          <SmartTable 
          data={tableData} 
          convertFunc={convertFunc} 
          filterFunc={filterFunc} 
          dropdownFunc={dropdownFunc}
          isFetching={isFetching} 
          hasError={hasError} 
          sortByKey={sortByKey} 
          />
        </div>
    </>
  )
  // ------------------------
}
// ------------------------