import { useState } from "react";
import badgeIcon from "../../assets/share-2.svg";
import { Trash2, X } from "lucide-react";
import { useDeleteApiRoomShareRevoke } from "../../api/endpoints/api";
import { useDeleteApiObjectShareRevoke } from "../../api/endpoints/api";
import { usePostApiRenovationShareRevoke } from "../../api/endpoints/api";

interface BadgeSharedProps {
  sharedUsers: string[];
  id?: string;
  modelType?: string;
  onShareChanged?: () => void;
  setIsBadgeSharedOpen?: (val: boolean) => void;
}

export default function BadgeShared({
  sharedUsers,
  id,
  modelType,
  onShareChanged,
  setIsBadgeSharedOpen,
}: BadgeSharedProps) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (setIsBadgeSharedOpen) setIsBadgeSharedOpen(newState);
  };

  const revokeShare = (() => {
    switch (modelType) {
      case "room":
        return useDeleteApiRoomShareRevoke();
      case "object":
        return useDeleteApiObjectShareRevoke();
      case "renovation":
        return usePostApiRenovationShareRevoke();
      default:
        throw new Error("Unsupported modelType");
    }
  })();

  return (
    <div className="relative z-20">
      <div
        onClick={togglePopup}
        className="cursor-pointer absolute top-[-16px] left-16 -translate-x-1/3 -translate-y-1/3 bg-[#f8f1e3] border border-background px-1 py-3 rounded drop-shadow-lg z-10 
             transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95"
      >
        <img src={badgeIcon} alt="Badge" className="w-5 h-5" />
      </div>

      {isOpen && (
        <div className="absolute top-[-32px] left-[86px] w-80 bg-mainColorText border border-background rounded-lg shadow-md p-4 z-[999] animate-popup">
          <button
            onClick={togglePopup}
            className="absolute top-2 right-2 text-background hover:text-red-500"
          >
            <X size={18} />
          </button>
          <h3 className="text-sm font-semibold mb-6 ml-2 mt-2">
            Udostępnione dla:
          </h3>
          <ul className="space-y-4 ml-2 mb-2">
            {sharedUsers.length === 0 ? (
              <li className="text-xs text-black">Brak udostępnień</li>
            ) : (
              sharedUsers.map((email, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center text-xs text-black"
                >
                  {email}
                  <button
                    className="text-background hover:text-red-500"
                    onClick={() =>
                      revokeShare.mutate(
                        {
                          data: {
                            id: id,
                            userEmail: email,
                            canEdit: false,
                          },
                        },
                        {
                          onSuccess: () => {
                            if (onShareChanged) onShareChanged();
                          },
                        }
                      )
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
