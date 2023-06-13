import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};
const AddClass = () => {
  const { user } = useContext(AuthContext);
  console.log(user.email);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const instructorName = data.instructorName;
    const instructorEmail = data.email;
    const className = data.className;
    const totalSeats = parseInt(data.seats);
    const availableSeats = parseInt(data.seats);
    const enrolledStudents = 0;
    const price = data.price;
    const classImage = data.classImage;
    const status = "pending";
    const feedback = "";

    const classInfo = {
      instructorName,
      instructorEmail,
      className,
      totalSeats,
      availableSeats,
      enrolledStudents,
      price,
      classImage,
      status,
      feedback,
    };

    fetch(`${api.apiUrl}/addClasses`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(classInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Class has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h1 className="text-center font-bold text-4xl">Add Class</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Instructor Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            name="instructorName"
            placeholder="Instructor name"
            defaultValue={user?.displayName}
            readOnly
            className="input input-bordered"
          />
          {errors.name && (
            <span className="text-red-600">Instructor name is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Instructor Email</span>
          </label>
          <input
            type="text"
            {...register("email", { required: true })}
            name="email"
            placeholder="Instructor email"
            defaultValue={user?.email}
            readOnly
            className="input input-bordered"
          />
          {errors.email && (
            <span className="text-red-600">Email is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class Name</span>
          </label>
          <input
            type="text"
            {...register("className", { required: true })}
            name="className"
            placeholder="Class name"
            className="input input-bordered"
          />
          {errors.className && (
            <span className="text-red-600">Class name is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Available Seats</span>
          </label>
          <input
            type="number"
            {...register("seats", { required: true })}
            name="seats"
            placeholder="Available seats"
            defaultValue={""}
            className="input input-bordered"
          />
          {errors.seats && (
            <span className="text-red-600">Available seat is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            name="price"
            placeholder="Price"
            defaultValue={""}
            className="input input-bordered"
          />
          {errors.price && (
            <span className="text-red-600">Price is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            {...register("classImage", { required: true })}
            name="classImage"
            placeholder="Photo URL"
            className="input input-bordered"
          />
          {errors.classImage && (
            <span className="text-red-600">Photo URL is required</span>
          )}
        </div>

        <div className="form-control mt-6">
          <input
            className="btn btn-primary border border-indigo-700  bg-indigo-500 text-white hover:text-white hover:bg-[#5B51DE]"
            type="submit"
            value="ADD CLASS"
          />
        </div>
      </form>
    </div>
  );
};

export default AddClass;
