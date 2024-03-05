// helper functions
import { calculateIncomeByBudget, calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";

const BudgetItem = ({ budget }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);
  const incomed = calculateIncomeByBudget(id);

  return (
    <div
      className="budget"
      style={{
        "--accent-green": "color",
        color: "black",
        textShadow: `0 0 1px rgba(0,0,0,0.8)`
      }}
    >
      <div className="progress-text">
        <h3>Novčanik</h3>
        <p>{formatCurrency(amount - spent + incomed)} Budžet</p>
      </div>
      <progress max={amount + incomed} value={spent}>
        {formatPercentage((spent) / (amount + incomed))}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} potrošeno</small>
        <small>...</small>
        <small >{formatCurrency(incomed)} pridodato</small>
        
      </div>
    </div>
  )
}
export default BudgetItem