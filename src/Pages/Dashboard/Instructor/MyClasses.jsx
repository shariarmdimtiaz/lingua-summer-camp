import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import useSelectedClasses from "../../../Hooks/useInstructorClasses";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const MyClasses = () => {
  const [InstructorClasses, refetch, dataLoading] = useSelectedClasses();
  const { user } = useContext(AuthContext);

  const handleDelete = (id) => {
    const proceed = confirm("Are You sure you want to delete?");
    if (proceed) {
      fetch(`${api.apiUrl}/deleteClasses/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your class has been deleted.", "success");
          }
        });
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-3xl text-center font-semibold my-4">My Classes</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-black">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Class Name</th>
              <th>Available Seats</th>
              <th>Enrolled Students</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {InstructorClasses.map((classInfo, index) => (
              <tr key={classInfo._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded">
                      <img src={classInfo.classImage} />
                    </div>
                  </div>
                </td>
                <td>{classInfo.className}</td>
                <td>{classInfo.availableSeats}</td>
                <td>{classInfo.totalSeats - classInfo.availableSeats}</td>
                <td>{classInfo.status}</td>
                <td>{classInfo.feedback}</td>
                <td>
                  <button
                    onClick={() => handleDelete(classInfo._id)}
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

export default MyClasses;
