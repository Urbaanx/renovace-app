import { Link, useLocation } from "react-router-dom";

interface IconButtonProps {
  isLabel: boolean;
  label: string;
  src: string;
  path: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function IconButton({
  isLabel,
  label,
  src,
  path,
  className = "",
  width,
  height,
}: IconButtonProps) {
  const location = useLocation();
  const isActive = location.pathname.includes(path);

  return (
    <>
      <div key={label} className="relative group">
        <Link to={`/${path}`} className="relative inline-block">
          <img
            src={src}
            className={`w-9 group-hover:brightness-150 ${
              isActive ? "brightness-150" : ""
            } ${className}`}
            style={{ width: width, height: height }}
          />
          {isLabel && (
            <span className="absolute left-full ml-1 top-1/2 -translate-y-1/2 text-sm text-backgroundComponents bg-brownlight rounded-md px-2 py-1 opacity-0 pointer-events-none group-hover:opacity-90 transition-opacity duration-200">
              {label}
            </span>
          )}
        </Link>
      </div>
    </>
  );
}
