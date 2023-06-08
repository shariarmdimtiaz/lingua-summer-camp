import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import img from "../../assets/login.png";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGoogleCircle,
  AiFillGithub,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TabTitle } from "../../utils/GeneralFunctions";

const Login = () => {
  const { user, signIn, signInWithGoogle, signInWithGithub } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  TabTitle("Toyland | Login");
  const api = {
    apiLink: import.meta.env.VITE_APILINK,
  };
  const jwtUrl = `${api.apiLink}/jwt`;

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    //const form = event.target;

    signIn(email, password)
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
            localStorage.setItem("toyland-access-token", data.token);
            navigate(from, { replace: true });
          });
      })
      .catch((error) => console.log(error));
  };
  const handleGoogleSignIn = () => {
    setError("");
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
            localStorage.setItem("toyland-access-token", data.token);
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        setError("Invalid email and password.");
        toast("Please, try again");
        //console.log(error);
      });
  };
  const handleGithubSignIn = () => {
    setError("");
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
            localStorage.setItem("toyland-access-token", data.token);
            navigate(from, { replace: true });
          });
        //console.log(loggedUser);
      })
      .catch((error) => {
        setError("Invalid email and password.");
        toast("Please, try again");
        //console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  return (
    <div className="container mx-auto">
      <form action="">
        <div className="hero-content flex-col lg:flex-row-reverse mt-8">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered w-[100%]"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="flex relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    className="input input-bordered w-[100%]"
                    required
                  />
                  <p
                    onClick={() => setShow(!show)}
                    className="text-left absolute top-3 right-2"
                  >
                    <small>
                      {show ? (
                        <span>
                          <AiOutlineEyeInvisible className="h-6 w-6 text-[#198AB7]" />
                        </span>
                      ) : (
                        <span>
                          <AiOutlineEye className="h-6 w-6 text-[#198AB7]" />
                        </span>
                      )}
                    </small>
                  </p>
                </div>
                {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
              </div>
              <div className="form-control mt-3">
                <p className="text-red-600 py-2">{error}</p>
              </div>
              <div className="form-control mt-3">
                <button
                  onClick={handleLogin}
                  className="btn btn-primary border-0 bg-[#F974B5] hover:bg-[#EC2F8B]"
                >
                  Login
                </button>
              </div>
              <div className="flex mx-auto mt-3">
                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-square mx-2 btn-outline bg-[#F974B5] hover:bg-[#EC2F8B]"
                >
                  <AiFillGoogleCircle />
                </button>
                <button
                  onClick={handleGithubSignIn}
                  className="btn btn-square mx-2  btn-outline bg-[#F974B5] hover:bg-[#EC2F8B]"
                >
                  <AiFillGithub />
                </button>
              </div>
              <p className="my-4 text-center">
                New to Toyland?
                <Link className="text-[#198AB7] font-bold mx-2" to="/signup">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
          <div className="text-center lg:text-left">
            <img className="w-2/3 mx-auto" src={img} alt="" />
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
