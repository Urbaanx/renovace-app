import { Link } from "react-router-dom";

export default function ListFooter() {
  return (
    <ul className="flex flex-col sm:flex-row justify-center text-mainColorText space-y-4 sm:space-y-0 sm:space-x-8 text-center">
      <li className="text">© 2024 Renovace. Wszelkie prawa zastrzeżone</li>
      <li className="hover:text-brown transition duration-200 cursor-pointer">
        <Link to="/what-is-gs">Czym jest GS?</Link>
      </li>
      <li className="hover:text-brown transition duration-200 cursor-pointer">
        <Link to="/tutorial">Jak nagrać dobry filmik?</Link>
      </li>
      <li className="hover:text-brown transition duration-200 cursor-pointer">
        <Link to="/privacy-policy">Polityka prywatności</Link>
      </li>
       <li className="hover:text-brown transition duration-200 cursor-pointer">
        <a href="https://hackmd.io/@renovaceapp/ryMzSbe21x" target="_blank" rel="noopener noreferrer">
          Docs
        </a>
      </li>
    </ul>
  );
}
