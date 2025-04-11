export const getTodayKey = (): string => {
    return new Date().toISOString().split('T')[0];
  };
  
  export const getPastDates = (days: number): string[] => {
    const dates: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };
  