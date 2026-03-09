import Page from "./page.js";

class LoginPage extends Page {
  get usernameInput() {
    return $('[data-testid="username-input"]');
  }

  get passwordInput() {
    return $('[data-testid="password-input"]');
  }

  get loginButton() {
    return $('[data-testid="login-button"]');
  }

  get loginError() {
    return $('[data-testid="login-error"]');
  }

  async open(options = {}) {
    const path = options.exerciseMode ? "/index.html?mode=exercise" : "/index.html";
    await super.open(path);
  }

  async login(username, password) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }
}

export default new LoginPage();
