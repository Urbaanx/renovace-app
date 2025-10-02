import { useDeleteApiCancelSubscription } from "../../../../api/endpoints/api";
import Button from "../../../../components/Button/Button";
import Logo from "../../../../components/Logo/Logo";

interface CancelSubcriptionModalProps {
  closeModal: () => void;
  setIsPremiumRole: (value: boolean) => void;
}

export default function CancelSubcriptionModal({
  closeModal,
  setIsPremiumRole,
}: CancelSubcriptionModalProps) {
  const deleteSubscription = useDeleteApiCancelSubscription();

  const handleCancelSubscription = async () => {
    await deleteSubscription.mutateAsync();
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-stone-900 bg-opacity-40 z-50 text-background sm:text-start text-center">
      <div className="bg-mainColorText xl:w-[800px]  gap-4  mx-4 sm:mx-10  h-auto px-12 py-6 rounded-2xl relative flex flex-col border border-brown shadow-lg">
        <div className="flex flex-row gap-5 w-full justify-between items-center">
          <div className="flex sm:flex-row flex-col items-center gap-5">
            <p className="lg:text-4xl text-2xl font-bold">
              Czy na pewno chcesz zrezygnować z Renovace+?
            </p>
            <div className="w-28 sm:block hidden">
              <Logo width="100px" height="100px" />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 justify-start">
          <p className="font-semibold text-xl">
            Jeśli anulujesz subskrypcję Renovace+, utracisz dostęp do:
          </p>
          <ul className="flex flex-col uppercase list-disc pl-4 gap-4">
            <li>Lepszej jakości modeli</li>
            <li>Nieograniczonej liczby pokojów</li>
            <li>Nieograniczonej liczby mebli</li>
          </ul>
        </div>
        <p>
          Twoje projekty pozostaną, ale nie będziesz mógł korzystać z pełni
          możliwości aplikacji!
        </p>
        <p className="font-semibold text-xl">
          Czy na pewno chcesz zrezygnować?
        </p>
        <div className="flex flex-col sm:flex-row  md:justify-between gap-3">
          <Button
            className="bg-mainColorText text-background border-2 border-background px-14 py-2 rounded shadow-md hover:border-graylight hover:text-graylight"
            onClick={closeModal}
          >
            Zachowaj subskrypcję
          </Button>
          <Button
            onClick={() => {
              handleCancelSubscription();
              closeModal();
              setIsPremiumRole(false);
              //refreshPage();
            }}
          >
            Anuluj subskrypcję
          </Button>
        </div>
      </div>
    </div>
  );
}
