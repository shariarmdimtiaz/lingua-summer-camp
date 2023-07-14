import { Helmet } from "react-helmet";
import { TabTitle } from "../../../utils/GeneralFunctions";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import Banner from "./Banner";
import Statistics from "./Statistics";

const Home = () => {
  // TabTitle("Lingua | Home");
  return (
    <div>
      <Helmet>
        <title>Lingua | Home</title>
      </Helmet>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <PopularInstructors></PopularInstructors>
      <Statistics></Statistics>
    </div>
  );
};

export default Home;
