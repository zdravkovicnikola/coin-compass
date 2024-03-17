// rrd imports
import { Link, useLoaderData } from "react-router-dom";

//library imports
import { toast } from "react-toastify";

//components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import AddIncomeForm from "../components/AddIncomeForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

//  helper functions
import {
  createBudget,
  createExpense,
  createIncome,
  deleteItem,
  fetchData,
  updateChallenges,
  waait,
} from "../helpers";
import { useEffect, useState } from "react";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const email = fetchData("email");
  const password = fetchData("password");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  const incomes = fetchData("incomes");
  const challenges = fetchData("challenges");
  const done = fetchData("done");

  return {
    budgets,
    expenses,
    userName,
    email,
    password,
    incomes,
    challenges,
    done,
  };
}

//action
export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("email", JSON.stringify(values.email));
      return toast.success(`Dobrodošao, ${values.userName}`);
    } catch (e) {
      throw new Error("Postoji problem u kreiranju naloga.");
    }
  }
  if (_action === "createBudget") {
    try {
      createBudget({
        amount: values.newBudgetAmount,
      });
      return toast.success("Novčanik je napravljen!");
    } catch (e) {
      throw new Error("Problem sa kreiranjem novčanika.");
    }
  }
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        categoryId: values.newExpenseCategory,
        budgetId: values.newExpenseBudget,
      });
      const newExpense = {
        name: values.newExpense,
        amount: values.newExpenseAmount,
        categoryId: values.newExpenseCategory,
        budgetId: values.newExpenseBudget,
        createdAt: Date.now(),
      };
      updateChallenges({ expense: newExpense, action: "create" });
      return toast.success(
        `Skinuli ste ${values.newExpenseAmount} $ sa računa pri uzimanju ${values.newExpense}!`
      );
    } catch (e) {
      throw new Error("Došlo je do problema prilikom kreiranja transakcije.");
    }
  }
  if (_action === "deleteExpense") {
    try {
      let expenses = fetchData("expenses");
      const deletedExpense = expenses.find(
        (expense) => expense.id === values.expenseId
      );

      if (!deletedExpense) {
        throw new Error("Trošak nije pronađen.");
      }

      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });

      updateChallenges({ expense: deletedExpense, action: "delete" });

      return toast.success("Trošak izbrisan");
    } catch (e) {
      console.log(e);
      throw new Error("Pojavio se problem pri brisanju troška.");
    }
  }
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
        categoryId: values.newIncomeCategory,
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

var completedChallenges = [];
const Dashboard = () => {
  const { email, budgets, expenses, incomes, challenges, done } =
    useLoaderData();

  let transactions = [];

  if (expenses && expenses.length > 0) {
    transactions = expenses.map((expense) => ({ ...expense, type: "expense" }));
  }

  if (incomes && incomes.length > 0) {
    transactions = transactions.concat(
      incomes.map((income) => ({ ...income, type: "income" }))
    );
  }

  useEffect(() => {
    if (!done || !challenges) {
      return; // Ako su done ili challenges null, prekidamo izvršenje useEffect-a
    }
    challenges.forEach((challenge) => {
      if (
        challenge.status === "Izvršen" &&
        !completedChallenges.includes(challenge.id)
      ) {
        toast.success(`Izazov "${challenge.name}" je uspešno izvršen!`);
        completedChallenges.push(challenge.id);
      } else if (
        (challenge.quest === "Ograničeni horizont" ||
          challenge.quest === "Troškovna trka") &&
        !completedChallenges.includes(challenge.id)
      ) {
        const challengeDate = new Date(challenge.date);
        const currentDate = new Date();

        if (challengeDate < currentDate) {
          toast.error(`Izazov "${challenge.name}" je istekao!`);
          completedChallenges.push(challenge.id);
        }
      }
    });
  }, [challenges]);
  return (
    <>
      {email ? (
        <div className="dashboard">
          <h3>
            Dobrodošao nazad, <span className="accent">{email}</span>
          </h3>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-sm">
                <div className="budgets">
                  {budgets.length > 0 && (
                    <BudgetItem key={budgets[0].id} budget={budgets[0]} />
                  )}
                  <Link to="challenges">
                    <button className="button-49">
                      <span className="accent">Dodaj izazov</span>
                    </button>
                  </Link>
                  <p>
                    Status: {done || 0} /{" "}
                    {(challenges && challenges.length) || 0}
                  </p>
                </div>
                <div className="flex-lg">
                  <AddExpenseForm budgets={budgets} />
                  <AddIncomeForm budgets={budgets} />
                </div>
                {transactions && transactions.length > 0 && (
                  <div className="grid-md">
                    <h3>Skorašnje Transakcije</h3>
                    <Table
                      transactions={transactions
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 3)}
                    />
                    {transactions.length > 3 && (
                      <Link to="transactions" className="btn btn--dark">
                        Vidi sve troskove
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Finansijsko planiranje je tajna finansijske slobode.</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;
