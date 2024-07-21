"use client"

// ------------------------
import React, { useState, useEffect } from 'react';
import {TypeTransaction} from '@type/type'
import {apiUrl} from '@config/config'
// ------------------------

// ------------------------
const inDevMode:Boolean = process.env.NODE_ENV === 'development';
const lsKey:string = "transactions"
// ------------------------

// ------------------------
export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<TypeTransaction[]>([]);

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
          setTransactions(JSON.parse(ls))
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
        setTransactions(res) 

        if(inDevMode){
          localStorage.setItem(lsKey, JSON.stringify(res));
        }

      } catch (err) {
        console.error(`Error fetching transactions: ${err}`)
      }
  }  
  // ------------------------

  // ------------------------
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Transactions</h1>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <p>Amount: ${transaction.amount}</p>
              <p>Date: {transaction.date}</p>
            </li>
          ))}
        </ul>
    </main>
  )
  // ------------------------
}
// ------------------------