import React, { useState } from "react";

// rrd imports
import { useLoaderData } from "react-router-dom";

//library imports
import { toast } from "react-toastify";

import incomeCategories from "../components/incomeCategory.json"

// components
import AddIncomeForm from "../components/AddIncomeForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helpers
import { createIncome,  deleteItem,  getAllMatchingItems } from "../helpers";

// loader
export async function budgetIncomeLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const incomes = await getAllMatchingItems({
    category: "incomes",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you’re trying to find doesn’t exist");
  }

  return { budget, incomes };
}

// action
export async function budgetIncomeAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteIncome") {
    try {
      deleteItem({
        key: "incomes",
        id: values.incomeId,
      });
      return toast.success("Prihod izbrisan!");
    } catch (e) {
      throw new Error("Postoji problem pri brisanju prihoda.");
    }
  }
  if (_action === "createIncome") {
    try {
      createIncome({
        name: values.newIncome,
        amount: values.newIncomeAmount,
        categoryId: values.newExpenseCategory,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(
        `Dodali ste ${values.newIncomeAmount} $ na racun iz izvora ${values.newIncome}!`
      );
    } catch (e) {
      throw new Error("Došlo je do problema prilikom kreiranja vašeg prihoda.");
    }
  }

}

const BudgetIncomePage = () => {
  const { budget, incomes } = useLoaderData();
  const [filteredCategory, setFilteredCategory] = useState("");

  const handleFilterChange = (e) => {
    const selectedCategory = e.target.value;
    setFilteredCategory(selectedCategory);
  };

  let transactions = [];
  if (incomes && incomes.length > 0) {
    transactions = incomes.map((income) => ({ ...income, type: "income" }));
  }

  let filteredIncomes = [];
  if (filteredCategory) {
    filteredIncomes = transactions.filter(
      (income) => income.categoryId === filteredCategory
    );
  } else {
    filteredIncomes = transactions;
  }

  let noIncomesMessage = null;
  if (filteredCategory && filteredIncomes.length === 0) {
    noIncomesMessage = <p>Nema prihoda za izabranu kategoriju.</p>;
  }
  return (
    <div
      className="grid-lg"
      style={{
        "--accent-green": budget.color,
        textShadow: `0 0 1px rgba(0,0,0,0.8)`
      }}
    >
      <h1 className="h2">
        <span className="accent">Pregled</span> stanja
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} />
        <AddIncomeForm budgets={[budget]} />
      </div>
      {incomes && incomes.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">Prihodi</span> 
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
              {incomeCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <Table transactions={filteredIncomes} showBudget={false} />
          {noIncomesMessage}
        </div>
      )}
    </div>
  );
};
export default BudgetIncomePage;
