const { useEffect, useMemo, useState } = React;
const h = React.createElement;

const products = [
  {
    id: "shirt-001",
    type: "shirt",
    name: "Classic Shirt",
    price: 25.99,
    colors: ["red", "blue", "black"],
    logoOptionsByColor: {
      blue: ["Mountain", "Rocket", "Wave"],
      red: ["Flame", "Bolt"],
      black: ["Minimal Dot", "Monogram"]
    }
  },
  {
    id: "jeans-001",
    type: "pants",
    name: "Slim Jeans",
    price: 49.99,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "jacket-001",
    type: "jacket",
    name: "Bomber Jacket",
    price: 79.99,
    sizes: ["M", "L", "XL"]
  }
];

function getDefaultSelections() {
  return products.reduce((acc, product) => {
    acc[product.id] = { selectedColor: "", selectedSize: "", selectedLogo: "" };
    return acc;
  }, {});
}

async function fetchUsers() {
  try {
    const response = await fetch("./users.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("users.json unavailable");
    }
    const data = await response.json();
    return data.users || [];
  } catch {
    const inlineJson = document.getElementById("users-json")?.textContent || '{"users":[]}';
    const blob = new Blob([inlineJson], { type: "application/json" });
    const blobUrl = URL.createObjectURL(blob);
    const blobResponse = await fetch(blobUrl);
    const data = await blobResponse.json();
    URL.revokeObjectURL(blobUrl);
    return data.users || [];
  }
}

function LoginForm({ onLogin, isExerciseMode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const users = await fetchUsers();
    const user = users.find((entry) => entry.username === username && entry.password === password);
    if (!user) {
      setError("Invalid username or password.");
      return;
    }
    onLogin(user.username);
  };

  return h(
    "main",
    { className: "login-page", "data-testid": "login-page" },
    h(
      "section",
      { className: "login-card", "data-testid": "login-card" },
      h("h1", { "data-testid": "login-title" }, "SDET Interview Store"),
      isExerciseMode
        ? h(
            "p",
            { className: "exercise-badge", "data-testid": "exercise-mode-badge" },
            "Exercise mode enabled"
          )
        : null,
      h("p", { "data-testid": "login-subtitle" }, "Login to start the exercise"),
      h(
        "form",
        { onSubmit: handleSubmit, "data-testid": "login-form" },
        h("label", { htmlFor: "username" }, "Username"),
        h("input", {
          id: "username",
          name: "username",
          type: "text",
          autoComplete: "username",
          value: username,
          onChange: (event) => setUsername(event.target.value),
          "data-testid": "username-input"
        }),
        h("label", { htmlFor: "password" }, "Password"),
        h("input", {
          id: "password",
          name: "password",
          type: "password",
          autoComplete: "current-password",
          value: password,
          onChange: (event) => setPassword(event.target.value),
          "data-testid": "password-input"
        }),
        h("button", { type: "submit", "data-testid": "login-button" }, "Login")
      ),
      error
        ? h("p", { className: "error-message", role: "alert", "data-testid": "login-error" }, error)
        : null
    )
  );
}

function ShirtCustomizationTable({ selectedColor, selectedLogo, logoOptions, onLogoChange }) {
  if (!selectedColor || !logoOptions.length) {
    return null;
  }

  return h(
    "table",
    {
      className: "customization-table",
      "data-testid": "shirt-options-table",
      "aria-label": "Shirt customization options"
    },
    h(
      "thead",
      null,
      h("tr", null, h("th", null, "Color"), h("th", null, "Logo/Icon"), h("th", null, "Preview"))
    ),
    h(
      "tbody",
      null,
      h(
        "tr",
        { "data-testid": "shirt-options-row" },
        h("td", { "data-testid": "selected-shirt-color" }, selectedColor),
        h(
          "td",
          null,
          h(
            "select",
            {
              value: selectedLogo,
              onChange: (event) => onLogoChange(event.target.value),
              "data-testid": "shirt-logo-select",
              "aria-label": "Select shirt logo"
            },
            h("option", { value: "" }, "Choose a logo"),
            ...logoOptions.map((logo) => h("option", { key: logo, value: logo }, logo))
          )
        ),
        h(
          "td",
          { "data-testid": "selected-shirt-logo-preview" },
          selectedLogo ? `Icon: ${selectedLogo}` : "No logo selected"
        )
      )
    )
  );
}

