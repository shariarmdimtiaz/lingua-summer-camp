import { AuthContext } from "../../Providers/AuthProviders";
import { useContext } from "react";
import Swal from "sweetalert2";
const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const Card = ({ classInfo }) => {
  const { user } = useContext(AuthContext);
  const handleAddToCart = (data, user) => {
    // save class to cart
    const email = user.email;
    const classImage = data.classImage;
    const className = data.className;
    const price = parseInt(data.price);
    const isEnrolled = 0;
    const classId = data._id;
    const selectedClass = {
      email,
      classImage,
      className,
      price,
      isEnrolled,
      classId,
    };

    fetch(`${api.apiUrl}/addSelectedClass`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(selectedClass),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Course selected.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div>
      {classInfo.availableSeats === 0 ? (
        <>
          <div className="card w-96 bg-red-400 shadow-xl">
            <figure>
              <img src={classInfo.classImage} alt="Image" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Class Name: {classInfo.className}</h2>
              <div className="flex justify-between">
                <p>
                  Available Seats:{" "}
                  <span className="font-bold">{classInfo.availableSeats}</span>
                </p>
                <p>
                  Price: <span className="font-bold">${classInfo.price}</span>
                </p>
              </div>
              <p>
                Enrolled Students:{" "}
                <span className="font-bold">
                  {classInfo.totalSeats - classInfo.availableSeats}
                </span>
              </p>
              <div className="card-actions justify-end">
                {classInfo.availableSeats === 0 ? (
                  <>
                    <button
                      onClick={() => handleAddToCart(classInfo, user)}
                      className="btn btn-primary"
                      disabled
                    >
                      Select
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleAddToCart(classInfo, user)}
                      className="btn btn-primary"
                    >
                      Select
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src={classInfo.classImage} alt="Image" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Class Name: {classInfo.className}</h2>
              <div className="flex justify-between">
                <p>
                  Available Seats:{" "}
                  <span className="font-bold">{classInfo.availableSeats}</span>
                </p>
                <p>
                  Price: <span className="font-bold">${classInfo.price}</span>
                </p>
              </div>
              <p>
                Enrolled Students:{" "}
                <span className="font-bold">
                  {classInfo.totalSeats - classInfo.availableSeats}
                </span>
              </p>
              <div className="card-actions justify-end">
                {classInfo.availableSeats === 0 ? (
                  <>
                    <button
                      onClick={() => handleAddToCart(classInfo, user)}
                      className="btn btn-primary"
                      disabled
                    >
                      Select
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleAddToCart(classInfo, user)}
                      className="btn btn-primary"
                    >
                      Select
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
