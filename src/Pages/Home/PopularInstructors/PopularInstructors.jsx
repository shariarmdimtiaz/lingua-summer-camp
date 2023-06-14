import useAllInstructor from "../../../Hooks/useAllInstructor";
import InfoCard from "./InfoCard";

const PopularInstructors = () => {
  const [AllInstructor, refetch, dataLoading] = useAllInstructor();
  return (
    <div>
      <div data-aos="fade-left" className="container mx-auto">
        <h2 className="font-bold text-5xl text-black text-center pt-[50px]">
          Popular Instructors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-[50px]">
          {AllInstructor.map((instructor) => (
            <InfoCard key={instructor._id} instructor={instructor}></InfoCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularInstructors;
