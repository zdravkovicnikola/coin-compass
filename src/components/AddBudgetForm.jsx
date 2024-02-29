// reacts
import { useEffect, useRef } from "react";

// rrd imports
import { Form, useFetcher } from "react-router-dom";

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {  //resetovanje
    if (!isSubmitting) {
      formRef.current.reset()
      focusRef.current.focus() // fokus na odredjeni input
    }
  }, [isSubmitting])
  return (
    <div className="form-wrapper">
      <h2>"Pecunia non olet."</h2>
      <p>- Novac ne miriše.</p>
      <fetcher.Form method="post" 
                    className="grid-sm"
                    ref={formRef}>
          {/* <div htmlFor="newBudget" className="divBudzet">Ovo je budžet za</div>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="npr. Izlazak"
            required
            className="pomoc"
          /> */}
          <div htmlFor="newBudgetAmount" className="divBudzet">Unesite iznos kojim raspolažete</div>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="npr. $150"
            required
            inputMode="decimal"
            className="pomoc"
            ref = {focusRef}
          />
          <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {
            isSubmitting ? <span>
            Slanje...</span> : (
              <>
                <span>Napravi novčanik</span>
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  );
};
export default AddBudgetForm;
