import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  initDB,
  getCaloriesForDate,
  setCaloriesForDate,
  getLast7Days
} from '../services/db';
import { getTodayKey, getPastDates , formatDateShort } from '../utils/date';

import CalorieChart from '../components/CalorieChart';
import CalorieButtons from '../components/CalorieButtons';
import { Keyboard } from 'react-native';


const HomeScreen = () => {
  const [calories, setCalories] = useState<number>(0);
  const [weeklyData, setWeeklyData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const dateLabels = getPastDates(7).map(date => formatDateShort(date));
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingDelta, setPendingDelta] = useState<number>(0);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    initDB();
    setCalories(getCaloriesForDate(getTodayKey()) ?? 0);
    setWeeklyData(getLast7Days(getPastDates(7)));
  }, []);

  useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {

      const value = parseInt(inputValue);
      if (!isNaN(value) && modalVisible) {
        updateCalories(calories + pendingDelta * value);
        setInputValue('');
        setModalVisible(false);
      }
    });
  
    return () => {
      keyboardListener.remove();
    };
  }, [inputValue, pendingDelta, modalVisible]);
  
  const updateCalories = (newVal: number) => {
    setCalories(newVal);
    setCaloriesForDate(getTodayKey(), newVal);
    setWeeklyData(getLast7Days(getPastDates(7)));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Calorie Counter</Text>
          <CalorieChart data={weeklyData} labels={dateLabels}/>
          <Text style={styles.calories}>{calories} Calories Today</Text>

          <CalorieButtons
            onAdd={() => {
              setPendingDelta(1);
              setModalVisible(true);
            }}
            onSubtract={() => {
              setPendingDelta(-1);
              setModalVisible(true);
            }}
          />

          <Modal
            transparent
            animationType="fade"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Enter Calories</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="e.g. 200"
                  keyboardType="numeric"
                  value={inputValue}
                  onChangeText={setInputValue}
                  autoFocus
                  returnKeyType="done"
                  blurOnSubmit={true}
                  onSubmitEditing={Keyboard.dismiss}
                />
                {/* <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    const value = parseInt(inputValue);
                    if (!isNaN(value)) {
                      updateCalories(calories + pendingDelta * value);
                    }
                    setInputValue('');
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#007aff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
