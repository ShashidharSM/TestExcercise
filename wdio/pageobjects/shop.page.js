import Page from "./page.js";

class ShopPage extends Page {
  get shopPageRoot() {
    return $('[data-testid="shop-page"]');
  }

  get welcomeText() {
    return $('[data-testid="welcome-text"]');
  }

  get shirtColorSelect() {
    return $('[data-testid="color-select-shirt-001"]');
  }

  get shirtLogoSelect() {
    return $('[data-testid="shirt-logo-select"]');
  }

  get addShirtToCartButton() {
    return $('[data-testid="add-to-cart-shirt-001"]');
  }

  get addJeansToCartButton() {
    return $('[data-testid="add-to-cart-jeans-001"]');
  }

  get jeansSizeSelect() {
    return $('[data-testid="size-select-jeans-001"]');
  }

  get subtotalText() {
    return $('[data-testid="cart-subtotal"]');
  }

  get exerciseBadge() {
    return $('[data-testid="exercise-mode-badge"]');
  }
}

export default new ShopPage();
