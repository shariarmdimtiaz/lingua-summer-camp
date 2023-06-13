import { useContext } from "react";
import homeImage from "../../../assets/analytics.gif";
import { AuthContext } from "../../../Providers/AuthProviders";
const AdminHome = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-white mx-auto">
      <h1 className="text-center text-3xl">
        Welcome !!! Mr. <span className="font-bold">{user?.displayName}</span>
      </h1>
      <div className="flex justify-center items-center pt-5">
        <img src={homeImage} alt="" />
      </div>
    </div>
  );
};

export default AdminHome;
