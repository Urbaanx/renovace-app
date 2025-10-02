import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import bgVideo from "../../assets/tlo3.mp4";
<script async src="https://js.stripe.com/v3/buy-button.js"></script>;

function SuccessPage() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center h-dvh w-dvw text-center bg-backgroundComponents text-backgroundComponents text-xl m-auto">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover filter blur-xl opacity-60"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        <div className="relative my-auto h-fit py-20 max-h-dvh bg-mainColorText md:rounded-xl p-10 sm:w-dvw md:w-5/6">
          <h1 className="text-5xl font-bold">Dziękujemy!</h1>
          <br />
          <h2 className="text-2xl font-semibold">
            Twoja subskrypcja Renovace+ została aktywowana!
          </h2>
          <img className="mx-auto" src={logo} width={400} />
          <p>
            Od teraz masz dostęp do nielimitowanej liczby skanów mebli i
            pokojów.
          </p>
          <p>Przejdź do aplikacji i korzystaj z jej pełnych możliwości!</p>
          <Link to={`/dashboard`}>
            <button className="py-4 px-12 rounded-lg my-5 bg-backgroundComponents text-mainColorText hover:brightness-150">
              Przejdź do aplikacji
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SuccessPage;
