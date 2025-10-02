interface UploadFileButtonProps {
  openModal: () => void;
}

export default function UploadFileButton({ openModal }: UploadFileButtonProps) {
  return (
    <div className="flex mt-6 md:mt-0">
      <button
        onClick={openModal}
        className="
          inline-flex items-center justify-center 
          w-16 h-16 text-3xl
          bg-backgroundComponents text-mainColorText 
          border-2 border-brown 
          font-semibold 
          rounded-md cursor-pointer 
          transition duration-300 ease-in-out
          hover:bg-gray-600 active:bg-gray-700
          shadow-md
        "
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        +
      </button>
    </div>
  );
}
