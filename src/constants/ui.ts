// Paleta e estilos compartilhados do app (mantém o visual consistente entre as telas).
export const UI = {
  colors: {
    bg: '#f1f5f9',
    card: '#ffffff',
    border: '#e2e8f0',
    inputBg: '#f8fafc',
    text: '#0f172a',
    textSecondary: '#64748b',
    primary: '#2563eb',
    primarySoft: '#dbeafe',
    success: '#16a34a',
    successSoft: '#dcfce7',
    danger: '#dc2626',
    dangerSoft: '#fee2e2',
    warning: '#b45309',
    warningSoft: '#fef3c7',
    dark: '#1e293b',
    darkSoft: '#334155',
    onDark: '#ffffff',
    onDarkMuted: '#cbd5e1',
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 20,
    pill: 999,
  },
  // Sombra suave para os cards (funciona no iOS, Android e web)
  shadow: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
} as const;
