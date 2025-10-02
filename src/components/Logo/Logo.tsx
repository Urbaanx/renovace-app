import logo from "../../assets/logo.svg";

interface LogoProps {
  width: string;
  height: string;
}

export default function Logo({ width, height }: LogoProps) {
  return (
    <div>
      <img
        src={logo}
        alt="Logo"
        style={{ width: `${width}`, height: `${height}` }}
      />
    </div>
  );
}