function ProductCard({ product, selections, onColorChange, onSizeChange, onAddToCart }) {
  return h(
    "article",
    { className: "product-card", "data-testid": `product-card-${product.id}` },
    h("h3", { "data-testid": `product-name-${product.id}` }, product.name),
    h("p", { "data-testid": `product-price-${product.id}` }, `$${product.price.toFixed(2)}`),
    product.colors
      ? h(
          React.Fragment,
          null,
          h("label", { htmlFor: `color-${product.id}` }, "Color"),
          h(
            "select",
            {
              id: `color-${product.id}`,
              value: selections.selectedColor,
              onChange: (event) => onColorChange(product.id, event.target.value),
              "data-testid": `color-select-${product.id}`
            },
            h("option", { value: "" }, "Choose color"),
            ...product.colors.map((color) => h("option", { key: color, value: color }, color))
          )
        )
      : null,
    product.sizes
      ? h(
          React.Fragment,
          null,
          h("label", { htmlFor: `size-${product.id}` }, "Size"),
          h(
            "select",
            {
              id: `size-${product.id}`,
              value: selections.selectedSize,
              onChange: (event) => onSizeChange(product.id, event.target.value),
              "data-testid": `size-select-${product.id}`
            },
            h("option", { value: "" }, "Choose size"),
            ...product.sizes.map((size) => h("option", { key: size, value: size }, size))
          )
        )
      : null,
    h(
      "button",
      { type: "button", onClick: () => onAddToCart(product.id), "data-testid": `add-to-cart-${product.id}` },
      "Add to cart"
    )
  );
}

function CartTable({ items, onRemove }) {
  return h(
    "table",
    { className: "cart-table", "data-testid": "cart-table", "aria-label": "Shopping cart items" },
    h(
      "thead",
      null,
      h("tr", null, h("th", null, "Item"), h("th", null, "Options"), h("th", null, "Price"), h("th", null, "Action"))
    ),
    h(
      "tbody",
      null,
      items.length
        ? items.map((item, index) =>
            h(
              "tr",
              { key: `${item.id}-${index}`, "data-testid": `cart-row-${index}` },
              h("td", null, item.name),
              h("td", null, item.options.length ? item.options.join(", ") : "Default configuration"),
              h("td", null, `$${item.price.toFixed(2)}`),
              h(
                "td",
                null,
                h(
                  "button",
                  { type: "button", onClick: () => onRemove(index), "data-testid": `remove-item-${index}` },
                  "Remove"
                )
              )
            )
          )
        : h("tr", { "data-testid": "empty-cart-row" }, h("td", { colSpan: 4 }, "No items in cart"))
    )
  );
}

