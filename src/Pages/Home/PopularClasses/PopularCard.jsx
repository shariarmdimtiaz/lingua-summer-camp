const PopularCard = ({ classInfo }) => {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={classInfo.classImage} alt="Image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Class Name: {classInfo.className}</h2>
          <div className="flex justify-between">
            <p>
              Available Seats:{" "}
              <span className="font-bold">{classInfo.availableSeats}</span>
            </p>
            <p>
              Price: <span className="font-bold">${classInfo.price}</span>
            </p>
          </div>
          <p>
            Enrolled Students:{" "}
            <span className="font-bold">
              {classInfo.totalSeats - classInfo.availableSeats}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularCard;
