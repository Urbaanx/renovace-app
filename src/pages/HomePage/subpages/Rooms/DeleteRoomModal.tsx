import { memo } from "react";
import { useDeleteApiRoomId } from "../../../../api/endpoints/api";
import Button from "../../../../components/Button/Button";
import homeListCards from "../homeListCardsFunction";
import { motion } from "framer-motion";

interface DeleteRoomModalProps {
  onClose: () => void;
  roomId: string;
  roomName: string;
  ownerId?: string | null;
  isOwner?: boolean;
  setIsSuccessDelete: (value: boolean) => void;
  setIsErrorDelete: (value: boolean) => void;
  setIsErrorDeleteMessage: (value: string) => void;
  setIsSuccessDeleteMessage: (value: string) => void;
  refetchRooms?: () => void;
}

function DeleteRoomModal({
  onClose,
  roomId,
  roomName,
  ownerId,
  isOwner,
  refetchRooms,
  setIsSuccessDelete,
  setIsErrorDelete,
  setIsErrorDeleteMessage,
  setIsSuccessDeleteMessage,
}: DeleteRoomModalProps) {
  const deleteRoom = useDeleteApiRoomId();

  const handleDelete = (id: string) => {
    deleteRoom.mutateAsync(
      { id },
      {
        onSuccess: () => {
          setIsSuccessDeleteMessage("Pokój został pomyślnie usunięty.");
          setIsSuccessDelete(true);
          homeListCards(id, "remove", ownerId, isOwner);
          refetchRooms?.();
          onClose();
        },
        onError: (error) => {
          setIsErrorDeleteMessage(
            "Nie udało się usunąć pokoju, bądź pokój nie istnieje."
          );
          setIsErrorDelete(true);
          console.error("Error deleting room:", error);
          onClose();
        },
      }
    );
  };

  return (
    <motion.div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <motion.div
        className="bg-mainColorText rounded-2xl p-10 w-full max-w-md relative shadow-lg text-background"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
      >
        <button onClick={onClose} className="absolute top-2 right-4 text-lg">
          ✕
        </button>
        <h2 className="text-base font-bold text-center mb-2">
          Czy na pewno chcesz usunąć pokój {roomName}?
        </h2>
        <motion.hr
          className="mb-6 mx-auto w-full border-t-1 border-background"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileInView={{ width: "60%" }}
          viewport={{ once: true }}
        />
        <p className="text-center text-sm mb-4">
          Ta akcja jest nieodwracalna i spowoduje usunięcie wszystkich danych
          związanych z tym pokojem.
        </p>
        <div className="flex-row flex justify-around mt-4 gap-4">
          <Button
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            onClick={onClose}
          >
            Nie
          </Button>
          <Button
            className="bg-red-600 text-mainColorText px-14 py-2 rounded shadow-md hover:bg-opacity-90"
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            onClick={() => handleDelete(roomId)}
          >
            Tak, usuń
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default memo(DeleteRoomModal);
