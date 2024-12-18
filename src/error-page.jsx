import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Page not found</p>
      <p>
        <button onClick={() => navigate("/home")} className="p-2">Go back to home page</button>
        {/* <i>{error.statusText || error.message}</i> */}
      </p>
    </div>
  );
}