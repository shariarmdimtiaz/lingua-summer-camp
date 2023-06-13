import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const MyClasses = () => {
  const { user } = useContext(AuthContext);
  const [myClasses, setMyClasses] = useState([]);
  console.log(myClasses);

  useEffect(() => {
    fetch(`${api.apiUrl}/myclasses/${user.email}`, {
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
          setMyClasses(data);
        }
      });
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-3xl font-semibold my-4">
        Total Users: {myClasses.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
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
            </tr>
          </thead>
          <tbody>
            {myClasses.map((classInfo, index) => (
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
                <td>{classInfo.enrolledStudents}</td>
                <td>{classInfo.status}</td>
                <td>{classInfo.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
