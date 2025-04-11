import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { CalorieChartProps } from '../types';

const screenWidth = Dimensions.get('window').width;

const CalorieChart: React.FC<CalorieChartProps> = ({ data }) => (
  <LineChart
    data={{
      labels: ['-6', '-5', '-4', '-3', '-2', '-1', 'Today'],
      datasets: [{ data }]
    }}
    width={screenWidth - 40}
    height={200}
    chartConfig={{
      backgroundColor: '#fff',
      backgroundGradientFrom: '#fff',
      backgroundGradientTo: '#fff',
      decimalPlaces: 0,
      color: () => `rgba(0, 0, 0, 0.5)`,
      style: { borderRadius: 10 },
    }}
    bezier
    style={{ marginVertical: 20 }}
  />
);

export default CalorieChart;
