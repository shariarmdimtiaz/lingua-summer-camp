import { useEffect, useState } from "react";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(`${api.apiUrl}/classes`, {
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
          setClasses(data);
        }
      });
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-3xl font-semibold my-4">
        Total Users: {classes.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Class Name</th>
              <th>Instructor</th>
              <th>Instructor Email</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((class, index) => (
              <tr key={class._id}>
                <th>{index + 1}</th>
                <td>{class.img}</td>
                <td>{class.className}</td>
                <td>{class.email}</td>
                <td>{class.seats}</td>
                <td>{class.price}</td>
                <td>
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost bg-orange-600  text-white"
                    >
                      <FaUserShield></FaUserShield>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
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

export default ManageClasses;
