import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  isError,
} from "react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";
import useAllUser from "../../../Hooks/useAllUser";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const ManageUsers = () => {
  const [UserInfo, refetch, userLoading] = useAllUser();
  console.log(UserInfo);

  const handleMakeAdmin = (user) => {
    fetch(`${api.apiUrl}/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an admin now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleMakeInstructor = (user) => {
    fetch(`${api.apiUrl}/users/instructor/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an instructor now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  //TODO
  const handleDelete = (user) => {
    const proceed = confirm("Are You sure you want to delete?");
    if (proceed) {
      fetch(`${api.apiUrl}/users/${user._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User has been deleted.", "success");
            // alert("Deleted successful!");
            // const remaining = users.filter((info) => info._id !== user.id);
            // setUsers(remaining);
          }
        });
    }
  };
  return (
    <div className="w-full">
      <h3 className="text-3xl font-semibold my-4">All Users</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {UserInfo.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "instructor" ? (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost bg-red-600  text-white"
                    >
                      <FaUserShield></FaUserShield>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeInstructor(user)}
                      className="btn btn-ghost bg-indigo-600  text-white"
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

export default ManageUsers;
