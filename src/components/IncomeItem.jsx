// helper imports
import { Link, useFetcher } from "react-router-dom"

// library import
import { TrashIcon } from "@heroicons/react/24/solid";

import { formatCurrency, formatDateToLocaleString, getAllMatchingItems, } from "../helpers"

const IncomeItem = ({ income , showBudget}) => {
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
      <td>{income.categoryId}</td>
      {showBudget && (
      <td>
        <Link
          to={`/budgetincome/${budget.id}`}
          style={{
            "--accent-green": budget.color,
          }}
        >
          Prihod
        </Link>
      </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteIncome" />
          <input type="hidden" name="incomeId" value={income.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${income.name} income`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  )
}
export default IncomeItem