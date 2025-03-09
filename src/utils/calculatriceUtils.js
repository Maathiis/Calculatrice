let history = [];

export const calculate = (expression) => {
  try {
    const result = eval(expression); // Utilisez une méthode plus sûre pour évaluer les expressions
    history.push({ expression, result });
    return result;
  } catch (error) {
    throw new Error('Invalid expression');
  }
};

export const getHistory = () => {
  return history;
};

export const clearHistory = () => {
  history = [];
};
