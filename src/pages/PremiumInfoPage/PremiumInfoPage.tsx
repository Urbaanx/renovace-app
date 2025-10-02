import { useAuth0 } from "@auth0/auth0-react";
import check from "../../assets/check.svg";
import logo from "../../assets/logo.svg";
import bgVideo from "../../assets/tlo3.mp4";

function PremiumInfoPage() {
  const { user } = useAuth0();

  return (
    <>
      <div className="relative flex flex-col items-center justify-center h-dvh max-h-dvh overflow-auto w-dvw bg-backgroundComponents text-backgroundComponents text-xl">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover filter blur-xl opacity-60 sm"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        <div className="relative bg-mainColorText sm:w-dvw lg:w-4/5 sm:h-dvh lg:h-4/5 p-10 overflow-auto grid grid-col-3 lg:rounded-xl justify-start lg:mx-auto items-center xl:grid-col-4 2xl:justify-between">
          <div className="sm:col-span-4 lg:col-span-2 xl:col-span-3 w-fit lg:h-fit sm:h-fit lg:col-start-1 lg:col-end-2 xl:col-end-3">
            <h1 className="text-5xl font-bold">Renovace+</h1>
            <h2 className="font-semibold">
              Twój klucz do nieograniczonych możliwości projektowania!
            </h2>
            <br />
            <br />

            <h1 className="text-5xl font-bold">
              Co zyskujesz dzięki wersji Premium?
            </h1>
            <br />
            <div>
              <img src={check} className="float-left mr-4" />
              <p className="font-semibold">NIEOGRANICZONA LICZBA POKOJÓW</p>
              <p className="ml-10">
                skanuj dowolnie wiele pomieszczeń bez limitów!
              </p>
            </div>
            <br />

            <div>
              <img src={check} className="float-left mr-4" />
              <p className="font-semibold">NIEOGRANICZONA LICZBA MEBLI</p>
              <p className="ml-10">dodawaj i eksperymentuj bez ograniczeń!</p>
            </div>
            <br />

            <div>
              <img src={check} className="float-left mr-4" />
              <p className="font-semibold">LEPSZA JAKOŚĆ MODELI</p>
              <p className="ml-10">
                generuj jeszcze bardziej realistyczne wizualizacje!
              </p>
            </div>
          </div>

          <div className="sm:col-span-4 lg:col-end-3 xl:col-end-4 lg:col-span-1 xl:col-span-1 lg:h-fit sm:w-full lg:w-fit lg:row-start-1">
            <div className="text-center w-full">
              <img src={logo} width={350} className="mx-auto" />
              <div className="w-fit mx-auto">
                <stripe-buy-button
                  client-reference-id={user?.sub?.replace("|", "_")}
                  customer-email={user?.email}
                  buy-button-id="buy_btn_1QytqdKbnNGg7WCfZQ6aEkWa"
                  publishable-key="pk_test_51HaQr5KbnNGg7WCfK9TjfYNHdg34JJyTLEwjqvDFbwXVBtBMgfYkhcg7f0Fl502OUAXN33eL8mbq2X6QFaQLldLD00VF4zkdNV"
                ></stripe-buy-button>
              </div>
              <p className="font-semibold">50,00 zł / miesiąc</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PremiumInfoPage;
