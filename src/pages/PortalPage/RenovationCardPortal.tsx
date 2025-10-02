import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface RenovationCardPortalProps {
  name?: string;
  thumbnail?: string;
  author?: string;
  id?: string;
  ownerId?: string;
}

function RenovationCardPortal({
  name,
  thumbnail,
  author,
  id,
  ownerId,
}: RenovationCardPortalProps) {
  return (
    <div className="w-64 bg-backgroundComponents shadow-md rounded-md p-4 relative hover:scale-105 hover:shadow-xl transition-transform duration-300">
      <Link to={`/portal/renovations/${id}`}>
        <div className="w-full h-32 rounded-md overflow-hidden border border-background relative cursor-pointer">
          <img
            src={thumbnail}
            alt="Furniture"
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="mt-2 text-left">
        <Link to={`/portal/renovations/${id}`}>
          <p className="text-sm text-mainColorText font-medium cursor-pointer hover:underline">
            {name}
          </p>
        </Link>
        <Link to={`/portal/decorator/${author}?id=${ownerId}`}>
          <p className="mt-1 text-xs text-mainColorText font-semibold opacity-60 hover:underline cursor-pointer">
            Autor: {author}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default RenovationCardPortal;
