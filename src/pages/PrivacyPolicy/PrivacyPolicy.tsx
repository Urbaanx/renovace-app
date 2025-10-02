import Footer from "../../components/Footer/Footer";
import NavBar from "../PortalPage/NavbarPortal";
import { motion } from "framer-motion";
import { useEffect } from "react";

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-mainColorText min-h-screen">
      <NavBar />
      <div className="max-w-6xl justify-center mx-auto px-4 sm:px-6 md:px-8 flex flex-col text-background">
        <h1 className="pt-24 font-bold text-2xl">
          Polityka Prywatności Aplikacji Renovace
        </h1>
        <p className="mt-4 pb-2">Ostatnia aktualizacja: 04.04.2025</p>

        <h2 className="mt-6 font-semibold text-lg">1. Wprowadzenie</h2>
        <motion.hr
          className="my-4 w-full border-t-2 border-brown"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
        />
        <p className="mt-2">
          Niniejsza Polityka Prywatności określa sposoby gromadzenia,
          wykorzystywania i ochrony danych użytkowników aplikacji Renovace.
          <br />
          Korzystając z Aplikacji, akceptujesz postanowienia niniejszej Polityki
          Prywatności.
        </p>

        <h2 className="mt-6 font-semibold text-lg">2. Jakie dane zbieramy?</h2>
        <motion.hr
          className="my-4 w-full border-t-2 border-brown"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
        />
        <p className="mt-2">
          Podczas korzystania z Aplikacji możemy zbierać następujące dane
          osobowe i techniczne:
        </p>
        <ul className="mt-2 list-inside list-disc">
          <li>
            <span className="font-semibold">Dane identyfikacyjne:</span> imię,
            nazwisko, adres e-mail
          </li>
          <li>
            <span className="font-semibold">Dane dotyczące urządzenia:</span>{" "}
            model urządzenia, system operacyjny, wersja aplikacji
          </li>
          <li>
            <span className="font-semibold">
              Dane dotyczące korzystania z Aplikacji:
            </span>{" "}
            wygenerowane pokoje, meble, zapisane renowacje
          </li>
        </ul>

        <h2 className="mt-6 font-semibold text-lg">
          3. Jak wykorzystujemy Twoje dane?
        </h2>
        <motion.hr
          className="my-4 w-full border-t-2 border-brown"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
        />
        <p className="mt-2">
          Zebrane dane są wykorzystywane w następujących celach:
        </p>
        <ul className="mt-2 list-inside list-disc">
          <li>
            Personalizacja doświadczenia użytkownika i poprawa funkcjonalności
            Aplikacji
          </li>
          <li>Przechowywanie zapisanych projektów i ich udostępnianie</li>
          <li>
            Wysyłanie powiadomień i komunikacji związanej z korzystaniem z
            Aplikacji
          </li>
          <li>Analiza i ulepszanie działania Aplikacji</li>
          <li>Zapewnienie zgodności z obowiązującym prawem</li>
        </ul>

        <h2 className="mt-6 font-semibold text-lg">
          4. Komu udostępniamy dane?
        </h2>
        <motion.hr
          className="my-4 w-full border-t-2 border-brown"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
        />
        <p className="mt-2">
          Twoje dane osobowe nie będą sprzedawane ani wynajmowane osobom
          trzecim. Możemy jednak udostępnić dane w następujących przypadkach:
        </p>
        <ul className="mt-2 list-inside list-disc">
          <li>
            Usługodawcom wspierającym działanie Aplikacji (np. hosting, analiza
            danych)
          </li>
          <li>W ramach połączenia lub przejęcia Aplikacji przez inną firmę</li>
        </ul>

        <h2 className="mt-6 font-semibold text-lg">
          5. Jak chronimy Twoje dane?
        </h2>
        <motion.hr
          className="my-4 w-full border-t-2 border-brown"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
        />
        <p className="mt-2">
          Dbamy o odpowiednie zabezpieczenie Twoich danych, stosując techniczne
          i organizacyjne środki ochrony, takie jak:
        </p>
        <ul className="mt-2 list-inside list-disc">
          <li>Szyfrowanie danych</li>
          <li>Ograniczony dostęp do danych</li>
          <li>Regularne audyty bezpieczeństwa</li>
        </ul>

        <h2 className="mt-6 font-semibold text-lg">6. Jakie masz prawa?</h2>
        <motion.hr
          className="my-4 w-full border-t-2 border-brown"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
        />
        <p className="mt-2">Masz prawo do:</p>
        <ul className="mt-2 list-inside list-disc">
          <li>Dostępu do swoich danych</li>
          <li>Sprostowania błędnych informacji</li>
          <li>Usunięcia swoich danych</li>
          <li>Ograniczenia przetwarzania</li>
          <li>Przenoszenia danych</li>
          <li>Sprzeciwu wobec przetwarzania danych</li>
        </ul>
        <p className="mt-2">
          Aby skorzystać ze swoich praw, skontaktuj się z nami pod adresem:{" "}
          <a href="mailto:renovaceapp@gmail.com" className="text-blue-500">
            renovaceapp@gmail.com
          </a>
        </p>

        <h2 className="mt-6 font-semibold text-lg">
          7. Zmiany w Polityce Prywatności
        </h2>
        <motion.hr
          className="my-4 w-full border-t-2 border-brown"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
        />
        <p className="mt-2">
          Zastrzegamy sobie prawo do aktualizacji niniejszej Polityki
          Prywatności. Wszelkie zmiany będą publikowane w Aplikacji, a
          użytkownicy zostaną o nich poinformowani.
        </p>

        <h2 className="mt-6 font-semibold text-lg">8. Kontakt</h2>
        <motion.hr
          className="my-4 w-full border-t-2 border-brown"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
        />
        <p className="mt-2 pb-20">
          W razie pytań dotyczących niniejszej Polityki Prywatności prosimy o
          kontakt pod adresem:{" "}
          <a href="mailto:renovaceapp@gmail.com" className="text-blue-500">
            renovaceapp@gmail.com
          </a>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
