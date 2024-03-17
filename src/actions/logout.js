// rrd imports
import { redirect } from "react-router-dom";

// helpers
import { deleteItem } from "../helpers";
import { toast } from "react-toastify";

export async function logoutAction() {
  // delete the user
  deleteItem({
    key: "userName"
  });
  deleteItem({
    key: "email"
  });
  deleteItem({
    key: "password"
  });
  deleteItem({
    key: "budgets"
  });
  deleteItem({
    key: "expenses"
  });
  deleteItem({
    key: "incomes"
  });
  deleteItem({
    key: "challenges"
  });
  deleteItem({
    key: "done"
  });
  toast.success("Uspešno izbrisan nalog!");
  // return redirect
  return redirect("/")
}