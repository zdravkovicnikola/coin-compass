// react imports
import { useState, useEffect, useRef } from "react";

//library imports
import { toast } from "react-toastify";
// rrd imports
import { useFetcher, useLoaderData } from "react-router-dom";

import expenseCategories from "../components/expenseCategories.json";
import challengeList from "../pages/challengeList.json";

import { createChallenge, fetchData, waait , deleteItem,} from "../helpers";
import TableChallenges from "../components/TableChallenges";

export function challengeLoader() {
  const challenges = fetchData("challenges");
  const budgets = fetchData("budgets");

  return {
    budgets,
    challenges,
  };
}
export async function challengeAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action == "createChallenge")
    try {
      createChallenge({
        name: values.newChallenge,
        quest: values.newChallengeCategory,
        categoryId: values.newExpenseCategory,
        amount: values.newChallengeAmount,
        date: values.newChallengeDate,
        budgetId: values.newExpenseBudget
      });
      return toast.success(
        `Uspešno ste kreirali izazov ${values.newChallenge} , srećno!`
      );
    } catch (e) {
      throw new Error("Došlo je do problema prilikom kreiranja izazova.");
    }
    if (_action === "deleteChallenge") {
      try {
        deleteItem({
          key: "challenges",
          id: values.challengeId,
        });
        return toast.success("Izazov uspešno izbrisan");
      } catch (e) {
        throw new Error("Pojavio se problem pri brisanju izazova.");
      }
    }
}
const ChallengesPage = () => {
  const { challenges, budgets } = useLoaderData();

  const currentDate = new Date();

  const tomorrow = new Date(currentDate);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minDate = tomorrow.toISOString().split("T")[0];

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
  const [selectedChallenge, setSelectedChallenge] = useState("");

  useEffect(() => {
    // Ovde možete dodatno obraditi učitane kategorije ako je potrebno
  }, []);

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
  };
  const handleChallengeChange = (e) => {
    setSelectedChallenge(e.target.value);
  };
  
  var status = "neizvrsen";
  return (
    <>    
      <div className="form-wrapper">
        <h2 className="h3">Kreiraj novi izazov</h2>
        <fetcher.Form method="post" className="flex-lg" ref={formRef}>
          <div className="challenge-s">
            <div className="grid-xs">
              <label htmlFor="newChallenge" className="divBudzet">
                Naziv izazova
              </label>
              <input
                type="text"
                name="newChallenge"
                id="newChallenge"
                placeholder="npr. Izazov štednje za putovanje"
                ref={focusRef}
                required
                className="pomoc"
              />
            </div>
            <div className="grid-xs">
              <label htmlFor="newChallengeCategory" className="divBudzet">
                Izaberi izazov
              </label>
              <select
                name="newChallengeCategory"
                id="newChallengeCategory"
                value={selectedChallenge}
                onChange={handleChallengeChange}
                required
                className="pomoc"
              >
                <option value="" hidden>
                  Izaberi tip izazova
                </option>
                {challengeList.map((challenge) => (
                  <option key={challenge.id} value={challenge.name}>
                    {challenge.name}
                  </option>
                ))}
              </select>
              {selectedChallenge && (
                <div className="grid-xs">
                  <label>
                    Izaberi kategoriju troška na koji se odnosi izazov:
                  </label>
                  <select
                    name="newExpenseCategory"
                    id="newExpenseCategory"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    required
                    className="pomoc"
                  >
                    <option value="" hidden>
                      Izaberi kategoriju troška
                    </option>
                    {expenseCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                    <option value="Bilo koji trosak">Bilo koji trošak</option>
                  </select>
                </div>
              )}
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
              <label htmlFor="newChallengeAmount" className="divBudzet">
                Zadaj iznos
              </label>
              <input
                type="number"
                step="0.01"
                inputMode="decimal"
                name="newChallengeAmount"
                id="newChallengeAmount"
                placeholder="npr. 350$"
                required
                className="pomoc"
              />
            </div>
            <div>
              {(selectedChallenge === "Ograničeni horizont" ||
                selectedChallenge === "Troškovna trka") && (
                <div className="grid-xs">
                  <label htmlFor="newChallengeDate" className="divBudzet">
                    Izaberi rok
                  </label>
                  <input
                    type="date"
                    name="newChallengeDate"
                    id="newChallengeDate"
                    min={minDate}
                    required
                    className="pomoc"
                  />
                </div>
              )}
            </div>
          </div>
          <input type="hidden" name="_action" value="createChallenge" />
          <button
            type="submit"
            className="btn btn--dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Submitting…</span>
            ) : (
              <>
                <span>Kreiraj izazov</span>
              </>
            )}
          </button>
        </fetcher.Form>
      </div>
      <h2> </h2>
      <div className="grid-sm">
        {challenges && challenges.length > 0 && (
          <div className="grid-md">
            <h3>Lista izazova</h3>
            <TableChallenges challenges={challenges} />
          </div>
        )}
      </div>
    </>
  );
};

export default ChallengesPage;
