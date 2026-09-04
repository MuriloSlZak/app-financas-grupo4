import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'revenue' | 'expense';
  paid: boolean;
}

export type NewTransaction = Omit<Transaction, 'id' | 'paid'>;

interface TransactionContextData {
  transactions: Transaction[];
  addTransaction: (data: NewTransaction) => void;
  togglePaid: (id: string) => void;
  totalRevenue: number;
  totalExpense: number;
  balance: number;
}

const TransactionContext = createContext<TransactionContextData | null>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', description: 'Salário', amount: 2500, type: 'revenue', paid: true },
    { id: '2', description: 'Aluguel', amount: 1000, type: 'expense', paid: true },
    { id: '3', description: 'Conta de Luz', amount: 250, type: 'expense', paid: false },
  ]);

  const value = useMemo<TransactionContextData>(() => {
    const totalRevenue = transactions
      .filter((t) => t.type === 'revenue')
      .reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    return {
      transactions,
      totalRevenue,
      totalExpense,
      balance: totalRevenue - totalExpense,
      addTransaction: (data) => {
        const newTransaction: Transaction = {
          ...data,
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          paid: false,
        };
        setTransactions((prev) => [...prev, newTransaction]);
      },
      togglePaid: (id) => {
        setTransactions((prev) =>
          prev.map((item) => (item.id === id ? { ...item, paid: !item.paid } : item))
        );
      },
    };
  }, [transactions]);

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions precisa ser usado dentro de <TransactionProvider>');
  }
  return context;
}
