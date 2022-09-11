function TopSellingProducts() {
  return (
    <div className="table-scroll">
      <table className="table-responsive">
        <thead style={{ borderBottom: '3px solid #ddd' }}>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Variant Options</th>
            <th scope="col">Net Quantity</th>
            <th scope="col">Gross Sales (BDT)</th>
            <th scope="col">Discounts (BDT)</th>
            <th scope="col">Net Sales (BDT)</th>
            <th scope="col">Total Cost Price (BDT)</th>
            <th scope="col">Gross Profit (BDT)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <th scope="row">.</th>
            <td>.</td>
            <td>.</td>
            <td>.</td> */}
          </tr>
        </tbody>
      </table>
      <div className="no-record-block">
        <p className="message">No product sales data found</p>
      </div>
    </div>
  );
}

export default TopSellingProducts;
