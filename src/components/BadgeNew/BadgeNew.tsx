import { FaStar } from "react-icons/fa";

export default function Badge() {
    return (
      <div>
        <FaStar 
          size={52} 
          fill="#FFE1B9" 
          className="absolute top-[1px] left-[1px] z-10 transform -translate-x-1/3 -translate-y-[40%] drop-shadow-lg transition-transform duration-300"
          style={{
            stroke: "#000000", 
            strokeWidth: "10"  
          }}
        />
        <span className="absolute top-[1px] left-[-3px] text-[9px] z-10 font-bold text-black">
          Nowe
        </span>
      </div>
    );
}
