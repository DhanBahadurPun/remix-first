import {
  Form,
  Link,
  useActionData,
  useMatches,
  useParams,
  useSubmit,
  useTransition as useNavigation,
} from "@remix-run/react";

function ExpenseForm() {
  const validationErrors = useActionData();
  // const submit = useSubmit();
  const navigation = useNavigation();
  const params = useParams();
  const matches = useMatches();

  const expenses = matches.find(
    (match) => match.id === "routes/__app/expenses"
  ).data;

  const expenseData = expenses.find((expense) => expense.id === params.Id);

  if (params.Id && !expenseData) {
    return <p>Invalid Id.</p>;
  }

  const isSubmitting = navigation.state !== "idle";

  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  // function submitHandler(event) {
  //   event.preventDefault();
  //   // perform validation
  //   submit(event.target, { action: "/expenses/add", method: "post" });
  // }

  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  return (
    <Form
      method={expenseData ? "patch" : "post"}
      className="form"
      id="expense-form"
      // onSubmit={submitHandler}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValues.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            defaultValue={defaultValues.amount}
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            defaultValue={
              defaultValues.date ? defaultValues.date.slice(0, 10) : ""
            }
            required
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Save..." : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
