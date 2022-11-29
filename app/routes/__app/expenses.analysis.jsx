import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";

import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Error from "~/components/util/Error";
import { getExpenses } from "~/data/expenses.server";

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();
  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader() {
  const expenses = await getExpenses();
  if (!expenses || expenses.length === 0) {
    throw json(
      { message: "Could not load expenses for the requested analysis." },
      {
        status: 404,
        statusText: "Expense Not Found!",
      }
    );
  }
  return expenses;
}

export function CatchBoundary() {
  const caughtResponse = useCatch();

  return (
    <main>
      <Error title={caughtResponse.statusText}>
        <p>
          {caughtResponse.data?.message ||
            "Something went wrong! Could not load Expenses"}
        </p>
      </Error>
    </main>
  );
}
