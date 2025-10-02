import RenovationCard from "../PortalPage/RenovationCardPortal";

function Cards() {
  return (
    <div className="max-w-6xl p-8 mx-auto">
      <div className="flex flex-wrap justify-center gap-2 mb-20">
        {Array.from({ length: 12 }).map((_, index) => (
          <RenovationCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default Cards;
