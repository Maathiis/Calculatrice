let historyInMemory = [];

export const calculate = (expression) => {
  try {
    const result = eval(expression);

    const entry = { expression, result, timestamp: new Date() };
    historyInMemory.push(entry);

    try {
      const existingHistory = localStorage.getItem('calculatorHistory');
      const parsedHistory = existingHistory ? JSON.parse(existingHistory) : [];
      parsedHistory.push(entry);
      localStorage.setItem('calculatorHistory', JSON.stringify(parsedHistory));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }

    return result;
  } catch (error) {
    throw new Error('Invalid expression');
  }
};

export function getHistory() {
  if (historyInMemory.length > 0) {
    return historyInMemory;
  }

  try {
    const historyData = localStorage.getItem('calculatorHistory');
    if (!historyData) return [];

    const parsedHistory = JSON.parse(historyData);

    return parsedHistory.map((entry) => ({
      ...entry,
      timestamp: new Date(entry.timestamp),
    }));
  } catch (error) {
    console.error('Error loading calculator history:', error);
    return [];
  }
}

export function saveHistory(history) {
  historyInMemory = [...history];

  try {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Error saving calculator history:', error);
  }
}

export function clearHistory() {
  historyInMemory = [];

  try {
    localStorage.removeItem('calculatorHistory');
  } catch (error) {
    console.error('Error clearing calculator history:', error);
  }

  return [];
}
