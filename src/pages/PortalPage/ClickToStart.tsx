import logo from "../../assets/logo.svg";
import ClickToStartButton from "../LandingPage/ClickToStartButton";

function ClickToStart() {
  return (
    <div className="text-background max-w-6xl mx-auto px-4 pb-10 sm:px-6 md:px-8 flex flex-col items-center text-center md:text-left">
      <div className="w-full flex flex-col md:flex-row items-center justify-between relative">
        <div className="max-w-6xl">
          <p className="text-sm font-semibold mt-8">
            Marzysz o nowej aranżacji swojego pokoju?
          </p>
          <p className="text-xl font-bold mt-4">
            Odwiedź naszą aplikację i sprawdź, jak łatwo znaleźć idealne
            wnętrze!
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center mt-12">
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} className="w-40 mb-4 md:ml-28 ml-0" alt="Logo" />
          <ClickToStartButton />
        </div>

        <div className="mt-12 md:mt-12 mb-10 text-center md:text-left md:pl-32">
          <p className="text-lg font-semibold ">
            Z nami zrealizujesz swoje marzenia o idealnym wnętrzu!
          </p>
          <p className="mt-8 text-base">
            Przekonaj się, jak łatwo możesz zaplanować zmiany w swoim mieszkaniu
          </p>
          <p className="mt-8 text-base font-bold">
            Załóż konto teraz i korzystaj z naszej aplikacji!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClickToStart;
