import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

// TODO: provide publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  const location = useLocation();
  const { id, classId, className, price } = location.state;

  const paymentPrice = parseFloat(price.toFixed(2));
  return (
    <div>
      <h2 className="text-3xl"> Card Info...</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          id={id}
          classId={classId}
          className={className}
          price={paymentPrice}
        ></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
