import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height + 50,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    lineHeight: 50,
    marginBottom: 10,
    textAlign: 'center',
  },
  titleWhite: {
    color: '#FFFFFF',
  },
  titleRed: {
    color: '#FF3B5C',
  },
  subtitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: '#FF3B5C',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;