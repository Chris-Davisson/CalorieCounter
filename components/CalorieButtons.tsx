import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CalorieButtonsProps } from '../types';

const CalorieButtons: React.FC<CalorieButtonsProps> = ({ onAdd, onSubtract }) => (
  <View style={styles.row}>
    <TouchableOpacity style={styles.button} onPress={onAdd}>
      <Text style={styles.text}>＋</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onSubtract}>
      <Text style={styles.text}>－</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#eee',
  },
  text: {
    fontSize: 32,
    color: '#222',
  },
});

export default CalorieButtons;
