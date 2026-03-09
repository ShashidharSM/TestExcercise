function CartTable({ items, onRemove }) {
  return (
    <table className="cart-table" data-testid="cart-table" aria-label="Shopping cart items">
      <thead>
        <tr>
          <th>Item</th>
          <th>Options</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.length ? (
          items.map((item, index) => (
            <tr key={`${item.id}-${index}`} data-testid={`cart-row-${index}`}>
              <td>{item.name}</td>
              <td>
                {item.options.length ? item.options.join(", ") : "Default configuration"}
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  data-testid={`remove-item-${index}`}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr data-testid="empty-cart-row">
            <td colSpan={4}>No items in cart</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default CartTable;
