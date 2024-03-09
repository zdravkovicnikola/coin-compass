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
  waait,
} from "../helpers";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const email = fetchData("email");
  const password = fetchData("password");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  const incomes = fetchData("incomes");

  return {
    budgets,
    expenses,
    userName,
    email,
    password,
    incomes,
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

const Dashboard = () => {
  const { email, budgets, expenses, incomes } = useLoaderData();

  let transactions = [];

  if (expenses && expenses.length > 0) {
    transactions = expenses.map((expense) => ({ ...expense, type: "expense" }));
  }

  if (incomes && incomes.length > 0) {
    transactions = transactions.concat(
      incomes.map((income) => ({ ...income, type: "income" }))
    );
  }
  console.log(transactions);
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
                        .slice(0,3)}
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
