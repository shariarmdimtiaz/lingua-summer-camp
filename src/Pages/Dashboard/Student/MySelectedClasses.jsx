import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const MySelectedClasses = () => {
  const { user } = useContext(AuthContext);
  const [mySelectedClasses, setMySelectedClasses] = useState([]);
  console.log(mySelectedClasses);

  useEffect(() => {
    fetch(`${api.apiUrl}/mySelectedClasses/${user.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem(
          "language-access-token"
        )}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setMySelectedClasses(data);
        }
      });
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-3xl font-semibold my-4">
        Total Class: {mySelectedClasses.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Class Name</th>
              <th>Price</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {mySelectedClasses.map((classInfo, index) => (
              <tr key={classInfo._id}>
                <th>{index + 1}</th>
                <td>{classInfo.classImage}</td>
                <td>{classInfo.className}</td>
                <td>{classInfo.price}</td>
                <td>
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <Link to="students/payment">
                      <button className="btn btn-ghost bg-orange-600  text-white">
                        Payment
                      </button>
                    </Link>
                  )}
                </td>
                <td>
                  <button
                    //onClick={() => handleDelete(user)}
                    className="btn btn-ghost bg-red-600  text-white"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySelectedClasses;
