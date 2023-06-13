import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import Swal from "sweetalert2";
const api = {
  apiUrl: import.meta.env.VITE_APILINK,
};

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const url = `${api.apiUrl}/classes`;
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem(
          "language-access-token"
        )}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setClasses(data);
        } else {
          // logout and then navigate
        }
      });
  }, [navigate]);

  return (
    <div>
      <div data-aos="fade-left" className="container mx-auto">
        <h2 className="font-bold text-5xl text-black text-center pt-[50px]">
          All Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-[50px]">
          {classes.map((classInfo) => (
            <Card key={classInfo._id} classInfo={classInfo}></Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
