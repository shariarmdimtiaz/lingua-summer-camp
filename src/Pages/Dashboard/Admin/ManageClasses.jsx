import { useEffect, useState } from "react";
import { FaTrashAlt, FaShieldAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAllClasses from "../../../Hooks/useAllClasses";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const ManageClasses = () => {
  const [AllClassInfo, refetch, dataLoading] = useAllClasses();

  const handleStatus = (data) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Approve",
      denyButtonText: `Deny`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const classInfo = {
          status: "approved",
        };
        fetch(`${api.apiUrl}/class-status/${data._id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(classInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              Swal.fire("Saved!", "", "success");
            }
          });
      } else if (result.isDenied) {
        const classInfo = {
          status: "denied",
        };
        fetch(`${api.apiUrl}/class-status/${data._id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(classInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              Swal.fire("Saved!", "", "success");
            }
          });
      }
    });
  };

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
      <h3 className="text-3xl text-center font-semibold my-4">
        Manage Classes
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
              <th>Action</th>
              <th>Feedback</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {AllClassInfo.map((classData, index) => (
              <tr key={classData._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded">
                      <img src={classData.classImage} />
                    </div>
                  </div>
                </td>
                <td>{classData.className}</td>
                <td>{classData.instructorName}</td>
                <td>{classData.instructorEmail}</td>
                <td>{classData.availableSeats}</td>
                <td>{classData.price}</td>
                <td>{classData.status}</td>
                <td>
                  <button
                    onClick={() => handleStatus(classData)}
                    className="btn btn-ghost bg-green-500  text-white"
                  >
                    <FaShieldAlt></FaShieldAlt>
                  </button>
                </td>
                <td>
                  <Link to={`/dashboard/feedback/${classData._id}`}>
                    <button className="btn btn-ghost bg-indigo-600  text-white">
                      <FaEdit></FaEdit>
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(classData._id)}
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
