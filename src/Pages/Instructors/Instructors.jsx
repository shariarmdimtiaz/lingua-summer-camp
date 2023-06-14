import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InstructorCard from "./InstructorCard";
import useAllInstructor from "../../Hooks/useAllInstructor";

const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};
const Instructors = () => {
  const [AllInstructor, refetch, dataLoading] = useAllInstructor();
  // const [instructors, setInstructors] = useState([]);
  // const navigate = useNavigate();
  // const url = `${api.apiUrl}/instructors`;
  // useEffect(() => {
  //   fetch(url, {
  //     method: "GET",
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem(
  //         "language-access-token"
  //       )}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (!data.error) {
  //         setInstructors(data);
  //       } else {
  //         // logout and then navigate
  //         navigate("/");
  //       }
  //     });
  // }, [navigate]);
  return (
    <div>
      <div data-aos="fade-left" className="container mx-auto">
        <h2 className="font-bold text-5xl text-black text-center pt-[50px]">
          All Instructors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-[50px]">
          {AllInstructor.map((instructor) => (
            <InstructorCard
              key={instructor._id}
              instructor={instructor}
            ></InstructorCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructors;
