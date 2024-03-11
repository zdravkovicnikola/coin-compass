import React from "react";

// rrd imports
import { Link, useFetcher } from "react-router-dom";

// library import
import { TrashIcon } from "@heroicons/react/24/solid";

import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helpers";

const ChallengeItem = ({ challenge }) => {
  const fetcher = useFetcher();

  const  budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: challenge.budgetId,
  })[0];

  return (
    <>
      <td>{challenge.name}</td>
      <td>{challenge.quest}</td>
      <td>{challenge.categoryId}</td>
      <td>{formatCurrency(challenge.amount)}</td>
      <td>{formatDateToLocaleString(challenge.date)}</td>
      <td>{challenge.done}</td>
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteChallenge" />
          <input type="hidden" name="challengeId" value={challenge.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${challenge.name} challenge`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ChallengeItem;
