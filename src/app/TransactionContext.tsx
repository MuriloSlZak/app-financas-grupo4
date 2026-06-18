// @ts-nocheck
import React, { createContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'revenue' | 'expense';
  paid: boolean;
}

export const TransactionContext = createContext<any>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', description: 'Salário', amount: 2500, type: 'revenue', paid: true },
    { id: '2', description: 'Aluguel', amount: 1000, type: 'expense', paid: true },
    { id: '3', description: 'Conta de Luz', amount: 250, type: 'expense', paid: false },
  ]);

  const addTransaction = (newTransaction: Transaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const togglePaid = (id: string) => {
    setTransactions(
      transactions.map((item) =>
        item.id === id ? { ...item, paid: !item.paid } : item
      )
    );
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, togglePaid }}>
      {children}
    </TransactionContext.Provider>
  );
}