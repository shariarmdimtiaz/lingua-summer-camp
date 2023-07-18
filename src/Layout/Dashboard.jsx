import { NavLink, Outlet } from "react-router-dom";
import {
  FaWallet,
  FaFileMedical,
  FaUserAlt,
  FaHome,
  FaBook,
  FaBookReader,
  FaUsers,
} from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import useUserRole from "../Hooks/useUserRole";
import { useContext } from "react";
import { ThemeContext } from "../Providers/ThemeProvider";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const { containerStyles } = useContext(ThemeContext);
  const [UserRole] = useUserRole();

  return (
    <div style={containerStyles}>
      <Helmet>
        <title>Lingua | Dashboard</title>
      </Helmet>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content border border-indigo-600 rounded-l-xl">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
          <div className="">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side border border-indigo-600 rounded-r-xl">
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
                    <FaFileMedical></FaFileMedical> Add Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/instructors/myclasses">
                    <FaUserAlt></FaUserAlt> My Classes
                  </NavLink>
                </li>
              </>
            ) : (
              <></>
            )}
            {UserRole?.role === "student" ? (
              <>
                {/* <li>
                  <NavLink to="/dashboard/students">
                    <FaHome></FaHome> User Home
                  </NavLink>
                </li> */}
                <li>
                  <NavLink to="/dashboard/students/mySelectedClass">
                    <FaBookReader></FaBookReader> My Selected Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/students/myEnrolledClass">
                    <GiBookCover></GiBookCover> My Enrolled Class
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
    </div>
  );
};

export default Dashboard;
