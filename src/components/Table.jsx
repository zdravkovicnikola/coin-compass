// component import
import ExpenseItem from "./ExpenseItem"
import IncomeItem from "./IncomeItem"

const Table = ({ transactions }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {
              ["Naziv", "Iznos", "Datum", "Tip"].map((i, index) => (
                <th key={index}>{i}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                {transaction.type === "expense" ? (
                  <ExpenseItem expense={transaction} />
                ) : (
                  <IncomeItem income={transaction} />
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