function ShirtCustomizationTable({
  selectedColor,
  selectedLogo,
  logoOptions,
  onLogoChange
}) {
  if (!selectedColor || !logoOptions.length) {
    return null;
  }

  return (
    <table
      className="customization-table"
      data-testid="shirt-options-table"
      aria-label="Shirt customization options"
    >
      <thead>
        <tr>
          <th>Color</th>
          <th>Logo/Icon</th>
          <th>Preview</th>
        </tr>
      </thead>
      <tbody>
        <tr data-testid="shirt-options-row">
          <td data-testid="selected-shirt-color">{selectedColor}</td>
          <td>
            <select
              value={selectedLogo}
              onChange={(event) => onLogoChange(event.target.value)}
              data-testid="shirt-logo-select"
              aria-label="Select shirt logo"
            >
              <option value="">Choose a logo</option>
              {logoOptions.map((logo) => (
                <option key={logo} value={logo}>
                  {logo}
                </option>
              ))}
            </select>
          </td>
          <td data-testid="selected-shirt-logo-preview">
            {selectedLogo ? `Icon: ${selectedLogo}` : "No logo selected"}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ShirtCustomizationTable;
