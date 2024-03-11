// react imports
import { useState, useEffect, useRef } from "react";

// rrd imports
import { useFetcher } from "react-router-dom";

import expenseCategories from "../components/expenseCategories.json";
import incomeCategories from "../components/incomeCategory.json";
import challengeList from "../pages/challengeList.json";

const ChallengesPage = () => {
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
  const handleChallengeChange = (e) => {
    setSelectedChallenge(e.target.value);
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Kreiraj novi izazov</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
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
                <label>Izaberi kategoriju troška na koji se odnosi izazov:</label>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
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
          <div >
            {(selectedChallenge === "Ograničeni horizont" ||
              selectedChallenge === "Troškovna trka") && (
              <div className="grid-xs">
                <label htmlFor="newChallengeDate" className="divBudzet">Izaberi rok</label>
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
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
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
  );
};

export default ChallengesPage;
