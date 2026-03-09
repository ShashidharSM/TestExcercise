import { useState } from "react";

function LoginForm({ onLogin, isExerciseMode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/users.json");
      const data = await response.json();
      const user = data.users.find(
        (entry) => entry.username === username && entry.password === password
      );

      if (!user) {
        setError("Invalid username or password.");
        return;
      }

      onLogin(user.username);
    } catch (fetchError) {
      setError("Unable to load credentials.");
    }
  };

  return (
    <main className="login-page" data-testid="login-page">
      <section className="login-card" data-testid="login-card">
        <h1 data-testid="login-title">SDET Interview Store</h1>
        {isExerciseMode ? (
          <p className="exercise-badge" data-testid="exercise-mode-badge">
            Exercise mode enabled
          </p>
        ) : null}
        <p data-testid="login-subtitle">Login to start the exercise</p>
        <form onSubmit={handleSubmit} data-testid="login-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            data-testid="username-input"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            data-testid="password-input"
          />

          <button type="submit" data-testid="login-button">
            Login
          </button>
        </form>
        {error ? (
          <p className="error-message" role="alert" data-testid="login-error">
            {error}
          </p>
        ) : null}
      </section>
    </main>
  );
}

export default LoginForm;
