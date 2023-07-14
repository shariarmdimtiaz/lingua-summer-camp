import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//import "./Checkout.css";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const CheckoutForm = ({ id, classId, className, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log('payment method', paymentMethod)
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    // console.log("payment intent", paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      // save payment information to the server
      const payment = {
        email: user?.email,
        className,
        price,
        transactionId: paymentIntent.id,
        date: new Date(),
        status: "Payment done!",
      };

      axiosSecure.post("/payments", payment).then((res) => {
        fetch(`${api.apiUrl}/classes/enrollment/${id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              console.log("modifiedCount:", data.modifiedCount);
              //refetch();
              //Swal.fire("Saved!", "", "success");
            }
          });

        fetch(`${api.apiUrl}/updateAvailableSeats/${classId}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("available students >>>", data);
            if (data.modifiedCount > 0) {
              Swal.fire("Updated available seats!", "", "success");
            }
          });
        // display confirm
        Swal.fire("Your payment has been completed.");
      });
    }
  };

  return (
    <>
      <form className="m-10 md:px-10" onSubmit={handleSubmit}>
        <p className="pb-3 font-bold">Your bill: ${price}</p>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary btn-sm mt-4 border-0  hover:bg-green-600 hover:border-0"
          type="submit"
          //   disabled={!stripe || !clientSecret || processing}
        >
          Check out
        </button>
      </form>
      {cardError && <p className="text-red-600 ml-8 pb-5">{cardError}</p>}
      {transactionId && (
        <p className="text-green-500 pb-5">
          Transaction complete with transactionId: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
