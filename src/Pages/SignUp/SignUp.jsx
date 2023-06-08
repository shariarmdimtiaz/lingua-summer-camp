import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import img from "../../assets/login.png";
import { TabTitle } from "../../utils/GeneralFunctions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const { user, createUser, profileUpdate } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [control, setControl] = useState(false);

  const api = {
    apiLink: import.meta.env.VITE_APILINK,
  };
  const jwtUrl = `${api.apiLink}/jwt`;
  const from = location.state?.from?.pathname || "/";
  TabTitle("Toyland | Sign up");

  const handleRegister = (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    const form = event.target;
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
        password
      )
    ) {
      //console.log("okay");
    } else {
      setError("The password you entered isn't correct!");
      return;
    }
    if (email) {
      createUser(email, password)
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
          //form.reset();
        })
        .catch((error) => {
          toast.error("Sorry, try again.");
          console.log(error);
          //console.log(">>>> ", error.message);
        });
      // setMessage("Successfully created your account!");
      toast("Successfully created your account!");
      if (photoUrl) {
        profileUpdate(user, name, photoUrl)
          .then((result) => {
            //const loggedUser = result.user;
            //console.log(loggedUser);
            form.reset();
          })
          .catch((error) => {
            toast.error("Sorry, try again.");
            //console.log(error)
            // console.log(">>>> ", error.message);
          });
      }
    } else {
      setError("The email and password you’ve entered is not correct.");
    }
    form.reset();
  };

  return (
    <div className="container mx-auto">
      <form action="">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h2 className="text-center font-bold text-2xl">
                Create an account
              </h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full name</span>
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  placeholder="Full name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email*</span>
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password*</span>
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL (Optional)</span>
                </label>
                <input
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  type="text"
                  name="photoUrl"
                  placeholder="Photo Url"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button
                  onClick={handleRegister}
                  className="btn btn-primary border-0 bg-[#F974B5] hover:bg-[#EC2F8B]"
                >
                  Register
                </button>

                <p className="text-green-600 py-2">{message}</p>
                <p className="text-red-600 py-2">{error}</p>
              </div>
              <p className="p-2 mx-auto">
                <small className="text-center font-normal text-base">
                  Already have an account?
                  <Link className="text-[#198AB7] font-bold mx-2" to="/login">
                    Login
                  </Link>
                </small>
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

export default SignUp;
