// calculator.js
export const calculate = (num1, num2, operator) => {
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);
  switch (operator) {
    case '+':
      return n1 + n2;
    case '-':
      return n1 - n2;
    case '×':
      return n1 * n2;
    case '/':
      return n1 / n2;
    case '%':
      return (n1 * n2) / 100;
    default:
      return NaN;
  }
};
