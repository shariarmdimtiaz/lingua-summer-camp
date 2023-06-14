import { AiFillSafetyCertificate } from "react-icons/ai";
import { BsPersonHeart } from "react-icons/bs";
import { FaFileVideo } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";

const Statistics = () => {
  return (
    <div className="container mx-auto py-28">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="text-center border border-indigo-600 bg-slate-200 rounded-lg p-7">
          <div className="flex justify-center items-center">
            <AiFillSafetyCertificate></AiFillSafetyCertificate>
          </div>
          <h1 className="text-3xl font-bold">97.95%</h1>
          <p className="font-bold pt-2">Completing rate</p>
          <p className="text-gray-500">of all our courses</p>
        </div>
        <div className="text-center border border-indigo-600 bg-slate-200 rounded-lg p-7">
          <div className="flex justify-center items-center">
            <BsPersonHeart></BsPersonHeart>
          </div>
          <h1 className="text-3xl font-bold">47.5k</h1>
          <p className="font-bold pt-2">Happy students</p>
          <p className="text-gray-500">on the platform</p>
        </div>
        <div className="text-center border border-indigo-600 bg-slate-200 rounded-lg p-7">
          <div className="flex justify-center items-center">
            <FaFileVideo></FaFileVideo>
          </div>
          <h1 className="text-3xl font-bold">2,500+</h1>
          <p className="font-bold pt-2">Video lessons</p>
          <p className="text-gray-500">in our courses</p>
        </div>
        <div className="text-center border border-indigo-600 bg-slate-200 rounded-lg p-7">
          <div className="flex justify-center items-center">
            <GrCertificate></GrCertificate>
          </div>
          <h1 className="text-3xl font-bold">45</h1>
          <p className="font-bold pt-2">Certified professionals</p>
          <p className="text-gray-500">in our team</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
