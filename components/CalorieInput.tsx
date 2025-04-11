import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { CalorieInputProps } from '../types';

const CalorieInput: React.FC<CalorieInputProps> = ({ input, onChangeText }) => (
  <TextInput
    style={styles.input}
    placeholder="Enter Calories"
    keyboardType="numeric"
    value={input}
    onChangeText={onChangeText}
    placeholderTextColor="#aaa"
  />
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default CalorieInput;
