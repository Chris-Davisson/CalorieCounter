import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CalorieButtons from '../components/CalorieButtons';
import CalorieChart from '../components/CalorieChart';
import CalorieInput from '../components/CalorieInput';
import { getTodayKey, getPastDates } from '../utils/date';

const HomeScreen = () => {
  const [calories, setCalories] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  const [weeklyData, setWeeklyData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    loadCalories();
    loadWeeklyData();
  }, []);

  const loadCalories = async () => {
    try {
      const stored = await AsyncStorage.getItem(getTodayKey());
      if (stored) setCalories(parseInt(stored));
    } catch (e) {
      console.error(e);
    }
  };

  const updateCalories = async (newVal: number) => {
    try {
      setCalories(newVal);
      await AsyncStorage.setItem(getTodayKey(), newVal.toString());
      loadWeeklyData();
    } catch (e) {
      console.error(e);
    }
  };

  const loadWeeklyData = async () => {
    const dates = getPastDates(7);
    const data: number[] = [];
    for (const date of dates) {
      const value = await AsyncStorage.getItem(date);
      data.push(value ? parseInt(value) : 0);
    }
    setWeeklyData(data);
  };

  const changeCalories = (delta: number) => {
    const value = parseInt(input);
    if (!isNaN(value)) {
      updateCalories(calories + delta * value);
      setInput('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Calorie Counter</Text>
          <CalorieChart data={weeklyData} />
          <Text style={styles.calories}>{calories} Calories Today</Text>
          <CalorieInput input={input} onChangeText={setInput} />
          <CalorieButtons
            onAdd={() => changeCalories(1)}
            onSubtract={() => changeCalories(-1)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
  },
  calories: {
    fontSize: 22,
    marginVertical: 10,
    color: '#555',
  },
});
