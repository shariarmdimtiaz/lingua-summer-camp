import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useEnrolledClasses from "../../../Hooks/useEnrolledClasses";
import { ThemeContext } from "../../../Providers/ThemeProvider";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const MyEnrolledClasses = () => {
  const [EnrolledClasses, refetch, dataLoading] = useEnrolledClasses();
  const { containerStyles } = useContext(ThemeContext);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${api.apiUrl}/deleteSelectedClasses/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your class has been deleted.", "success");
            }
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="w-full">
      <h3 className="text-3xl text-center font-semibold my-4">
        My Enrolled Classes
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th style={containerStyles}>#</th>
              <th style={containerStyles}>Image</th>
              <th style={containerStyles}>Class Name</th>
              <th style={containerStyles}>Price</th>
              <th style={containerStyles}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {EnrolledClasses.map((classInfo, index) => (
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
                <td>{classInfo.price}</td>
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

export default MyEnrolledClasses;
