import { ClipLoader } from "react-spinners";
import furnitureImage from "../../../../assets/krzeslo.png";
import trashIcon from "../../../../assets/trash.svg";
import heartIcon from "../../../../assets/heart.svg";
import shareIcon from "../../../../assets/share.svg";
import Badge from "../../../../components/BadgeFurniture/BadgeFurniture";

export default function FurnitureCard() {
  return (
    <div className="w-90 bg-mainColorText shadow-md rounded-xl p-4 relative hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer">
      <Badge />

      <div className="w-full h-40 rounded-lg overflow-hidden border border-brown relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-60 backdrop-blur-md">
          <ClipLoader size={35} />
          <p className="mt-2 text-sm font-semibold">Generujemy mebel...</p>
        </div>
        <img
          src={furnitureImage}
          alt="Mebel"
          className="w-full h-full object-cover blur-md opacity-50"
        />
      </div>
      <div className="mt-4 text-left flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-background">Fotel obrotowy</h3>
          <p className="text-xs text-background font-semibold opacity-60">
            Data wygenerowania: 11-02-2025
          </p>
        </div>
        <div className="flex space-x-4">
          <img
            src={trashIcon}
            alt="Trash"
            className="w-6 h-6 cursor-pointer hover:brightness-0"
          />
          <img
            src={heartIcon}
            alt="Heart"
            className="w-6 h-6 cursor-pointer hover:brightness-0"
          />
          <img
            src={shareIcon}
            alt="Share"
            className="w-6 h-6 cursor-pointer hover:brightness-0"
          />
        </div>
      </div>
    </div>
  );
}
