import { Link, useRouteError } from "react-router-dom";
import img from "../../assets/animation-404.gif";

const ErrorPage = () => {
  const { error, status } = useRouteError();
  return (
    <div className="bg-white">
      <section className="flex items-center h-screen p-16  text-gray-900">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <img src={img} alt="" />
            <h2 className="mb-8 font-extrabold text-5xl text-gray-600">
              <span className="sr-only">Error</span> {status || 404}
            </h2>
            <p className="text-2xl font-semibold md:text-3xl mb-8">
              {error?.message}
            </p>
            <Link
              to="/"
              className="px-8 py-3 font-semibold rounded bg-[#3197C0] text-white"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
