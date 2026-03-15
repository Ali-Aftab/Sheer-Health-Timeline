const Bills = ({ list }) => {
  return (
    <div className="tab-content">
      <p className="tab-title">Bills</p>
      {list.length > 0 ? (
        list.map((bill) => (
          <div key={bill.bill_id} className="tab-item">
            <p className="tab-item-label">
              {new Date(bill.create_time).toLocaleString()}
            </p>
            <div className="bill-row">
              <span>Billed</span>
              <span className="bill-billed">
                ${bill.amount_billed.toFixed(2)}
              </span>
            </div>
            <div className="bill-row">
              <span>Allowed</span>
              <span className="bill-allowed">
                ${bill.amount_allowed.toFixed(2)}
              </span>
            </div>
            <div className="bill-row">
              <span>Patient Cost</span>
              <span className="bill-cost">
                ${(bill.amount_billed - bill.amount_allowed).toFixed(2)}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="tab-item-label">No bills</p>
      )}
    </div>
  );
};
export default Bills;
