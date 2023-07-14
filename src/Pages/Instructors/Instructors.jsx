import InstructorCard from "./InstructorCard";
import useAllInstructor from "../../Hooks/useAllInstructor";
import { useContext } from "react";
import { ThemeContext } from "../../Providers/ThemeProvider";
import { Helmet } from "react-helmet";

const Instructors = () => {
  const [AllInstructor, refetch, dataLoading] = useAllInstructor();
  const { containerStyles } = useContext(ThemeContext);
  return (
    <div style={containerStyles}>
      <Helmet>
        <title>Lingua | Instructors</title>
      </Helmet>
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
