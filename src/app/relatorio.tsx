// @ts-nocheck
import { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { TransactionContext } from './_layout'; // Puxa direto do layout!

export default function RelatorioScreen() {
  const { transactions } = useContext(TransactionContext);

  const totalRevenue = transactions.filter(t => t.type === 'revenue').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalRevenue - totalExpense;

  const handleShareStatus = async () => {
    try {
      let statusMessage = '';

      if (balance < 0) {
        statusMessage = `📊 *Relatório App Finanças - Grupo 4*\n\n🚨 Alerta Vermelho!\nMeu saldo está negativo em R$ ${Math.abs(balance).toFixed(2)}.\nPreciso segurar os gastos urgente!`;
      } else if (balance >= 0 && balance <= 150) {
        statusMessage = `📊 *Relatório App Finanças - Grupo 4*\n\n⚠️ Atenção!\nMeu saldo está positivo, mas no limite: R$ ${balance.toFixed(2)}.\nTô quase no vermelho, hora de economizar!`;
      } else {
        statusMessage = `📊 *Relatório App Finanças - Grupo 4*\n\n✅ Tudo sob controle!\nFechei o mês no azul com R$ ${balance.toFixed(2)} disponíveis.\nFinanças super saudáveis!`;
      }

      await Share.share({
        message: statusMessage,
      });
    } catch (error) {
      alert('Erro ao compartilhar o status.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status Financeiro 📑</Text>
      <Text style={styles.subtitle}>Compartilhe o seu resultado</Text>

      <View style={styles.card}>
        <Text style={styles.text}>
          Gere uma mensagem automática avisando se as suas contas estão no azul, quase no limite ou no vermelho!
        </Text>
        
        <TouchableOpacity style={styles.shareButton} onPress={handleShareStatus}>
          <Text style={styles.shareButtonText}>📤 Compartilhar Status</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa', alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1e293b', marginBottom: 5 },
  subtitle: { fontSize: 15, color: '#64748b', marginBottom: 30 },
  card: { backgroundColor: '#fff', padding: 25, borderRadius: 15, alignItems: 'center', width: '100%', maxWidth: 350, borderWidth: 1, borderColor: '#e2e8f0' },
  text: { fontSize: 15, color: '#475569', textAlign: 'center', marginBottom: 25, lineHeight: 22 },
  shareButton: { backgroundColor: '#3b82f6', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 8, width: '100%', alignItems: 'center' },
  shareButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});