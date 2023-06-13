import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import img from "../../assets/login.png";
import googleIcon from "../../assets/google.png";
import githubIcon from "../../assets/github.png";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGoogleCircle,
  AiFillGithub,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TabTitle } from "../../utils/GeneralFunctions";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const Login = () => {
  const { user, signIn, signInWithGoogle, signInWithGithub } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [show, setShow] = useState(false);
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  TabTitle(" | Login");
  const api = {
    apiLink: import.meta.env.VITE_APILINK,
  };
  const jwtUrl = `${api.apiLink}/jwt`;

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    //event.preventDefault();
    //const form = document.getElementById("login-form");
    //const form = event.target;

    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;

        const loggedUser = {
          email: user.email,
        };
        //console.log(user);
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
            navigate(from, { replace: true });
          });
        Swal.fire({
          title: "User login successful.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      })
      .catch((error) => console.log(error));
    reset();
  };

  const handleGoogleSignIn = () => {
    //setError("");
    signInWithGoogle()
      .then((result) => {
        const user = result.user;

        const loggedUser = {
          email: user.email,
        };
        //console.log(loggedUser);
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
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        //setError("Invalid email and password.");
        toast.error("Invalid email and password. Please, try again");
        //console.log(error);
      });
  };

  const handleGithubSignIn = () => {
    //setError("");
    signInWithGithub()
      .then((result) => {
        const user = result.user;
        const loggedUser = {
          email: user.email,
        };
        //console.log(loggedUser);
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
            navigate(from, { replace: true });
          });
        //console.log(loggedUser);
      })
      .catch((error) => {
        //setError("Invalid email and password.");
        toast.error("Invalid email and password. Please, try again");
        //console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Language Tutor | Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-white">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
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
                  <span className="label-text">Password</span>
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

              <div className="form-control mt-6">
                <input
                  className="btn btn-primary border border-indigo-700  bg-indigo-500 text-white hover:text-white hover:bg-[#5B51DE]"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <div className="flex mx-auto mt-3">
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-square mx-2 btn-outline bg-white hover:bg-[#5B51DE]"
              >
                <AiFillGoogleCircle />
              </button>
              <button
                onClick={handleGithubSignIn}
                className="btn btn-square mx-2  btn-outline bg-white hover:bg-[#5B51DE]"
              >
                <AiFillGithub />
              </button>
            </div>
            <p className="my-4 text-center">
              New to Language Tutor?
              <Link className="text-[#5B51DE] font-bold mx-2" to="/signup">
                Sign Up
              </Link>
            </p>
          </div>
          <div className="text-center lg:text-left">
            <div className="py-6">
              <img className="w-full" src={img} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>

    // <div className="container mx-auto">
    //   <form id="login-form">
    //     <div className="hero-content flex-col lg:flex-row-reverse mt-8">
    //       <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    //         <div className="card-body">
    //           <div className="form-control">
    //             <label className="label">
    //               <span className="label-text">Email</span>
    //             </label>
    //             <input
    //               onChange={(e) => setEmail(e.target.value)}
    //               type="email"
    //               name="email"
    //               placeholder="email"
    //               className="input input-bordered w-[100%]"
    //               required
    //             />
    //           </div>
    //           <div className="form-control">
    //             <label className="label">
    //               <span className="label-text">Password</span>
    //             </label>
    //             <div className="flex relative">
    //               <input
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 type={show ? "text" : "password"}
    //                 name="password"
    //                 placeholder="password"
    //                 className="input input-bordered w-[100%]"
    //                 required
    //               />
    //               <p
    //                 onClick={() => setShow(!show)}
    //                 className="text-left absolute top-3 right-2"
    //               >
    //                 <small>
    //                   {show ? (
    //                     <span>
    //                       <AiOutlineEyeInvisible className="h-6 w-6 text-[#5B51DE]" />
    //                     </span>
    //                   ) : (
    //                     <span>
    //                       <AiOutlineEye className="h-6 w-6 text-[#5B51DE]" />
    //                     </span>
    //                   )}
    //                 </small>
    //               </p>
    //             </div>
    //             {/* <label className="label">
    //               <a href="#" className="label-text-alt link link-hover">
    //                 Forgot password?
    //               </a>
    //             </label> */}
    //           </div>
    //           <div className="form-control mt-3">
    //             <p className="text-red-600 py-2">{error}</p>
    //           </div>
    //           <div className="form-control mt-3">
    //             <button
    //               onClick={handleLogin}
    //               className="btn btn-primary border border-indigo-700  bg-white text-black hover:text-white hover:bg-[#5B51DE]"
    //             >
    //               Login
    //             </button>
    //           </div>
    //           <div className="flex mx-auto mt-3">
    //             <button
    //               onClick={handleGoogleSignIn}
    //               className="btn btn-square mx-2 btn-outline bg-white hover:bg-[#5B51DE]"
    //             >
    //               <AiFillGoogleCircle />
    //             </button>
    //             <button
    //               onClick={handleGithubSignIn}
    //               className="btn btn-square mx-2  btn-outline bg-white hover:bg-[#5B51DE]"
    //             >
    //               <AiFillGithub />
    //             </button>
    //           </div>
    //           <p className="my-4 text-center">
    //             New to Toyland?
    //             <Link className="text-[#5B51DE] font-bold mx-2" to="/signup">
    //               Sign Up
    //             </Link>
    //           </p>
    //         </div>
    //       </div>
    //       <div className="text-center lg:text-left">
    //         <img className="w-2/3 mx-auto" src={img} alt="" />
    //       </div>
    //     </div>
    //   </form>
    //   <ToastContainer />
    // </div>
  );
};

export default Login;
