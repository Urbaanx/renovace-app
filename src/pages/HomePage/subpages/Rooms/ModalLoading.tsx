import React from "react";
import Modal from "../Home/Modal";
import Button from "../../../../components/Button/Button";
import { MoonLoader } from "react-spinners";
import { memo } from "react";

interface ModalLoadingProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLoading: React.FC<ModalLoadingProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center text-background text-sm mt-10">
        <h2 className="text-2xl font-bold text-center">Prawie gotowe!</h2>
        <p className="text-center mt-6 mb-6">Trwa przesyłanie...</p>
        <div className="flex justify-center mt-6">
          <MoonLoader size={50} />
        </div>
        <p className="text-center mt-10 mb-4">
          Już niedługo zobaczysz swój <br /> pokój w wersji 3D!
        </p>
        <div className="flex justify-center mt-8">
          <Button
            onClick={onClose}
            className="text-backgroundComponents border border-backgroundComponents px-20 py-2 rounded shadow-md"
          >
            Zamknij
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default memo(ModalLoading);
