import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { NewTransaction } from '@/context/TransactionContext';
import { notify } from '@/utils/notify';

interface TransactionFormProps {
  onSubmit: (data: NewTransaction) => void;
}

export default function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'revenue' | 'expense'>('expense');

  const handleSubmit = () => {
    if (!description.trim() || !amount.trim()) {
      notify('Atenção', 'Por favor, preencha todos os campos!');
      return;
    }

    // Aceita vírgula como separador decimal (padrão brasileiro): "10,50" → 10.50
    const parsedAmount = parseFloat(amount.replace(',', '.'));
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      notify('Atenção', 'Digite um valor numérico válido, maior que zero.');
      return;
    }

    onSubmit({ description: description.trim(), amount: parsedAmount, type });

    setDescription('');
    setAmount('');
    notify('Sucesso', 'Transação adicionada com sucesso!');
  };

  return (
    <View style={styles.formCard}>
      <Text style={styles.sectionTitle}>Nova Transação</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.typeSelectorRow}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === 'revenue' ? styles.typeButtonRevenueActive : styles.typeButtonInactive,
          ]}
          onPress={() => setType('revenue')}>
          <Text style={[styles.typeButtonText, type === 'revenue' && styles.typeButtonTextActive]}>
            Receita (+)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === 'expense' ? styles.typeButtonExpenseActive : styles.typeButtonInactive,
          ]}
          onPress={() => setType('expense')}>
          <Text style={[styles.typeButtonText, type === 'expense' && styles.typeButtonTextActive]}>
            Despesa (-)
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Salvar Lançamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
    color: '#334155',
  },
  typeSelectorRow: { flexDirection: 'row', marginBottom: 15 },
  typeButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  typeButtonInactive: { backgroundColor: '#f1f5f9' },
  typeButtonRevenueActive: { backgroundColor: '#2ecc71' },
  typeButtonExpenseActive: { backgroundColor: '#e74c3c' },
  typeButtonText: { fontWeight: 'bold', color: '#475569' },
  typeButtonTextActive: { color: '#fff' },
  submitButton: { backgroundColor: '#3b82f6', padding: 14, borderRadius: 8, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
