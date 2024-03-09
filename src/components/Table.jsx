// component import
import ExpenseItem from "./ExpenseItem"
import IncomeItem from "./IncomeItem"

const Table = ({ transactions , showBudget = true}) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {
              ["Naziv", "Iznos", "Datum", "Kategorija", showBudget ? "Tip" : "", ""].map(
                (i, index) => (
                <th key={index}>{i}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                {transaction.type === "expense" ? (
                  <ExpenseItem expense={transaction} showBudget={showBudget}/>
                ) : (
                  <IncomeItem income={transaction} showBudget={showBudget}/>
                )}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
export default Table