import React from "react";
import Modal from "../Home/Modal";
import Button from "../../../../components/Button/Button";
import { CiCircleCheck } from "react-icons/ci";
import { memo } from "react";

interface ModalCompleteProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalComplete: React.FC<ModalCompleteProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center text-background text-sm mt-12">
        <h2 className="text-2xl font-bold text-center">Dziękujemy!</h2>
        <p className="text-center mt-6 mb-8">Twój mebel został wygenerowany</p>

        <div>
          <CiCircleCheck style={{ fontSize: "68px" }} />
        </div>

        <p className="text-center mt-10 mb-4">
          Możesz go znaleźć w zakładce Moje Meble
        </p>

        <div className="flex justify-center mt-8 space-x-4">
          <Button
            onClick={onClose}
            className="text-backgroundComponents border border-backgroundComponents px-12 py-2 rounded shadow-md"
          >
            Zamknij
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default memo(ModalComplete);
