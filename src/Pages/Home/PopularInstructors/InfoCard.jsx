const InfoCard = ({ instructor }) => {
  return (
    <div className="mx-auto">
      <div className="card w-96 border border-indigo-600 shadow-xl">
        <figure>
          <img src={instructor.img} alt="Classes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{instructor.name}</h2>
          <p>Email: {instructor.email}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
