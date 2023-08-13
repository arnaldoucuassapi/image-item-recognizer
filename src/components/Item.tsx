import { View, Text, StyleSheet } from 'react-native';

interface ItemProps {
  text: string
}

export function Item({ text }: ItemProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  itemText: {
    textAlign: 'center'
  }
});