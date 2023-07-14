import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import img from "../../assets/login.png";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ThemeContext } from "../../Providers/ThemeProvider";

const SignUp = () => {
  const { containerStyles } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { createUser, profileUpdate } = useContext(AuthContext);
  const navigate = useNavigate();

  const api = {
    apiUrl: import.meta.env.VITE_APILINK,
  };
  const jwtUrl = `${api.apiUrl}/jwt`;
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      // console.log(data);
      // create an account
      createUser(data.email, data.password)
        .then((result) => {
          const user = result.user;
          const loggedUser = {
            email: user.email,
          };
          fetch(jwtUrl, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(loggedUser),
          })
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem("language-access-token", data.token);
            });
        })
        .catch((error) => {
          //toast.error("Sorry, try again.");
          //console.log(error);
          // console.log(">>>> ", error.message);
        });

      if (data.name || data.photoURL) {
        profileUpdate({
          displayName: data.name,
          photoURL: data.photoURL,
        }).then((result) => {
          //const userInfo = result.user;
          // console.log("userInfo >>", result);
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={containerStyles}>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="Password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="">Confirm Password</span>
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === watch("password") || "Passwords does not match",
                  })}
                  placeholder="Confirm password"
                  className="input input-bordered"
                />
                {errors.confirmPassword && (
                  <span>{errors.confirmPassword.message}</span>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-primary border border-indigo-700  bg-indigo-500 text-white hover:text-white hover:bg-[#5B51DE]"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <p className="pb-3 mx-auto">
              <small className="text-center font-normal text-base">
                Already have an account?
                <Link className="text-[#5B51DE] font-bold mx-2" to="/login">
                  Login
                </Link>
              </small>
            </p>
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
            <div className="py-6">
              <img className="w-full" src={img} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