function HoverCustomizationTable({ selections, onAction }) {
  const shirtColor = selections["shirt-001"].selectedColor || "none";
  const shirtLogo = selections["shirt-001"].selectedLogo || "none";
  const jeansSize = selections["jeans-001"].selectedSize || "none";
  const jacketSize = selections["jacket-001"].selectedSize || "none";

  return h(
    "table",
    {
      className: "hover-customization-table",
      "data-testid": "hover-customization-table",
      "aria-label": "Hover actions for item customization"
    },
    h(
      "thead",
      null,
      h("tr", null, h("th", null, "Item"), h("th", null, "Current"), h("th", null, "Hover actions"))
    ),
    h(
      "tbody",
      null,
      h(
        "tr",
        { className: "hover-row", "data-testid": "hover-row-shirt" },
        h("td", null, "Classic Shirt"),
        h("td", { "data-testid": "hover-current-shirt" }, `Color: ${shirtColor}, Logo: ${shirtLogo}`),
        h(
          "td",
          null,
          h("span", { className: "action-hint" }, "Hover to reveal actions"),
          h(
            "div",
            { className: "hover-actions", "data-testid": "hover-actions-shirt" },
            h(
              "button",
              {
                type: "button",
                className: "icon-action-button",
                onClick: () => onAction("shirt-pick-color"),
                "data-testid": "hover-action-shirt-color"
              },
              h("span", { className: "action-icon", "aria-hidden": "true" }, "C"),
              "Pick color"
            ),
            h(
              "button",
              {
                type: "button",
                className: "icon-action-button",
                onClick: () => onAction("shirt-customize"),
                "data-testid": "hover-action-shirt-customize"
              },
              h("span", { className: "action-icon", "aria-hidden": "true" }, "*"),
              "Customize"
            )
          )
        )
      ),
      h(
        "tr",
        { className: "hover-row", "data-testid": "hover-row-jeans" },
        h("td", null, "Slim Jeans"),
        h("td", { "data-testid": "hover-current-jeans" }, `Size: ${jeansSize}`),
        h(
          "td",
          null,
          h("span", { className: "action-hint" }, "Hover to reveal actions"),
          h(
            "div",
            { className: "hover-actions", "data-testid": "hover-actions-jeans" },
            h(
              "button",
              {
                type: "button",
                className: "icon-action-button",
                onClick: () => onAction("jeans-size"),
                "data-testid": "hover-action-jeans-size"
              },
              h("span", { className: "action-icon", "aria-hidden": "true" }, "S"),
              "Pick size"
            ),
            h(
              "button",
              {
                type: "button",
                className: "icon-action-button",
                onClick: () => onAction("jeans-quick-m"),
                "data-testid": "hover-action-jeans-quick-m"
              },
              h("span", { className: "action-icon", "aria-hidden": "true" }, "M"),
              "Quick M"
            )
          )
        )
      ),
      h(
        "tr",
        { className: "hover-row", "data-testid": "hover-row-jacket" },
        h("td", null, "Bomber Jacket"),
        h("td", { "data-testid": "hover-current-jacket" }, `Size: ${jacketSize}`),
        h(
          "td",
          null,
          h("span", { className: "action-hint" }, "Hover to reveal actions"),
          h(
            "div",
            { className: "hover-actions", "data-testid": "hover-actions-jacket" },
            h(
              "button",
              {
                type: "button",
                className: "icon-action-button",
                onClick: () => onAction("jacket-size"),
                "data-testid": "hover-action-jacket-size"
              },
              h("span", { className: "action-icon", "aria-hidden": "true" }, "J"),
              "Pick size"
            ),
            h(
              "button",
              {
                type: "button",
                className: "icon-action-button",
                onClick: () => onAction("jacket-quick-l"),
                "data-testid": "hover-action-jacket-quick-l"
              },
              h("span", { className: "action-icon", "aria-hidden": "true" }, "L"),
              "Quick L"
            )
          )
        )
      )
    )
  );
}

