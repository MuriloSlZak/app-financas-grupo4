// @ts-nocheck
import { useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'revenue' | 'expense';
  paid: boolean;
}

export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'transacoes'>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', description: 'Salário', amount: 2500, type: 'revenue', paid: true },
    { id: '2', description: 'Aluguel', amount: 1000, type: 'expense', paid: true },
    { id: '3', description: 'Conta de Luz', amount: 250, type: 'expense', paid: false },
  ]);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'revenue' | 'expense'>('expense'); // Começa como despesa por padrão

  const handleAddTransaction = () => {
    if (!description || !amount) {
      alert("Atenção: Por favor, preencha todos os campos!");
      return;
    }

    const newTransaction: Transaction = {
      id: Math.random().toString(),
      description: description,
      amount: parseFloat(amount),
      type: type, // Pega o tipo exato selecionado
      paid: false,
    };

    setTransactions([...transactions, newTransaction]);
    setDescription('');
    setAmount('');
    Alert.alert('Sucesso', 'Transação adicionada com sucesso!');
  };

  const togglePaid = (id: string) => {
    setTransactions(
      transactions.map((item) =>
        item.id === id ? { ...item, paid: !item.paid } : item
      )
    );
  };

  const totalRevenue = transactions.filter(t => t.type === 'revenue').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalRevenue - totalExpense;

  const maxAmount = Math.max(totalRevenue, totalExpense, 1);
  const revenueBarHeight = (totalRevenue / maxAmount) * 120;
  const expenseBarHeight = (totalExpense / maxAmount) * 120;

  return (
    <View style={styles.container}>
      {/* NAVBAR */}
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>Controle Financeiro 💰</Text>
        <Text style={styles.navbarSubtext}>
          {currentScreen === 'dashboard' ? 'Painel de Gráficos' : 'Histórico & Cadastro'}
        </Text>
      </View>

      {/* RENDERIZAÇÃO CONDICIONAL DAS TELAS */}
      {currentScreen === 'dashboard' ? (
        /* ==================== TELA 1: DASHBOARD ==================== */
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* CARD DE SALDO */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Saldo Geral Disponível</Text>
            <Text style={[styles.balanceValue, { color: balance >= 0 ? '#2ecc71' : '#e74c3c' }]}>
              R$ {balance.toFixed(2)}
            </Text>
          </View>

          {/* GRÁFICO SIMPLES */}
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
        /* ==================== TELA 2: TRANSAÇÕES ==================== */
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* FORMULÁRIO DE CADASTRO */}
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Nova Transação</Text>

            <TextInput
              style={styles.input}
              placeholder="Descrição (Ex: Conta de Internet)"
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
            />

            <TextInput
              style={styles.input}
              placeholder="Valor (Ex: 120.00)"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            {/* SELETOR DE TIPO COM TRAVA DE CLIQUE */}
            <View style={styles.typeSelectorRow}>
              <TouchableOpacity
                style={[styles.typeButton, type === 'revenue' ? styles.typeButtonRevenueActive : styles.typeButtonInactive]}
                onPress={() => setType('revenue')}
              >
                <Text style={[styles.typeButtonText, type === 'revenue' && { color: '#fff' }]}>Receita (+)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.typeButton, type === 'expense' ? styles.typeButtonExpenseActive : styles.typeButtonInactive]}
                onPress={() => setType('expense')}
              >
                <Text style={[styles.typeButtonText, type === 'expense' && { color: '#fff' }]}>Despesa (-)</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleAddTransaction}>
              <Text style={styles.submitButtonText}>Salvar Lançamento</Text>
            </TouchableOpacity>
          </View>

          {/* LISTA DE ITENS (FLATLIST) */}
          <Text style={styles.sectionTitle}>Listagem de Movimentações</Text>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={[styles.itemAmount, { color: item.type === 'revenue' ? '#2ecc71' : '#e74c3c' }]}>
                    {item.type === 'revenue' ? '+' : '-'} R$ {item.amount.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.paidButton, item.paid ? styles.paidButtonTrue : styles.paidButtonFalse]}
                  onPress={() => togglePaid(item.id)}
                >
                  <Text style={styles.paidButtonText}>
                    {item.paid ? 'Pago ✓' : 'Pendente'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>
      )}

      {/* MENUS/TABS DE NAVEGAÇÃO ENTRE TELAS */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, currentScreen === 'dashboard' && styles.tabItemActive]}
          onPress={() => setCurrentScreen('dashboard')}
        >
          <Text style={[styles.tabText, currentScreen === 'dashboard' && styles.tabTextActive]}>📊 Painel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, currentScreen === 'transacoes' && styles.tabItemActive]}
          onPress={() => setCurrentScreen('transacoes')}
        >
          <Text style={[styles.tabText, currentScreen === 'transacoes' && styles.tabTextActive]}>💸 Lançamentos</Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Grupo 4 — Aplicativo de Finanças © 2026</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  navbar: {
    backgroundColor: '#1e293b',
    paddingTop: 85,
    paddingBottom: 15,
    alignItems: 'center',
  },
  navbarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  navbarSubtext: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 140,
  },
  balanceCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  balanceLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
  balanceValue: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
  },
  chartCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 160,
    marginTop: 15,
  },
  barColumn: {
    alignItems: 'center',
    width: 110,
  },
  bar: {
    width: 40,
    borderRadius: 6,
    minHeight: 5,
  },
  barLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginTop: 8,
  },
  barValue: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  formCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
    color: '#334155',
  },
  typeSelectorRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  typeButtonInactive: {
    backgroundColor: '#f1f5f9',
  },
  typeButtonRevenueActive: {
    backgroundColor: '#2ecc71',
  },
  typeButtonExpenseActive: {
    backgroundColor: '#e74c3c',
  },
  typeButtonText: {
    fontWeight: 'bold',
    color: '#475569',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itemDescription: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },
  itemAmount: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  paidButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  paidButtonTrue: {
    backgroundColor: '#dcfce7',
  },
  paidButtonFalse: {
    backgroundColor: '#fee2e2',
  },
  paidButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  shortcutButton: {
    backgroundColor: '#e2e8f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  shortcutButtonText: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemActive: {
    borderTopWidth: 3,
    borderTopColor: '#3b82f6',
  },
  tabText: {
    fontSize: 13,
    color: '#64748b',
  },
  tabTextActive: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1e293b',
    padding: 8,
    alignItems: 'center',
  },
  footerText: {
    color: '#64748b',
    fontSize: 11,
  },
});