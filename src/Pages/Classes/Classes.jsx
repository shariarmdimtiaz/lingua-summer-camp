import { useContext } from "react";
import useClasses from "../../Hooks/useClasses";
import Card from "./Card";
import { ThemeContext } from "../../Providers/ThemeProvider";
import { Helmet } from "react-helmet";

const Classes = () => {
  const [ClassInfo, refetch, dataLoading] = useClasses();
  const { containerStyles } = useContext(ThemeContext);

  return (
    <div style={containerStyles}>
      <Helmet>
        <title>Lingua | Classes</title>
      </Helmet>
      <div data-aos="fade-left" className="container mx-auto">
        <h2 className="font-bold text-5xl text-center pt-[50px]">
          All Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-[50px]">
          {ClassInfo.map((classInfo) => (
            <Card key={classInfo._id} classInfo={classInfo}></Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
