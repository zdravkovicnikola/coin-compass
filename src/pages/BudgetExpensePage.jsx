// rrd imports
import { useLoaderData } from "react-router-dom";

//library imports
import { toast } from "react-toastify";

// components
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helpers
import { createExpense,  deleteItem,  getAllMatchingItems } from "../helpers";

// loader
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

// action
export async function budgetExpenseAction({ request }) {

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
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
  let transactions = [];

  if (expenses && expenses.length > 0) {
    transactions = expenses.map((expense) => ({ ...expense, type: "expense" }));
  }
  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
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
          <Table transactions={transactions} showBudget={false} />
        </div>
      )}
    </div>
  );
};
export default BudgetExpensePage;
