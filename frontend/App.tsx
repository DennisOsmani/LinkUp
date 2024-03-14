import { StyleSheet, Text, View } from 'react-native';
import { TokenProvider } from './providers/TokenProvider';

export default function App() {
  return (
    <TokenProvider>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    </TokenProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
