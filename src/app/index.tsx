// @ts-nocheck
import { useState, useContext } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Navbar from '../components/Navbar';
import BalanceCard from '../components/BalanceCard';
import TransactionItem from '../components/TransactionItem';
import { TransactionContext } from './_layout'; // Puxa direto do layout!

export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'transacoes'>('dashboard');
  const { transactions, addTransaction, togglePaid } = useContext(TransactionContext);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'revenue' | 'expense'>('expense');

  const handleAddTransaction = () => {
    if (!description || !amount) {
      alert("Atenção: Por favor, preencha todos os campos!");
      return;
    }

    addTransaction({
      id: Math.random().toString(),
      description: description,
      amount: parseFloat(amount),
      type: type,
      paid: false,
    });

    setDescription('');
    setAmount('');
    Alert.alert('Sucesso', 'Transação adicionada com sucesso!');
  };

  const totalRevenue = transactions.filter(t => t.type === 'revenue').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalRevenue - totalExpense;

  const maxAmount = Math.max(totalRevenue, totalExpense, 1);
  const revenueBarHeight = (totalRevenue / maxAmount) * 120;
  const expenseBarHeight = (totalExpense / maxAmount) * 120;

  return (
    <View style={styles.container}>
      <Navbar currentScreen={currentScreen} />

      {currentScreen === 'dashboard' ? (
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <BalanceCard balance={balance} />

          <View style={styles.chartCard}>
            <Text style={styles.sectionTitle}>Resumo Visual Financeiro</Text>
            <View style={styles.chartRow}>
              <View style={styles.barColumn}>
                <View style={[styles.bar, { height: revenueBarHeight, backgroundColor: '#2ecc71' }]} />
                <Text style={styles.barLabel}>Receitas</Text>
                <Text style={styles.barValue}>R$ {totalRevenue.toFixed(2)}</Text>
              </View>
              <View style={styles.barColumn}>
                <View style={[styles.bar, { height: expenseBarHeight, backgroundColor: '#e74c3c' }]} />
                <Text style={styles.barLabel}>Despesas</Text>
                <Text style={styles.barValue}>R$ {totalExpense.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.shortcutButton} onPress={() => setCurrentScreen('transacoes')}>
            <Text style={styles.shortcutButtonText}>Ver Transações ➔</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Nova Transação</Text>
            <TextInput style={styles.input} placeholder="Descrição" placeholderTextColor="#999" value={description} onChangeText={setDescription} />
            <TextInput style={styles.input} placeholder="Valor" placeholderTextColor="#999" keyboardType="numeric" value={amount} onChangeText={setAmount} />

            <View style={styles.typeSelectorRow}>
              <TouchableOpacity style={[styles.typeButton, type === 'revenue' ? styles.typeButtonRevenueActive : styles.typeButtonInactive]} onPress={() => setType('revenue')}>
                <Text style={[styles.typeButtonText, type === 'revenue' && { color: '#fff' }]}>Receita (+)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.typeButton, type === 'expense' ? styles.typeButtonExpenseActive : styles.typeButtonInactive]} onPress={() => setType('expense')}>
                <Text style={[styles.typeButtonText, type === 'expense' && { color: '#fff' }]}>Despesa (-)</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleAddTransaction}>
              <Text style={styles.submitButtonText}>Salvar Lançamento</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Listagem de Movimentações</Text>
          <FlatList data={transactions} keyExtractor={(item) => item.id} scrollEnabled={false} renderItem={({ item }) => (
            <TransactionItem item={item} onTogglePaid={togglePaid} />
          )} />
        </ScrollView>
      )}

      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabItem, currentScreen === 'dashboard' && styles.tabItemActive]} onPress={() => setCurrentScreen('dashboard')}>
          <Text style={[styles.tabText, currentScreen === 'dashboard' && styles.tabTextActive]}>📊 Painel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, currentScreen === 'transacoes' && styles.tabItemActive]} onPress={() => setCurrentScreen('transacoes')}>
          <Text style={[styles.tabText, currentScreen === 'transacoes' && styles.tabTextActive]}>💸 Lançamentos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContent: { padding: 20, paddingBottom: 140 },
  chartCard: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  chartRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 160, marginTop: 15 },
  barColumn: { alignItems: 'center', width: 110 },
  bar: { width: 40, borderRadius: 6, minHeight: 5 },
  barLabel: { fontSize: 13, fontWeight: '600', color: '#334155', marginTop: 8 },
  barValue: { fontSize: 12, color: '#64748b', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 10 },
  formCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12, fontSize: 14, marginBottom: 12, color: '#334155' },
  typeSelectorRow: { flexDirection: 'row', marginBottom: 15 },
  typeButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  typeButtonInactive: { backgroundColor: '#f1f5f9' },
  typeButtonRevenueActive: { backgroundColor: '#2ecc71' },
  typeButtonExpenseActive: { backgroundColor: '#e74c3c' },
  typeButtonText: { fontWeight: 'bold', color: '#475569' },
  submitButton: { backgroundColor: '#3b82f6', padding: 14, borderRadius: 8, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  shortcutButton: { backgroundColor: '#e2e8f0', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  shortcutButtonText: { color: '#3b82f6', fontWeight: 'bold' },
  tabBar: { flexDirection: 'row', height: 65, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e2e8f0', position: 'absolute', bottom: 30, left: 0, right: 0 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabItemActive: { borderTopWidth: 3, borderTopColor: '#3b82f6' },
  tabText: { fontSize: 13, color: '#64748b' },
  tabTextActive: { color: '#3b82f6', fontWeight: 'bold' },
});