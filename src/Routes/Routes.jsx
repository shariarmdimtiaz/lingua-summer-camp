import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../Layout/Dashboard";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ErrorPage from "../Pages/Shared/ErrorPage";
import PrivateRoute from "../Routes/PrivateRoute";

// const api = {
//   apiLink: import.meta.env.VITE_APILINK,
// };

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
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
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
