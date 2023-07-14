import { useContext } from "react";
import useClasses from "../../../Hooks/useClasses";
import PopularCard from "./PopularCard";
import { ThemeContext } from "../../../Providers/ThemeProvider";
import { Helmet } from "react-helmet";
const PopularClasses = () => {
  const { containerStyles } = useContext(ThemeContext);
  const [ClassInfo, refetch, dataLoading] = useClasses();
  return (
    <div style={containerStyles}>
      <div data-aos="fade-left" className="container mx-auto">
        <h2 className="font-bold text-5xl text-black text-center pt-[50px]">
          Popular Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-[50px]">
          {ClassInfo.map((classInfo, index) => {
            if (index < 6) {
              return (
                <PopularCard
                  key={classInfo._id}
                  classInfo={classInfo}
                ></PopularCard>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularClasses;
