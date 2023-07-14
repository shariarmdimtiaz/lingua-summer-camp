import { useContext } from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BsPersonHeart } from "react-icons/bs";
import { FaFileVideo } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { ThemeContext } from "../../../Providers/ThemeProvider";

const Statistics = () => {
  const { containerStyles } = useContext(ThemeContext);
  return (
    <div style={containerStyles}>
      <div className="container mx-auto py-28">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-7">
            <div className="flex justify-center items-center">
              <AiFillSafetyCertificate></AiFillSafetyCertificate>
            </div>
            <h1 className="text-5xl font-bold">97.95%</h1>
            <p className="font-bold pt-2">Completing rate</p>
            <p className="">of all our courses</p>
          </div>
          <div className="text-center p-7">
            <div className="flex justify-center items-center">
              <BsPersonHeart></BsPersonHeart>
            </div>
            <h1 className="text-5xl font-bold">47.5k</h1>
            <p className="font-bold pt-2">Happy students</p>
            <p className="">on the platform</p>
          </div>
          <div className="text-center p-7">
            <div className="flex justify-center items-center">
              <ion-icon name="videocam-outline"></ion-icon>
              {/* <FaFileVideo></FaFileVideo> */}
            </div>
            <h1 className="text-5xl font-bold">2,500+</h1>
            <p className="font-bold pt-2">Video lessons</p>
            <p className="">in our courses</p>
          </div>
          <div className="text-center p-7">
            <div className="flex justify-center items-center">
              {/* <GrCertificate></GrCertificate> */}
              <ion-icon name="medal-outline"></ion-icon>
            </div>
            <h1 className="text-5xl font-bold">45</h1>
            <p className="font-bold pt-2">Certified professionals</p>
            <p className="">in our team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
