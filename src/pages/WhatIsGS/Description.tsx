import ComparisonGS from "./ComparisionGS";
import AnimatedSection from "./AnimatedSection";

function Description() {
  return (
    <div className="text-background max-w-6xl mx-auto pt-12 px-4 sm:px-6 md:px-8 text-center sm:text-left">
      <hr className="my-8 w-full border-t-1 border-brown" />

      <AnimatedSection className="text-base font-medium mt-8 text-center pb-8 px-12">
        3D Gaussian Splatting to nowoczesna technika renderowania pól
        radiancyjnych, umożliwiająca realistyczne generowanie widoków scen 3D w
        czasie rzeczywistym. Metoda ta została zaprezentowana przez zespół
        naukowców z Inria w pracy <br /> "3D Gaussian Splatting for Real-Time
        Radiance Field Rendering"
      </AnimatedSection>

      <div className="text-left">
        <hr className="my-8 w-[200px] border-t border-brown" />
      </div>

      <AnimatedSection className="mt-6 font-semibold text-2xl pb-4">
        Główne założenia Gaussian Splatting:
      </AnimatedSection>

      <AnimatedSection className="mt-2 list-inside list-disc text-base font-medium px-8 space-y-4">
        <li>
          Reprezentacja sceny za pomocą Gaussianów: Scena jest modelowana jako
          zbiór trójwymiarowych funkcji Gaussa, co pozwala na efektywne
          odwzorowanie jej struktury i właściwości optycznych.
        </li>
        <li>
          Optymalizacja i kontrola gęstości Gaussianów: Proces ten obejmuje
          dostosowywanie parametrów Gaussianów, takich jak kowariancja
          anizotropowa, w celu precyzyjnego odwzorowania geometrii i tekstur
          sceny.
        </li>
        <li>
          Szybki algorytm renderowania uwzględniający widoczność: Umożliwia on
          renderowanie sceny z uwzględnieniem anizotropowego splattingu, co
          przyspiesza zarówno trening, jak i sam proces renderowania w czasie
          rzeczywistym.
        </li>
      </AnimatedSection>

      <AnimatedSection className="text-base font-medium mt-8 pb-8">
        Dzięki tym elementom, 3D Gaussian Splatting osiąga wysoką jakość
        wizualną przy jednoczesnym zachowaniu krótkiego czasu treningu i
        możliwości renderowania w czasie rzeczywistym (≥ 100 klatek na sekundę)
        przy rozdzielczości 1080p.
      </AnimatedSection>

      <div className="text-left">
        <hr className="my-8 w-[200px] border-t border-brown" />
      </div>

      <AnimatedSection className="mt-6 font-semibold text-2xl pb-4">
        Zalety Gaussian Splatting
      </AnimatedSection>

      <AnimatedSection className="mt-2 list-inside list-disc text-base font-medium px-8 space-y-4">
        <li>
          Wysoka jakość wizualna: Metoda ta pozwala na generowanie
          realistycznych obrazów scen 3D z zachowaniem szczegółów i poprawnym
          odwzorowaniem efektów świetlnych.
        </li>
        <li>
          Szybkość renderowania: Dzięki efektywnemu algorytmowi, możliwe jest
          renderowanie scen w czasie rzeczywistym, co jest kluczowe w
          aplikacjach takich jak rzeczywistość wirtualna czy gry komputerowe.
        </li>
        <li>
          Efektywność treningu: Proces optymalizacji modelu jest zoptymalizowany
          pod kątem szybkości, co pozwala na skrócenie czasu potrzebnego na
          przygotowanie modelu do użycia.
        </li>
      </AnimatedSection>

      <AnimatedSection className="text-base font-medium mt-8 pb-8">
        3D Gaussian Splatting znajduje zastosowanie w różnych dziedzinach,
        takich jak tworzenie realistycznych środowisk wirtualnych, symulacje czy
        wizualizacje architektoniczne. Dzięki swojej efektywności i jakości,
        stanowi przełom w renderowaniu pól radiancyjnych.
      </AnimatedSection>

      <AnimatedSection>
        <ComparisonGS />
      </AnimatedSection>

      <div className="text-left">
        <hr className="my-8 w-[200px] border-t border-brown" />
      </div>

      <AnimatedSection className="mt-6 font-semibold text-2xl pb-4">
        Jak działa Gaussian Splatting?
      </AnimatedSection>

      <AnimatedSection className="text-base font-medium pb-8">
        Proces działania Gaussian Splatting można opisać w kilku krokach:
      </AnimatedSection>

      <AnimatedSection className="list-inside list-decimal text-base font-medium px-8 space-y-4 pb-4">
        <li>
          Reprezentacja sceny: Pozyskanie danych o scenie trójwymiarowej, np. za
          pomocą fotografii, skanowania laserowego czy innych metod akwizycji
          danych przestrzennych.
        </li>
        <li>
          Transformacja na Gaussiany: Każdy punkt sceny jest przekształcany w
          Gaussiana o określonych parametrach, takich jak pozycja, rozmiar i
          kolor, które odzwierciedlają cechy oryginalnych punktów.
        </li>
        <li>
          Projekcja na płaszczyznę 2D: Gaussiany są rzutowane na płaszczyznę
          dwuwymiarową z perspektywy wirtualnej kamery, symulując ich wygląd z
          tego punktu widzenia.
        </li>
        <li>
          Sortowanie i łączenie: Projekcje Gaussianów są sortowane według
          głębokości w przestrzeni 3D, a następnie łączone w celu utworzenia
          finalnego obrazu, gdzie bliższe Gaussiany mają priorytet nad dalszymi.
        </li>
        <li>
          Renderowanie: Końcowy obraz jest renderowany poprzez kombinację
          wartości kolorów nakładających się Gaussianów na płaszczyźnie 2D, co
          prowadzi do uzyskania wizualnej reprezentacji sceny z perspektywy
          kamery.
        </li>
      </AnimatedSection>

      <div className="text-left">
        <hr className="my-8 w-[200px] border-t border-brown" />
      </div>

      <AnimatedSection className="mt-6 font-semibold text-2xl">
        Chcesz dowiedzieć się więcej?
      </AnimatedSection>

      <AnimatedSection className="text-base font-medium mt-4 pb-8">
        Odwiedź stronę twórców:{" "}
        <a
          href="https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/"
          className="text-blue-500 hover:underline pl-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/
        </a>
      </AnimatedSection>
    </div>
  );
}

export default Description;
