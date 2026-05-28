// @ts-nocheck
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dicas Financeiras 💡</Text>
      <Text style={styles.subtitle}>Aprenda a cuidar do seu dinheiro</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Regra 50/30/20</Text>
        <Text style={styles.text}>
          Divida sua renda: 50% para necessidades básicas (aluguel, contas), 30% para desejos pessoais (lazer, compras) e 20% para poupar ou investir.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🛡️ Reserva de Emergência</Text>
        <Text style={styles.text}>
          Tente guardar o equivalente a 6 meses dos seus gastos fixos para imprevistos. É a sua rede de segurança para não cair em dívidas!
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🚫 Cuidado com o Cartão</Text>
        <Text style={styles.text}>
          O cartão de crédito não é uma extensão do seu salário. Pague sempre a fatura total para evitar os temidos juros rotativos.
        </Text>
      </View>

      <View style={styles.cardTeam}>
        <Text style={styles.cardTitleTeam}>👨‍💻 Sobre o App</Text>
        <Text style={styles.textTeam}>
          Desenvolvido com dedicação pelo Grupo 4 (Murilo, Ruan e Bianca) para ajudar você a alcançar a liberdade financeira!
        </Text>
      </View>
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
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db', // Detalhe azul na lateral
  },
  cardTeam: {
    backgroundColor: '#2C3E50', // Fundo escuro para destacar a equipe
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardTitleTeam: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  textTeam: {
    fontSize: 14,
    color: '#D5D8DC',
    lineHeight: 22,
  }
});