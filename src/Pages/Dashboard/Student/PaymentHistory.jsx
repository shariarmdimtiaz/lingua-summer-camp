import usePaymentHistory from "../../../Hooks/usePaymentHistory";

const PaymentHistory = () => {
  const [UserPaymentHistory, refetch, dataLoading] = usePaymentHistory();
  return (
    <div>
      <div className="w-full">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Class Name</th>
                <th>Price</th>
                <th>Transaction ID</th>
                <th>Payment Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {UserPaymentHistory.map((data, index) => (
                <tr key={data._id}>
                  <th>{index + 1}</th>
                  <td>{data.className}</td>
                  <td>${data.price}</td>
                  <td>{data.transactionId}</td>
                  <td>{data.date}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
