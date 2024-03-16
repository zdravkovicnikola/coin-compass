export const waait = () => 
new Promise(res => setTimeout(res, Math.random() * 800));

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
  name, amount, categoryId ,budgetId 
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    categoryId: categoryId,
    budgetId: budgetId,
  }
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem("expenses",
    JSON.stringify([...existingExpenses, newItem]))
}

// napravi prihod
export const createIncome = ({
  name, amount , categoryId, budgetId
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    categoryId: categoryId,
    budgetId: budgetId
  }
  const existingIncomes = fetchData("incomes") ?? [];
  return localStorage.setItem("incomes",
    JSON.stringify([...existingIncomes, newItem]))
}

// napravi izazov
export const createChallenge = ({
  name, amount, categoryId , quest , date, budgetId
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    date: date,
    budgetId: budgetId,
    amount: +amount,
    categoryId: categoryId,
    quest: quest,
    status: "Neizvršen"
  }
  const existingChallenges = fetchData("challenges") ?? [];
  return localStorage.setItem("challenges",
    JSON.stringify([...existingChallenges, newItem]))
}

//update Challenges
export const updateChallenges = ({ expense, action }) => {
  const existingChallenges = fetchData("challenges") ?? [];
  let updatedChallenges = [...existingChallenges];
  let doneCount = parseInt(localStorage.getItem("done")) || 0;

  updatedChallenges = updatedChallenges.map(challenge => {
    if (action === "create" && (challenge.createdAt < expense.createdAt) && (challenge.categoryId === expense.categoryId || challenge.categoryId === "Bilo koji trosak")) {
      challenge.amount -= expense.amount;
      if (challenge.amount <= 0 && challenge.status !== "Izvršen") {
        doneCount++;
        challenge.status = "Izvršen";
      }
    } else if (action === "delete" && (challenge.createdAt < expense.createdAt) && (challenge.categoryId === expense.categoryId || challenge.categoryId === "Bilo koji trosak")) {
      challenge.amount += expense.amount;
      if (challenge.amount > 0 && challenge.status === "Izvršen") {
        doneCount--;
        challenge.status = "Neizvršen";
      }
    }
    return challenge;
  });

  // Čuvanje ažuriranih izazova i broja završenih izazova u lokalnom skladištu
  localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
  localStorage.setItem("done", doneCount.toString());
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