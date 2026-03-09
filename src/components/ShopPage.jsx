import { useEffect, useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import CartTable from "./CartTable";
import ShirtCustomizationTable from "./ShirtCustomizationTable";

function getDefaultSelections() {
  return products.reduce((accumulator, product) => {
    accumulator[product.id] = {
      selectedColor: "",
      selectedSize: "",
      selectedLogo: ""
    };
    return accumulator;
  }, {});
}

function ShopPage({ username, onLogout, isExerciseMode }) {
  const [selections, setSelections] = useState(getDefaultSelections);
  const [cartItems, setCartItems] = useState([]);
  const [showShirtOptionsTable, setShowShirtOptionsTable] = useState(false);

  const shirt = products.find((product) => product.type === "shirt");
  const shirtSelections = selections[shirt.id];
  const shirtLogoOptions = useMemo(() => {
    const color = shirtSelections.selectedColor;
    return color ? shirt.logoOptionsByColor[color] || [] : [];
  }, [shirt.logoOptionsByColor, shirtSelections.selectedColor]);

  useEffect(() => {
    if (!shirtSelections.selectedColor) {
      setShowShirtOptionsTable(false);
      return;
    }

    if (isExerciseMode) {
      const randomDelayMs = Math.floor(Math.random() * 700) + 200;
      const timerId = setTimeout(() => {
        setShowShirtOptionsTable(true);
      }, randomDelayMs);
      return () => clearTimeout(timerId);
    }

    setShowShirtOptionsTable(true);
    return undefined;
  }, [isExerciseMode, shirtSelections.selectedColor]);

  const setSelection = (productId, key, value) => {
    setSelections((current) => ({
      ...current,
      [productId]: {
        ...current[productId],
        [key]: value,
        ...(key === "selectedColor" && !isExerciseMode ? { selectedLogo: "" } : {})
      }
    }));
  };

  const addToCart = (productId) => {
    const product = products.find((item) => item.id === productId);
    const productSelection = selections[productId];
    const options = [];

    if (productSelection.selectedColor) {
      options.push(`Color: ${productSelection.selectedColor}`);
    }

    if (productSelection.selectedSize) {
      options.push(`Size: ${productSelection.selectedSize}`);
    }

    if (productSelection.selectedLogo) {
      options.push(`Logo: ${productSelection.selectedLogo}`);
    }

    setCartItems((current) => [
      ...current,
      {
        id: product.id,
        name: product.name,
        options,
        price: product.price
      }
    ]);
  };

  const removeCartItem = (index) => {
    setCartItems((current) =>
      current.filter((_, itemIndex) =>
        itemIndex !== (isExerciseMode ? Math.max(0, index - 1) : index)
      )
    );
  };

  const subtotal = isExerciseMode
    ? Math.floor(cartItems.reduce((sum, item) => sum + item.price, 0))
    : cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="shop-page" data-testid="shop-page">
      <header className="shop-header">
        <h1 data-testid="shop-title">Interview Shopping Cart</h1>
        <div className="user-block">
          {isExerciseMode ? (
            <span className="exercise-badge" data-testid="exercise-mode-badge">
              Exercise mode enabled
            </span>
          ) : null}
          <span data-testid="welcome-text">Welcome, {username}</span>
          <button type="button" onClick={onLogout} data-testid="logout-button">
            Logout
          </button>
        </div>
      </header>

      <section className="product-grid" data-testid="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            selections={selections[product.id]}
            onColorChange={(productId, color) => setSelection(productId, "selectedColor", color)}
            onSizeChange={(productId, size) => setSelection(productId, "selectedSize", size)}
            onAddToCart={addToCart}
          />
        ))}
      </section>

      <section className="customization-section" data-testid="customization-section">
        <h2>Shirt Customization</h2>
        <p data-testid="customization-hint">
          Selecting a shirt color reveals logo/icon options in the table.
        </p>
        <ShirtCustomizationTable
          selectedColor={showShirtOptionsTable ? shirtSelections.selectedColor : ""}
          selectedLogo={shirtSelections.selectedLogo}
          logoOptions={shirtLogoOptions}
          onLogoChange={(logo) => setSelection(shirt.id, "selectedLogo", logo)}
        />
      </section>

      <section className="cart-section">
        <h2>Cart</h2>
        <CartTable items={cartItems} onRemove={removeCartItem} />
        <p className="subtotal" data-testid="cart-subtotal">
          Subtotal: ${subtotal.toFixed(2)}
        </p>
      </section>
    </main>
  );
}

export default ShopPage;
