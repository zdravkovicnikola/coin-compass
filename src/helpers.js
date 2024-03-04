export const waait = () => new Promise(res => setTimeout(res, Math.random() * 800));

//colors
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`
}

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// izbrisi stavku
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// napravi budzet
export const createBudget = ({ amount }) => {
  const existingBudgets = fetchData("budgets") ?? [];
  if (existingBudgets.length > 0) {
    throw new Error("Već postoji budžet.");
  }
  const newItem = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor()
  }
  localStorage.setItem("budgets", JSON.stringify([newItem]));
}

// napravi trosak
export const createExpense = ({
  name, amount, budgetId
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId
  }
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem("expenses",
    JSON.stringify([...existingExpenses, newItem]))
}

// napravi prihod
export const createIncome = ({
  name, amount, budgetId
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId
  }
  const existingIncomes = fetchData("incomes") ?? [];
  return localStorage.setItem("incomes",
    JSON.stringify([...existingIncomes, newItem]))
}



// total potroseno 
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc

    // add the current amount to my total
    return acc += expense.amount
  }, 0)
  return budgetSpent;
}
// total pridodato 
export const calculateIncomeByBudget = (budgetId) => {
  const incomes = fetchData("incomes") ?? [];
  const budgetIncome = incomes.reduce((acc, income) => {
    // Proveravamo da li income.budgetId === budgetId koji je prosleđen
    if (income.budgetId !== budgetId) return acc;

    // Dodajemo trenutni iznos prihoda na ukupan prihod
    return acc += income.amount;
  }, 0);
  return budgetIncome;
};


// FORMATTING
export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

// Formatiranje procenata
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  })
}

// Format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD"
  })
}