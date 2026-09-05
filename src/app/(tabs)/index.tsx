import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import BalanceCard from '@/components/BalanceCard';
import BarChart from '@/components/BarChart';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import { UI } from '@/constants/ui';
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
            onPress={() => setCurrentScreen('transacoes')}
            activeOpacity={0.85}>
            <Text style={styles.shortcutButtonText}>Ver transações ➔</Text>
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
  container: { flex: 1, backgroundColor: UI.colors.bg },
  scrollContent: {
    padding: 20,
    paddingBottom: 140,
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  shortcutButton: {
    backgroundColor: UI.colors.primarySoft,
    paddingVertical: 15,
    borderRadius: UI.radius.md,
    alignItems: 'center',
    marginTop: 4,
  },
  shortcutButtonText: { color: UI.colors.primary, fontWeight: '700', fontSize: 15 },
});
