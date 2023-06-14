import { NavLink, Outlet } from "react-router-dom";
import {
  FaWallet,
  FaCalendarAlt,
  FaHome,
  FaUtensils,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import useUserRole from "../Hooks/useUserRole";

const Dashboard = () => {
  // const [cart] = useCart();
  const [UserRole] = useUserRole();

  return (
    <div className="drawer drawer-mobile ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side bg-[#c1c0c0] border border-indigo-600 rounded-xl">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80">
          {UserRole?.role === "admin" ? (
            <>
              <li>
                <NavLink to="/dashboard/adminhome">
                  <FaHome></FaHome> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageclasses">
                  <FaBook></FaBook> Manage Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageusers">
                  <FaUsers></FaUsers> Manage Users
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
          {UserRole?.role === "instructor" ? (
            <>
              <li>
                <NavLink to="/dashboard/instructors/addclass">
                  <FaWallet></FaWallet> Add Class
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/instructors/myclasses">
                  <FaWallet></FaWallet> My Classes
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
          {UserRole?.role === "student" ? (
            <>
              <li>
                <NavLink to="/dashboard/userhome">
                  <FaHome></FaHome> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/students/mySelectedClass">
                  <FaWallet></FaWallet> My Selected Class
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/students/myEnrolledClass">
                  <FaWallet></FaWallet> My Enrolled Class
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/students/paymenthistory">
                  <FaWallet></FaWallet> Payment History
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
