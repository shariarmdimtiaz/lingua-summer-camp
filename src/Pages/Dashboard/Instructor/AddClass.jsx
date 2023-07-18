import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};
const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD;

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = (data) => {
    const instructorName = data.instructorName;
    const instructorEmail = data.email;
    const className = data.className;
    const totalSeats = parseInt(data.seats);
    const availableSeats = parseInt(data.seats);
    const price = parseFloat(data.price);
    let classImage = "";
    const status = "pending";
    const feedback = "";
    const formData = new FormData();
    formData.append("image", selectedFile);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          classImage = imgResponse.data.display_url;
          const classInfo = {
            instructorName,
            instructorEmail,
            className,
            totalSeats,
            availableSeats,
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
        }
      });
  };

  return (
    <div>
      <h1 className="text-center font-bold text-4xl my-4">Add Class</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="">Instructor Email</span>
          </label>
          <input
            type="text"
            {...register("email", { required: true })}
            name="email"
            placeholder="Instructor email"
            defaultValue={user?.email}
            readOnly
            className="input input-bordered text-black"
          />
          {errors.email && (
            <span className="text-red-600">Email is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="">Instructor Name</span>
          </label>
          <input
            type="text"
            {...register("instructorName", { required: true })}
            name="instructorName"
            placeholder="Instructor name"
            defaultValue={user?.displayName}
            className="input input-bordered text-black"
          />
          {errors.instructorName && (
            <span className="text-red-600">Instructor name is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="">Class Name</span>
          </label>
          <input
            type="text"
            {...register("className", { required: true })}
            name="className"
            placeholder="Class name"
            className="input input-bordered text-black"
          />
          {errors.className && (
            <span className="text-red-600">Class name is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="">Available Seats</span>
          </label>
          <input
            type="number"
            min="0"
            {...register("seats", { required: true })}
            name="seats"
            placeholder="Available seats"
            defaultValue={""}
            className="input input-bordered text-black"
          />
          {errors.seats && (
            <span className="text-red-600">Available seat is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="">Price</span>
          </label>
          <input
            type="number"
            min="0"
            {...register("price", { required: true })}
            name="price"
            placeholder="Price"
            defaultValue={""}
            className="input input-bordered text-black"
          />
          {errors.price && (
            <span className="text-red-600">Price is required</span>
          )}
        </div>
        <div className="form-control py-2">
          <label className="label">
            <span className="">Photo URL</span>
          </label>
          <input
            type="file"
            name="file"
            onChange={changeHandler}
            className="file-input file-input-bordered text-black w-full max-w-xs"
          />
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
