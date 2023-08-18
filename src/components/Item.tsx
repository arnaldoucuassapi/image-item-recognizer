import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface ItemProps {
  name: string,
  value: number
}

export function Item({ name, value }: ItemProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemValue}>{(value * 100).toFixed()}</Text>
      <Text style={styles.itemText}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
  },
  itemText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: 16
  },
  itemValue: {
    width: 48,
    backgroundColor: '#50c8783b',
    paddingHorizontal: 8,
    paddingVertical: 10,
    color: '#50c878',
    borderWidth: 1,
    borderColor: '#50c8785c',
    fontWeight: '500',
    borderRadius: 4,
    textAlign: 'center'
  }
});