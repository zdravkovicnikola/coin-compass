// rrd imports
import { Link, useLoaderData } from "react-router-dom";

//library imports
import { toast } from "react-toastify";


//components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

//  helper functions
import { createBudget, createExpense,deleteItem, fetchData, waait } from "../helpers";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const email = fetchData("email");
  const password = fetchData("password");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { budgets, expenses, userName, email, password };
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
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Novčanik napravljen!");
    } catch (e) {
      throw new Error("Problem sa kreiranjem novčanika.");
    }
  }
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const Dashboard = () => {
 const {email, budgets, expenses } = useLoaderData();
 return (
    <>
      {email ? (
        <div className="dashboard">
          <h2>
            Dobrodošao nazad, <span className="accent">{email}</span>
          </h2>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-sm">
                <div className="flex-sm">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Postojeći budžeti</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Skorašnji Troškovi</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
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