function ShopPage({ username, onLogout, isExerciseMode }) {
  const [selections, setSelections] = useState(getDefaultSelections);
  const [cartItems, setCartItems] = useState([]);
  const [showShirtOptionsTable, setShowShirtOptionsTable] = useState(false);
  const [activeHoverEditor, setActiveHoverEditor] = useState("");

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
      const timerId = setTimeout(() => setShowShirtOptionsTable(true), randomDelayMs);
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
    if (productSelection.selectedColor) options.push(`Color: ${productSelection.selectedColor}`);
    if (productSelection.selectedSize) options.push(`Size: ${productSelection.selectedSize}`);
    if (productSelection.selectedLogo) options.push(`Logo: ${productSelection.selectedLogo}`);
    setCartItems((current) => [...current, { id: product.id, name: product.name, options, price: product.price }]);
  };

  const removeCartItem = (index) => {
    setCartItems((current) =>
      current.filter((_, itemIndex) => itemIndex !== (isExerciseMode ? Math.max(0, index - 1) : index))
    );
  };

  const subtotal = isExerciseMode
    ? Math.floor(cartItems.reduce((sum, item) => sum + item.price, 0))
    : cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleHoverAction = (actionId) => {
    switch (actionId) {
      case "shirt-pick-color":
        setActiveHoverEditor("shirt-color");
        break;
      case "shirt-customize":
        if (!shirtSelections.selectedColor) {
          setSelection("shirt-001", "selectedColor", "blue");
        }
        setActiveHoverEditor("shirt-logo");
        break;
      case "jeans-size":
        setActiveHoverEditor("jeans-size");
        break;
      case "jeans-quick-m":
        setSelection("jeans-001", "selectedSize", "M");
        setActiveHoverEditor("");
        break;
      case "jacket-size":
        setActiveHoverEditor("jacket-size");
        break;
      case "jacket-quick-l":
        setSelection("jacket-001", "selectedSize", "L");
        setActiveHoverEditor("");
        break;
      default:
        setActiveHoverEditor("");
    }
  };

  return h(
    "main",
    { className: "shop-page", "data-testid": "shop-page" },
    h(
      "header",
      { className: "shop-header" },
      h("h1", { "data-testid": "shop-title" }, "Interview Shopping Cart"),
      h(
        "div",
        { className: "user-block" },
        isExerciseMode
          ? h("span", { className: "exercise-badge", "data-testid": "exercise-mode-badge" }, "Exercise mode enabled")
          : null,
        h("span", { "data-testid": "welcome-text" }, `Welcome, ${username}`),
        h("button", { type: "button", onClick: onLogout, "data-testid": "logout-button" }, "Logout")
      )
    ),
    h(
      "section",
      { className: "product-grid", "data-testid": "product-list" },
      ...products.map((product) =>
        h(ProductCard, {
          key: product.id,
          product,
          selections: selections[product.id],
          onColorChange: (productId, color) => setSelection(productId, "selectedColor", color),
          onSizeChange: (productId, size) => setSelection(productId, "selectedSize", size),
          onAddToCart: addToCart
        })
      )
    ),
    h(
      "section",
      { className: "customization-section", "data-testid": "customization-section" },
      h("h2", null, "Item Customization"),
      h(
        "p",
        { "data-testid": "customization-hint" },
        "Hover a row to reveal actions like Pick color or Customize."
      ),
      h(HoverCustomizationTable, {
        selections,
        onAction: handleHoverAction
      }),
      activeHoverEditor === "shirt-color"
        ? h(
            "div",
            { className: "hover-editor-panel", "data-testid": "hover-editor-shirt-color" },
            h("label", { htmlFor: "hover-shirt-color-select" }, "Shirt color"),
            h(
              "select",
              {
                id: "hover-shirt-color-select",
                value: shirtSelections.selectedColor,
                onChange: (event) => setSelection("shirt-001", "selectedColor", event.target.value),
                "data-testid": "hover-shirt-color-select"
              },
              h("option", { value: "" }, "Choose color"),
              ...shirt.colors.map((color) => h("option", { key: color, value: color }, color))
            )
          )
        : null,
      activeHoverEditor === "jeans-size"
        ? h(
            "div",
            { className: "hover-editor-panel", "data-testid": "hover-editor-jeans-size" },
            h("label", { htmlFor: "hover-jeans-size-select" }, "Jeans size"),
            h(
              "select",
              {
                id: "hover-jeans-size-select",
                value: selections["jeans-001"].selectedSize,
                onChange: (event) => setSelection("jeans-001", "selectedSize", event.target.value),
                "data-testid": "hover-jeans-size-select"
              },
              h("option", { value: "" }, "Choose size"),
              ...products
                .find((product) => product.id === "jeans-001")
                .sizes.map((size) => h("option", { key: size, value: size }, size))
            )
          )
        : null,
      activeHoverEditor === "jacket-size"
        ? h(
            "div",
            { className: "hover-editor-panel", "data-testid": "hover-editor-jacket-size" },
            h("label", { htmlFor: "hover-jacket-size-select" }, "Jacket size"),
            h(
              "select",
              {
                id: "hover-jacket-size-select",
                value: selections["jacket-001"].selectedSize,
                onChange: (event) => setSelection("jacket-001", "selectedSize", event.target.value),
                "data-testid": "hover-jacket-size-select"
              },
              h("option", { value: "" }, "Choose size"),
              ...products
                .find((product) => product.id === "jacket-001")
                .sizes.map((size) => h("option", { key: size, value: size }, size))
            )
          )
        : null,
      h(ShirtCustomizationTable, {
        selectedColor: showShirtOptionsTable ? shirtSelections.selectedColor : "",
        selectedLogo: shirtSelections.selectedLogo,
        logoOptions: shirtLogoOptions,
        onLogoChange: (logo) => setSelection(shirt.id, "selectedLogo", logo)
      })
    ),
    h(
      "section",
      { className: "cart-section" },
      h("h2", null, "Cart"),
      h(CartTable, { items: cartItems, onRemove: removeCartItem }),
      h("p", { className: "subtotal", "data-testid": "cart-subtotal" }, `Subtotal: $${subtotal.toFixed(2)}`)
    )
  );
}

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState("");
  const isExerciseMode = new URLSearchParams(window.location.search).get("mode") === "exercise";
  if (!authenticatedUser) {
    return h(LoginForm, { onLogin: setAuthenticatedUser, isExerciseMode });
  }
  return h(ShopPage, {
    username: authenticatedUser,
    onLogout: () => setAuthenticatedUser(""),
    isExerciseMode
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));
