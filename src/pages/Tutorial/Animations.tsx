import { motion } from "framer-motion";
import SmallRoom from "./SmallRoom";
import MediumRoom from "./MediumRoom";
import LargeRoom from "./LargeRoom";
import LShapedRoom from "./LShapedRoom";

export default function Animations() {
  return (
    <div className="text-background max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <motion.h1
        className="text-lg font-semibold mb-2"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Jak poruszać się, by uzyskać najlepszy efekt?
      </motion.h1>

      <motion.h2
        className="text-2xl font-bold mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Zobacz najlepsze ścieżki dla różnych układów pokojów!
      </motion.h2>

      <motion.div
        className="flex justify-center items-center space-x-16 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center">
          <div className="w-20 h-12 border-2 border-background rounded-lg"></div>
          <p className="text-sm mt-2">ściany Twojego pokoju</p>
        </div>

        <div className="flex flex-col items-center mt-5">
          <div className="w-24 h-1.5 bg-brown"></div>
          <p className="text-sm mt-2 text-center">
            ścieżka skanu <br /> (droga, po której najlepiej się poruszać)
          </p>
        </div>

        <div className="flex flex-col items-center mt-6">
          <div className="w-5 h-5 bg-background rounded-full"></div>
          <p className="text-sm mt-2">osoba nagrywająca pokój</p>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center">
          <SmallRoom />
          <div className="w-2/3 pl-6">
            <p className="text-2xl font-bold mb-2">Mały pokój</p>
            <p className="text-sm text-gray-600">
              Jeżeli masz mały pokój, to najlepiej poruszać się wzdłuż pokoju –
              w linii prostej tam i z powrotem. Poruszaj się powoli, szczególnie
              przy zmianach kierunku i zakrętach. Upewnij się, że skan jest
              wykonany w trzech wysokościach. Unikaj długich fragmentów
              skanowania pustych powierzchni.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <MediumRoom />
          <div className="pl-4">
            <p className="text-2xl font-bold mb-2">Średni pokój</p>
            <p className="text-sm text-gray-600">
              W przypadku średniego pokoju, najlepiej poruszać się po okręgu.
              Trzy poziomy wysokości (poniżej kolana, łokieć, ponad głową) to
              absolutne minimum. Trzymaj powolne tempo, ale możesz przejść
              większy obszar w jednym ciągu. Dla wyższej jakości modelu, nagraj
              sufit i podłogę pod różnymi kątami.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center">
          <div className="-ml-8">
            <LargeRoom />
          </div>
          <div className="w-[280px] -ml-2">
            <p className="text-2xl font-bold mb-2">Duży pokój</p>
            <p className="text-sm text-gray-600">
              W przypadku dużego pokoju najlepiej sprawdzi się skanowanie w
              formie slalomu. Unikaj nadmiaru zakrętów, ale pamiętaj, by były
              ostre i powolne. Upewnij się, że skan jest wykonany w trzech
              wysokościach. Możesz zwiększyć tempo przy prostych liniach, ale
              zwolnij przy zakrętach. Zrób dodatkowe skany w newralgicznych
              miejscach, zwłaszcza w strefach, które wymagają renowacji.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="-ml-8">
            <LShapedRoom />
          </div>
          <div className="w-2/3 -ml-12">
            <p className="text-2xl font-bold mb-2 ">
              Pokój w kształcie<br></br> litery L
            </p>
            <p className="text-sm text-gray-600 ">
              Dla pokoju w kształcie litery L, zaplanuj trasę wzdłuż ścian.
              Nagrywaj w trzech poziomach, szczególnie uważaj na miejsca w
              kątach litery L. Poruszaj się powoli w rogu pokoju, aby uchwycić
              detale. Warto wykonać skany suplementarne w newralgicznych
              miejscach, jak we wnętrzu litery L, by wypełnić ewentualne luki.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.hr
        className="my-8 w-full border-t-2 border-brown"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
      />
    </div>
  );
}
