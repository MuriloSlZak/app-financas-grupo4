import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { UI } from '@/constants/ui';
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

  const isRevenue = type === 'revenue';

  return (
    <View style={styles.formCard}>
      <Text style={styles.sectionTitle}>Nova Transação</Text>
      <Text style={styles.sectionSubtitle}>Registre uma receita ou uma despesa</Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Conta de luz"
        placeholderTextColor="#94a3b8"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="0,00"
        placeholderTextColor="#94a3b8"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.typeSelectorRow}>
        <TouchableOpacity
          style={[styles.typeButton, isRevenue ? styles.typeButtonRevenueActive : styles.typeButtonInactive]}
          onPress={() => setType('revenue')}
          activeOpacity={0.8}>
          <Text style={[styles.typeButtonText, isRevenue && { color: UI.colors.success }]}>
            ▲ Receita
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, !isRevenue ? styles.typeButtonExpenseActive : styles.typeButtonInactive]}
          onPress={() => setType('expense')}
          activeOpacity={0.8}>
          <Text style={[styles.typeButtonText, !isRevenue && { color: UI.colors.danger }]}>
            ▼ Despesa
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.85}>
        <Text style={styles.submitButtonText}>Salvar lançamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: UI.colors.card,
    padding: 20,
    borderRadius: UI.radius.lg,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: UI.colors.border,
    ...UI.shadow,
  },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: UI.colors.text },
  sectionSubtitle: { fontSize: 12, color: UI.colors.textSecondary, marginTop: 2, marginBottom: 16 },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: UI.colors.textSecondary,
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    backgroundColor: UI.colors.inputBg,
    borderWidth: 1,
    borderColor: UI.colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    marginBottom: 14,
    color: UI.colors.text,
  },
  typeSelectorRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  typeButtonInactive: { backgroundColor: UI.colors.inputBg, borderColor: UI.colors.border },
  typeButtonRevenueActive: { backgroundColor: UI.colors.successSoft, borderColor: UI.colors.success },
  typeButtonExpenseActive: { backgroundColor: UI.colors.dangerSoft, borderColor: UI.colors.danger },
  typeButtonText: { fontWeight: '700', color: UI.colors.textSecondary },
  submitButton: {
    backgroundColor: UI.colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
