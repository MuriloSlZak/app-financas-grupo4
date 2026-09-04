import { ScrollView, StyleSheet, Text } from 'react-native';

import TeamCard from '@/components/TeamCard';
import TipCard from '@/components/TipCard';

export default function DicasScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dicas Financeiras 💡</Text>
      <Text style={styles.subtitle}>Aprenda a cuidar do seu dinheiro</Text>

      <TipCard
        title="📊 Regra 50/30/20"
        text="Divida sua renda: 50% para necessidades básicas (aluguel, contas), 30% para desejos pessoais (lazer, compras) e 20% para poupar ou investir."
      />

      <TipCard
        title="🛡️ Reserva de Emergência"
        text="Tente guardar o equivalente a 6 meses dos seus gastos fixos para imprevistos. É a sua rede de segurança para não cair em dívidas!"
      />

      <TipCard
        title="🚫 Cuidado com o Cartão"
        text="O cartão de crédito não é uma extensão do seu salário. Pague sempre a fatura total para evitar os temidos juros rotativos."
      />

      <TeamCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F7FA', // Fundo cinza clarinho elegante
    alignItems: 'center',
    paddingTop: 60, // Dá o espaço do topo para não ficar cortado
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 30,
    textAlign: 'center',
  },
});
