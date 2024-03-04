// helper imports
import { Link, useFetcher } from "react-router-dom"
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems, } from "../helpers"



const IncomeItem = ({ income }) => {
    const fetcher = useFetcher();

    const budget = getAllMatchingItems({
      category: "budgets",
      key: "id",
      value: income.budgetId,
    })[0];
  return (
    <>
      <td>{income.name}</td>
      <td>{formatCurrency(income.amount)}</td>
      <td>{formatDateToLocaleString(income.createdAt)}</td>
      <td>
        <Link
          to={`/budget/${budget.id}`}
          style={{
            "--accent-green": budget.color,
          }}
        >
          Prihod
        </Link>
      </td>
    </>
  )
}
export default IncomeItem