// react imports
import { useEffect, useRef } from "react"

// rrd imports
import { useFetcher } from "react-router-dom"


const AddIncomeForm = ({ budgets }) => {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef()
  const focusRef = useRef()

  useEffect(() => {
    if (!isSubmitting) {
      // clear form
      formRef.current.reset()
      // reset focus
      focusRef.current.focus()
    }

  }, [isSubmitting])

  return (
    <div className="form-wrapper">
      <h2 className="h3">Dodaj novi prihod
      </h2>
      <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
      >
        <div className="income-inputs">
          <div className="grid-xs">
            <label htmlFor="newIncome"className="divBudzet">Naziv</label>
            <input
              type="text"
              name="newIncome"
              id="newIncome"
              placeholder="npr. Plata"
              ref={focusRef}
              required
              className="pomoc"
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newIncomeAmount"className="divBudzet">Iznos</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newIncomeAmount"
              id="newIncomeAmount"
              placeholder="npr. 1000$"
              required
              className="pomoc"
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget"className="divBudzet">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required 
              className="pomoc">
            {
              budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  )
                })
            }
          </select>
        </div>
        <input type="hidden" name="_action" value="createIncome" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {
            isSubmitting ? <span>Submitting…</span> : (
              <>
                <span>Dodaj</span>
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  )
}
export default AddIncomeForm