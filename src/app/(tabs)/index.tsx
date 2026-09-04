import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import BalanceCard from '@/components/BalanceCard';
import BarChart from '@/components/BarChart';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import { useAuth } from '@/context/AuthContext';
import { useTransactions } from '@/context/TransactionContext';

export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'transacoes'>('dashboard');
  const { transactions, addTransaction, togglePaid, totalRevenue, totalExpense, balance } =
    useTransactions();
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Navbar currentScreen={currentScreen} onLogout={logout} />

      {currentScreen === 'dashboard' ? (
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <BalanceCard balance={balance} />
          <BarChart totalRevenue={totalRevenue} totalExpense={totalExpense} />

          <TouchableOpacity
            style={styles.shortcutButton}
            onPress={() => setCurrentScreen('transacoes')}>
            <Text style={styles.shortcutButtonText}>Ver Transações ➔</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <TransactionForm onSubmit={addTransaction} />
          <TransactionList transactions={transactions} onTogglePaid={togglePaid} />
        </ScrollView>
      )}

      <Footer currentScreen={currentScreen} onChangeScreen={setCurrentScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContent: { padding: 20, paddingBottom: 140 },
  shortcutButton: {
    backgroundColor: '#e2e8f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  shortcutButtonText: { color: '#3b82f6', fontWeight: 'bold' },
});
