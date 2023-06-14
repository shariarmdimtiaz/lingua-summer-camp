import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ErrorPage from "../Pages/Shared/ErrorPage";
import PrivateRoute from "../Routes/PrivateRoute";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import InstructorHome from "../Pages/Dashboard/Instructor/InstructorHome";
import StudentHome from "../Pages/Dashboard/Student/StudentHome";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import Dashboard from "../Layout/Dashboard";
import AddClass from "../Pages/Dashboard/Instructor/AddClass";
import Classes from "../Pages/Classes/Classes";
import Instructors from "../Pages/Instructors/Instructors";
import MyClasses from "../Pages/Dashboard/Instructor/MyClasses";
import MySelectedClasses from "../Pages/Dashboard/Student/MySelectedClasses";
import MyEnrolledClasses from "../Pages/Dashboard/Student/MyEnrolledClasses";
import Payment from "../Pages/Dashboard/Student/Payment";
import ManageClasses from "../Pages/Dashboard/Admin/ManageClasses";
import Feedback from "../Pages/Dashboard/Admin/Feedback";
import PaymentHistory from "../Pages/Dashboard/Student/PaymentHistory";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "classes",
        element: <Classes></Classes>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "dashboard",
        element: (
          <Dashboard></Dashboard>
          // <PrivateRoute>
          //   <Dashboard></Dashboard>
          // </PrivateRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <AdminHome></AdminHome>,
          },
          {
            path: "adminhome",
            element: <AdminHome></AdminHome>,
          },
          {
            path: "manageclasses",
            element: <ManageClasses></ManageClasses>,
          },
          {
            path: "feedback/:id",
            element: <Feedback></Feedback>,
            loader: ({ params }) => fetch(`${api.apiUrl}/class/${params.id}`),
          },
          {
            path: "manageusers",
            element: <ManageUsers></ManageUsers>,
          },
          {
            path: "instructors",
            //element: <InstructorHome></InstructorHome>,
            children: [
              {
                path: "addclass",
                element: <AddClass></AddClass>,
              },
              {
                path: "myclasses",
                element: <MyClasses></MyClasses>,
              },
            ],
          },
          {
            path: "students",
            //element: <StudentHome></StudentHome>,
            children: [
              {
                path: "mySelectedClass",
                element: <MySelectedClasses></MySelectedClasses>,
              },
              {
                path: "myEnrolledClass",
                element: <MyEnrolledClasses></MyEnrolledClasses>,
              },
              {
                path: "payment",
                element: <Payment></Payment>,
              },
              {
                path: "paymenthistory",
                element: <PaymentHistory></PaymentHistory>,
              },
            ],
          },
        ],
      },
      // {
      //   path: "alltoys",
      //   element: <AllToys></AllToys>,
      // },
      // {
      //   path: "mytoys",
      //   element: (
      //     <PrivateRoute>
      //       <MyToys></MyToys>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "blog",
      //   element: <Blog></Blog>,
      // },
      // {
      //   path: "toys/:id",
      //   element: (
      //     <PrivateRoute>
      //       <Details></Details>
      //     </PrivateRoute>
      //   ),
      //   loader: ({ params }) => fetch(`${api.apiLink}/toys/${params.id}`),
      // },
      // {
      //   path: "editToys/:id",
      //   element: (
      //     <PrivateRoute>
      //       <EditToy></EditToy>
      //     </PrivateRoute>
      //   ),
      //   loader: ({ params }) => fetch(`${api.apiLink}/toys/${params.id}`),
      // },
    ],
  },
]);

export default router;
