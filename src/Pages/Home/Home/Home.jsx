import { TabTitle } from "../../../utils/GeneralFunctions";
import PopularClasses from "../PopularClasses/PopularClasses";
import Banner from "./Banner";
import Statistics from "./Statistics";

const Home = () => {
  TabTitle("Home");
  return (
    <div>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <Statistics></Statistics>
    </div>
  );
};

export default Home;
