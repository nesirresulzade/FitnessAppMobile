import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    padding: 24,
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 0.5
  },
  subtitle: {
    color: '#b3b3b3',
    textAlign: 'center',
    marginBottom: 22
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#2a2a2a'
  },
  button: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6
  },
  buttonText: {
    color: '#0b0b0b',
    fontWeight: '700',
    fontSize: 16
  },
  footerRow: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    marginTop: 16
  },
  footerText: {
    color: '#999'
  },
  link: {
    color: '#fff',
    fontWeight: '700'
  }
})


