function ProductCard({
  product,
  selections,
  onColorChange,
  onSizeChange,
  onAddToCart
}) {
  const selectedColor = selections?.selectedColor || "";
  const selectedSize = selections?.selectedSize || "";

  return (
    <article className="product-card" data-testid={`product-card-${product.id}`}>
      <h3 data-testid={`product-name-${product.id}`}>{product.name}</h3>
      <p data-testid={`product-price-${product.id}`}>${product.price.toFixed(2)}</p>

      {product.colors ? (
        <>
          <label htmlFor={`color-${product.id}`}>Color</label>
          <select
            id={`color-${product.id}`}
            value={selectedColor}
            onChange={(event) => onColorChange(product.id, event.target.value)}
            data-testid={`color-select-${product.id}`}
          >
            <option value="">Choose color</option>
            {product.colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </>
      ) : null}

      {product.sizes ? (
        <>
          <label htmlFor={`size-${product.id}`}>Size</label>
          <select
            id={`size-${product.id}`}
            value={selectedSize}
            onChange={(event) => onSizeChange(product.id, event.target.value)}
            data-testid={`size-select-${product.id}`}
          >
            <option value="">Choose size</option>
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </>
      ) : null}

      <button
        type="button"
        onClick={() => onAddToCart(product.id)}
        data-testid={`add-to-cart-${product.id}`}
      >
        Add to cart
      </button>
    </article>
  );
}

export default ProductCard;
