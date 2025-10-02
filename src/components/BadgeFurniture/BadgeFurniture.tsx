import badgeIcon from "../../assets/sofa.svg";

export default function Badge() {
  return (
    <div className="absolute top-0 left-12 -translate-x-1/3 -translate-y-1/3 bg-[#F3E4D1] border border-background px-1 py-3 rounded shadow-lg z-10">
      <img src={badgeIcon} alt="Badge" className="w-5 h-5" />
    </div>
  );
}
