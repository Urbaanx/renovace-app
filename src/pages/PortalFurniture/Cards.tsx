import FurnitureCard from "../PortalPage/FurnitureCardPortal";

function Cards() {
  return (
    <div className="max-w-6xl p-8 mx-auto">
      <div className="flex flex-wrap justify-center gap-2 mb-20">
        {Array.from({ length: 12 }).map((_, index) => (
          <FurnitureCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default Cards;
