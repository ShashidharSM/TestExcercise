class LoginPage {
  visit(options = {}) {
    const { exerciseMode = false } = options;
    const url = exerciseMode
      ? "standalone/index.html?mode=exercise"
      : "standalone/index.html";
    cy.visit(url);
  }

  typeUsername(username) {
    cy.getByTestId("username-input").clear().type(username);
  }

  typePassword(password) {
    cy.getByTestId("password-input").clear().type(password);
  }

  submit() {
    cy.getByTestId("login-button").click();
  }

  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.submit();
  }

  errorMessage() {
    return cy.getByTestId("login-error");
  }
}

export default LoginPage;
