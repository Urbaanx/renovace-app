import React from "react";
import Modal from "../Home/Modal";
import Button from "../../../../components/Button/Button";
import { CiCircleCheck } from "react-icons/ci";
import { Link } from "react-router";
import { memo } from "react";

interface ModalCompleteProps {
  isOpen: boolean;
  onClose: () => void;
  renovationsId: string;
}

const ModalComplete: React.FC<ModalCompleteProps> = ({
  isOpen,
  onClose,
  renovationsId,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center text-background text-sm mt-12">
        <h2 className="text-2xl font-bold text-center">Dziękujemy!</h2>
        <p className="text-center mt-6 mb-8">Twoja renowacja jest gotowa</p>

        <div>
          <CiCircleCheck style={{ fontSize: "68px" }} />
        </div>

        <p className="text-center mt-10 mb-4">
          Możesz ją znaleźć w zakładce Moje Renowacje
          <br />
          lub zobaczyć ją teraz!
        </p>

        <div className="flex justify-center mt-8 space-x-4">
          <Button
            onClick={onClose}
            className="text-backgroundComponents border border-backgroundComponents px-14 py-2 rounded shadow-md hover:shadow-lg hover:bg-opacity-80"
          >
            Zamknij
          </Button>
          <Link to={`/renovations/${renovationsId}`}>
            <button className="bg-backgroundComponents text-mainColorText px-6 py-2 rounded shadow-md hover:bg-opacity-80">
              Zobacz renowację
            </button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default memo(ModalComplete);
