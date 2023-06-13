import { TabTitle } from "../../../utils/GeneralFunctions";
import Banner from "./Banner";
import Statistics from "./Statistics";

const Home = () => {
  TabTitle("Home");
  return (
    <div>
      <Banner></Banner>
      <Statistics></Statistics>
    </div>
  );
};

export default Home;
