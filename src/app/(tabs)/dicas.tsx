import { ScrollView, StyleSheet, Text } from 'react-native';

import TeamCard from '@/components/TeamCard';
import TipCard from '@/components/TipCard';
import { UI } from '@/constants/ui';

export default function DicasScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
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
  screen: { flex: 1, backgroundColor: UI.colors.bg },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 90, // Dá o espaço do topo para não ficar cortado
    paddingBottom: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: UI.colors.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: UI.colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
});
