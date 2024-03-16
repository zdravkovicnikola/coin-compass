// react imports
import { useState, useEffect, useRef } from "react";

// rrd imports
import { useFetcher } from "react-router-dom";

import expenseCategories from "../components/expenseCategories.json";

const AddExpenseForm = ({ budgets}) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      // clear form
      formRef.current.reset();
      // reset focus
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  useEffect(() => {
    // Ovde možete dodatno obraditi učitane kategorije ako je potrebno
  }, []);

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    setShowCustomCategory(selectedValue === "Moja kategorija");
  };

  const addNewCategoryToJson = async (newCategory) => {
    const newCategoryObject = {
      id: expenseCategories.length + 1,
      name: newCategory,
    };
    const updatedCategories = [...expenseCategories, newCategoryObject];

    // Ažuriranje stanja expenseCategories
    setExpenseCategories(updatedCategories);

    // Pretvaranje niza kategorija u JSON format
    const jsonCategories = JSON.stringify(updatedCategories, null, 2);

    try {
      // Slanje ažuriranih kategorija na server koristeći fetch
      const response = await fetch("expenseCategories.json", {
        method: "PUT", // ili 'POST' zavisno od servera
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonCategories,
      });

      if (!response.ok) {
        throw new Error("Failed to write to JSON file.");
      }

      console.log("Category added to JSON file successfully.");
    } catch (error) {
      console.error("Error:", error);
    }

    setCustomCategory("");
    setShowCustomCategory(false);
  };
  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Dodaj novi{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
        </span>{" "}
        trošak
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense" className="divBudzet">
              Naziv
            </label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="npr. Kafa"
              ref={focusRef}
              required
              className="pomoc"
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount" className="divBudzet">
              Iznos
            </label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="npr. 3.50$"
              required
              className="pomoc"
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget" className="divBudzet">
            Budget Category
          </label>
          <select
            name="newExpenseBudget"
            id="newExpenseBudget"
            required
            className="pomoc"
          >
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="grid-xs">
          <label htmlFor="newExpenseCategory" className="divBudzet">
            Izaberi kategoriju troška
          </label>
          <select
            name="newExpenseCategory"
            id="newExpenseCategory"
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
            className="pomoc"
          >
            <option value="" disabled hidden>
              Izaberi kategoriju troska
            </option>
            {expenseCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
            <option value="Moja kategorija">Moja kategorija</option>
          </select>
          {showCustomCategory && (
            <div className="grid-xs">
              <label htmlFor="newCustomExpenseCategory" className="divBudzet">
                Unesite svoju kategoriju
              </label>
              <input
                type="text"
                name="newCustomExpenseCategory"
                id="newCustomExpenseCategory"
                placeholder="npr. Sport"
                required
                className="pomoc"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addNewCategoryToJson(e.target.value);
                  }
                }}
              />
            </div>
          )}
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting} >
          {isSubmitting ? (
            <span>Submitting…</span>
          ) : (
            <>
              <span>Dodaj</span>
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};
export default AddExpenseForm;
