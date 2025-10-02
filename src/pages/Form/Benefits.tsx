import heartHandshake from "../../assets/heart-handshake.svg";

function Benefits() {
  return (
    <div className="relative bg-[#E8E3DD] p-10 sm:p-14 rounded-lg shadow-md w-full max-w-lg text-backgroundComponents mt-10 sm:mt-2 mx-auto">
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <img src={heartHandshake} alt="Heart Handshake" className="w-16 h-16 sm:w-20 sm:h-20" />
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Korzyści z dołączenia do Renovace:
      </h2>
      <ul className="list-disc pl-5 space-y-6">
        <li>
          <p className="font-bold">Dotarcie do szerokiego grona użytkowników</p>
          <p className="font-light">
            Twoje usługi lub produkty będą dostępne dla tysięcy osób, które
            szukają inspiracji i produktów do swojego wnętrza.
          </p>
        </li>
        <li>
          <p className="font-bold">
            Możliwość zaprezentowania swoich projektów/sklepu
          </p>
          <p className="font-light">
            Podziel się swoją pracą i ofertą z użytkownikami, którzy aktywnie
            poszukują pomocy przy aranżacji.
          </p>
        </li>
        <li>
          <p className="font-bold">
            Zwiększenie rozpoznawalności i zdobycie nowych klientów
          </p>
          <p className="font-light">
            Buduj swoją markę i zyskaj większą widoczność w branży
            wnętrzarskiej.
          </p>
        </li>
        <li>
          <p className="font-bold">Współpraca z dynamiczną platformą</p>
          <p className="font-light">
            Renovace to innowacyjne narzędzie, które pozwala na interakcję z
            użytkownikami i dostosowanie oferty do ich potrzeb.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Benefits;