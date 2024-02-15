import { Form } from "react-router-dom";

const AddBudgetForm = () => {
  return (
    <div className="form-wrapper">
      <h2>"Pecunia non olet."</h2>
      <p>- Novac ne miriše.</p>
      <Form method="post" className="grid-sm">
          <div htmlFor="newBudget" className="divBudzet">Ovo je budžet za</div>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="npr. Izlazak"
            required
            className="pomoc"
          />
          <div htmlFor="newBudgetAmount" className="divBudzet">Iznos</div>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="npr. $150"
            required
            inputMode="decimal"
            className="pomoc"
          />
          <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark">
          <span>Napravi budžet</span>
        </button>
      </Form>
    </div>
  );
};
export default AddBudgetForm;
