// @ts-nocheck
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';
import React, { createContext, useState } from 'react';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

// Criando a memória aqui dentro do layout
export const TransactionContext = createContext<any>(null);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // A lista de contas fica salva aqui no layout
  const [transactions, setTransactions] = useState([
    { id: '1', description: 'Salário', amount: 2500, type: 'revenue', paid: true },
    { id: '2', description: 'Aluguel', amount: 1000, type: 'expense', paid: true },
    { id: '3', description: 'Conta de Luz', amount: 250, type: 'expense', paid: false },
  ]);

  const addTransaction = (newTransaction: any) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const togglePaid = (id: string) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, paid: !item.paid } : item
      )
    );
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, togglePaid }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <AppTabs />
      </ThemeProvider>
    </TransactionContext.Provider>
  );
}