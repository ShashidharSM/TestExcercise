import { useState } from "react";
import LoginForm from "./components/LoginForm";
import ShopPage from "./components/ShopPage";

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState("");
  const isExerciseMode =
    new URLSearchParams(window.location.search).get("mode") === "exercise";

  if (!authenticatedUser) {
    return <LoginForm onLogin={setAuthenticatedUser} isExerciseMode={isExerciseMode} />;
  }

  return (
    <ShopPage
      username={authenticatedUser}
      onLogout={() => setAuthenticatedUser("")}
      isExerciseMode={isExerciseMode}
    />
  );
}

export default App;
