// rrd imports
import { useLoaderData } from "react-router-dom";

// library import
import { toast } from "react-toastify";

// component imports
import Table from "../components/Table";

// helpers
import {deleteItem, fetchData } from "../helpers";

// loader
export function transactionsLoader() {
    const expenses = fetchData("expenses");
  const incomes = fetchData("incomes");
  return { expenses, incomes };
}

//action
export async function transactionsAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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
}


const TransactionsPage = () => {
  const { expenses, incomes } = useLoaderData();

  let transactions = [];

  if (expenses && expenses.length > 0) {
    transactions = expenses.map((expense) => ({ ...expense, type: "expense" }));
  }

  if (incomes && incomes.length > 0) {
    transactions = transactions.concat(
      incomes.map((income) => ({ ...income, type: "income" }))
    );
  }
  return (
    <div className="grid-lg">
      <h1>Sve transakcije</h1>
      {transactions && transactions.length > 0 ? (
        <div className="grid-md">
          <h2>
            Nedavne transakcije <small>({transactions.length} ukupno)</small>
          </h2>
          <Table transactions={transactions} />
        </div>
      ) : (
        <p>Nema transakcija za prikazivanje</p>
      )}
    </div>
  );
};

export default TransactionsPage;
