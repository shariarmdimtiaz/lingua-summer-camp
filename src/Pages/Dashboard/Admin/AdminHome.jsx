import { useContext } from "react";
import homeImage from "../../../assets/analytics.gif";
import { AuthContext } from "../../../Providers/AuthProviders";
const AdminHome = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="mx-auto py-10">
      <h1 className="text-center text-3xl">
        Welcome !!! <span className="font-bold">{user?.email}</span>
      </h1>
      <div className="flex justify-center items-center pt-5">
        <img src={homeImage} alt="" />
      </div>
    </div>
  );
};

export default AdminHome;
