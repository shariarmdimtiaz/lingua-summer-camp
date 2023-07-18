import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};
const Feedback = () => {
  const classInfo = useLoaderData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const feedback = data.feedback;
    const updateInfo = {
      feedback,
    };
    fetch(`${api.apiUrl}/class-feedback/${classInfo._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Status has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="px-12 py-3">
      <div className="flex justify-center items-center">
        <img src={classInfo.classImage} className="object-fill h-80" alt="" />
      </div>
      <div className="text-center">
        <h1 className="font-bold py-2">Class name: {classInfo.className}</h1>
        <h1 className="font-bold">Price: {classInfo.price}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Feedback</span>
          </label>
          <textarea
            type="text"
            {...register("feedback", { required: true })}
            name="feedback"
            placeholder="Feedback"
            className="input input-bordered"
          />
          {errors.feedback && (
            <span className="text-red-600">Feedback name is required</span>
          )}
        </div>

        <div className="form-control mt-6">
          <input
            className="btn btn-primary border border-indigo-700  bg-indigo-500 text-white hover:text-white hover:bg-[#5B51DE]"
            type="submit"
            value="Send"
          />
        </div>
      </form>
    </div>
  );
};

export default Feedback;
