import AuthForm from "~/components/auth/AuthForm";
import authStyles from "~/styles/auth.css";

export default function Auth() {
  return <AuthForm />;
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}

export async function action({ request }) {
  const serachParams = new URL(request.url).serachParams;
  const authMode = serachParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  if (authMode === "login") {
  } else {
  }
}
