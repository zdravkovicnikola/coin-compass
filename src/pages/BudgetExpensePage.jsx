import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { toast } from "react-toastify";

import expenseCategories from "../components/expenseCategories.json"

import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

export async function budgetExpenseLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you’re trying to find doesn’t exist");
  }

  return { budget, expenses };
}

export async function budgetExpenseAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        categoryId: values.newExpenseCategory,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(
        `Skinuli ste ${values.newExpenseAmount} $ sa računa pri uzimanju ${values.newExpense}!`
      );
    } catch (e) {
      throw new Error("Došlo je do problema prilikom kreiranja transakcije.");
    }
  }
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Trošak izbrisan");
    } catch (e) {
      throw new Error("Pojavio se problem pri brisanju troška.");
    }
  }
}

const BudgetExpensePage = () => {
  const { budget, expenses } = useLoaderData();
  const [filteredCategory, setFilteredCategory] = useState("");

  const handleFilterChange = (e) => {
    const selectedCategory = e.target.value;
    setFilteredCategory(selectedCategory);
  };

  let transactions = [];
  if (expenses && expenses.length > 0) {
    transactions = expenses.map((expense) => ({ ...expense, type: "expense" }));
  }

  let filteredExpenses = [];
  if (filteredCategory) {
    filteredExpenses = transactions.filter(
      (expense) => expense.categoryId === filteredCategory
    );
  } else {
    filteredExpenses = transactions;
  }

  let noExpensesMessage = null;
  if (filteredCategory && filteredExpenses.length === 0) {
    noExpensesMessage = <p>Nema troškova za izabranu kategoriju.</p>;
  }

  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
        textShadow: `0 0 1px rgba(0,0,0,0.8)`,
      }}
    >
      <h1 className="h2">
        <span className="accent">Pregled</span> stanja
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">Troškovi</span>
          </h2>
          <div className="grid-xs">
            <label htmlFor="filterCategory">Filtriraj po kategoriji:</label>
            <select
              name="filterCategory"
              id="filterCategory"
              value={filteredCategory}
              onChange={handleFilterChange}
            >
              <option value="">Sve kategorije</option>
              {expenseCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <Table transactions={filteredExpenses} showBudget={false} />
          {noExpensesMessage}
        </div>
      )}
    </div>
  );
};

export default BudgetExpensePage;
