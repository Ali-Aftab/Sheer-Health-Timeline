const Bills = ({ list }) => {
  return (
    <div>
      <h4>Bills</h4>
      {list.length > 0
        ? list.map((bill) => (
            <div key={bill.bill_id}>
              <h5>Bill on {new Date(bill.create_time).toLocaleString()}</h5>
              <h6>Amount Billed: ${bill.amount_billed.toFixed(2)}</h6>
              <h6>Ammount Allowed: ${bill.amount_allowed.toFixed(2)}</h6>
              <h6>
                Patient Cost: $
                {(bill.amount_billed - bill.amount_allowed).toFixed(2)}
              </h6>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Bills;
