export interface CalorieButtonsProps {
    onAdd: () => void;
    onSubtract: () => void;
  }
  
  export interface CalorieInputProps {
    input: string;
    onChangeText: (text: string) => void;
  }
  
  export interface CalorieChartProps {
    data: number[];
  }
  