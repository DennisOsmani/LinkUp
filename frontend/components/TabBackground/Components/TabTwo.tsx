import { StyleSheet, View, Text } from 'react-native';

export default function TabTwo() {
  return (
    <View style={styles.container}>
      <Text>Tab Two</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
