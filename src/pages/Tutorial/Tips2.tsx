import { motion } from "framer-motion";

function Tips2() {
  return (
    <div className="text-background max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:text-left">
      <motion.h2
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        🎥 Dodatkowe wskazówki skanowania
      </motion.h2>
      
      <div className="space-y-8 text-base">
        <div>
          <motion.h3
            className="text-xl font-semibold mb-4"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Rozplanuj zapętloną ścieżkę skanowania ogólnego:
          </motion.h3>
          <motion.ul
            className="list-disc pl-5 space-y-4 font-medium text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <li>
              Określ pozycję startową - to w tej pozycji zaczynasz i kończysz
              każde okrążenie, w tym punkcie powoli zmieniasz wysokość nagrania
              (w przypadku skanu ogólnego oraz obwodowego).
            </li>
            <li>
              W przypadku małych pomieszczeń ścieżką może być linia (którą
              trzeba przejść w tę i z powrotem).
            </li>
            <li>W przypadku średnich pomieszczeń - okrąg, chodzimy w kółko.</li>
            <li>
              W przypadku dużych pomieszczeń - slalom, postaraj się, żeby
              zakrętów slalomu było jak najmniej.
            </li>
            <li>
              W przypadku średnich i dużych pomieszczeń, dobrze jest również
              wykonać skan zawracając wyznaczoną ścieżką, przynajmniej z jednej
              wysokości (najlepiej z poziomu łokcia).
            </li>
            <li>Wykonuj ostre, ale powolne zakręty.</li>
          </motion.ul>
        </div>

        <div>
          <motion.h3
            className="text-xl font-semibold mb-4"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Rozplanuj zapętloną ścieżkę skanowania obwodowego:
          </motion.h3>
          <motion.ul
            className="list-disc pl-5 space-y-4 font-medium text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <li>
              W każdym przypadku będzie to ścieżka biegnąca dookoła
              pomieszczenia, jak najbliżej ściany.
            </li>
            <li>
              Trzymamy urządzenie równolegle do najbliższej ściany i nagrywamy
              przeciwległą ścianę.
            </li>
            <li>Wykonuj ostre, ale powolne zakręty w kątach pomieszczenia.</li>
          </motion.ul>
        </div>

        <div>
          <motion.h3
            className="text-xl font-semibold mb-4"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Skan ogólny i obwodowy musi być wykonany z co najmniej 3 wysokości:
          </motion.h3>
          <motion.ul
            className="list-disc pl-5 space-y-4 font-medium text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <li>Poziom poniżej kolana</li>
            <li>Na wysokości łokcia</li>
            <li>Ponad głową</li>
          </motion.ul>
        </div>

        <div>
          <motion.h3
            className="text-xl font-semibold mb-4"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Skany suplementarne:
          </motion.h3>
          <motion.ul
            className="list-disc pl-5 space-y-4 font-medium text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <li>
              Nie są konieczne, ale pozwalają wyprodukować miejscowo lepszy
              model i łatać dziury.
            </li>
            <li>
              Wykonuj je podobnym tempem, ale już bez konieczności trzymania
              telefonu prostopadle do podłoża, możesz puścić wodzę fantazji.
            </li>
            <li>
              Możesz dodatkowo lepiej uchwycić sufit oraz podłogę, nagrywając je
              pod różnymi kątami i wysokościami (pozwala zwalczyć dziurawy
              sufit/podłogę).
            </li>
            <li>
              Dodatkowo nagraj miejsce, gdzie planujesz dokonywać najwięcej
              zmian w renowacji, aby uzyskać miejscowo lepszy model.
            </li>
            <li>
              Dodatkowo nagraj skomplikowane meble, które chcesz, by były
              uchwycone poprawnie.
            </li>
          </motion.ul>
        </div>
      </div>
      
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

export default Tips2;
