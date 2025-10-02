import { useState, useEffect, memo } from "react";
import trashIcon from "../../../../assets/trash.svg";
import shareIcon from "../../../../assets/share.svg";
import Badge from "../../../../components/BadgeFurniture/BadgeFurniture";
import BadgeShared from "../../../../components/BadgeShared/BadgeShared";
import BadgeSharedBy from "../../../../components/BadgeSharedBy/BadgeSharedBy";
import { useNavigate } from "react-router";
import formatDate from "../../../../components/DateFormater/formatDate";
import Button from "../../../../components/Button/Button";
import homeListCards from "../homeListCardsFunction";
import { useAuth0 } from "@auth0/auth0-react";
import { MoonLoader } from "react-spinners";
import ShareFurnitureModal from "./ShareFurnitureModal";
import ShareFurnitureModalDone from "./ShareFurnitureModalDone";
import {
  useGetApiObjectShareGetUsers,
  useGetApiObjectShareGetOwnerInfo,
} from "../../../../api/endpoints/api";
import Thumbnail from "../../../../components/Thumbnail/Thumbnail";
import { AnimatePresence } from "framer-motion";
import DeleteFurnitureModal from "./DeleteFurnitureModal";

interface FurnitureCardProps {
  name: string;
  creationDate: string;
  furnitureId: string;
  ownerId: string;
  modelGenerated: boolean;
  errorFurniture: any;
  setIsSuccessDelete: (value: boolean) => void;
  setIsErrorDelete: (value: boolean) => void;
  setIsErrorDeleteMessage: (value: string) => void;
  setIsSuccessDeleteMessage: (value: string) => void;
  refetchFurniture?: () => void;
  type?: number | undefined;
}

function FurnitureCard({
  name,
  creationDate,
  furnitureId,
  ownerId,
  modelGenerated,
  errorFurniture,
  refetchFurniture,
  setIsSuccessDelete,
  setIsErrorDelete,
  setIsErrorDeleteMessage,
  setIsSuccessDeleteMessage,
  type,
}: FurnitureCardProps) {
  const { user } = useAuth0();

  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isShareDoneModalOpen, setIsShareDoneModalOpen] = useState(false);
  const [sharedUsers, setSharedUsers] = useState<any[]>([]);
  const [isBadgeSharedOpen, setIsBadgeSharedOpen] = useState(false);
  const [furnitureOwner, setFurnitureOwner] = useState<any>(null);
  const [isOwner, setIsOwner] = useState(false);

  const handleOpenShareModal = () => setIsShareModalOpen(true);
  const handleCloseShareModal = () => setIsShareModalOpen(false);
  const handleCloseShareDoneModal = () => setIsShareDoneModalOpen(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const getSharedUsersQuery = useGetApiObjectShareGetUsers({
    roomId: furnitureId,
  });

  useEffect(() => {
    if (
      getSharedUsersQuery.isFetched &&
      Array.isArray(getSharedUsersQuery.data)
    ) {
      setSharedUsers(getSharedUsersQuery.data);
    }
  }, [getSharedUsersQuery]);

  const getOwnerInfoQuery = useGetApiObjectShareGetOwnerInfo({
    objectId: furnitureId,
  });

  useEffect(() => {
    if (getOwnerInfoQuery.isFetched) {
      const response = getOwnerInfoQuery.data;
      if (response) {
        setFurnitureOwner(response);
        setIsOwner(ownerId === user?.sub);
      } else {
        setFurnitureOwner(null);
        console.error("Unexpected response format");
      }
    }
  }, [getOwnerInfoQuery.isFetched, getOwnerInfoQuery.data, ownerId, user?.sub]);

  const handleShare = async () => {
    handleCloseShareModal();
    setIsShareDoneModalOpen(true);
  };

  return (
    <>
      <div
        className={`w-90 bg-mainColorText shadow-md rounded-xl p-4 relative transition-transform duration-300 ${
          modelGenerated ? "hover:scale-105 hover:shadow-xl cursor-pointer" : ""
        } ${isBadgeSharedOpen ? "z-50" : "z-10"}`}
      >
        <Badge />
        {sharedUsers.length > 0 && (
          <BadgeShared
            id={furnitureId}
            sharedUsers={sharedUsers}
            modelType="object"
            setIsBadgeSharedOpen={setIsBadgeSharedOpen}
          />
        )}
        {!isOwner && furnitureOwner && <BadgeSharedBy email={furnitureOwner} />}

        <div className="w-full h-40 rounded-lg overflow-hidden border border-brown relative">
          {errorFurniture ? (
            <div className="flex items-center justify-center h-full text-red-500 font-semibold">
              Błąd generowania mebla!
            </div>
          ) : !modelGenerated ? (
            <div className="flex flex-col h-40 place-items-center items-center place-content-center gap-5 text-background">
              <MoonLoader size={40} />
              <p>Trwa generowanie mebla...</p>
            </div>
          ) : (
            <Button
              className="w-full h-40"
              onClick={() => {
                if (type === 0 || type === undefined) {
                  homeListCards(
                    furnitureId,
                    "add",
                    ownerId,
                    ownerId === user?.sub,
                    name,
                    creationDate,
                    "furniture",
                    modelGenerated,
                    errorFurniture
                  );
                }
                navigate(`/furniture/${furnitureId}`);
              }}
            >
              <Thumbnail
                name={name}
                id={furnitureId}
                type="furniture"
                modelGenerated={modelGenerated}
                error={errorFurniture}
              />
            </Button>
          )}
        </div>
        <div className="mt-4 text-left flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-background">{name}</h3>
            <p className="text-xs text-background font-semibold opacity-60">
              Data utworzenia: {formatDate(creationDate)}
            </p>
          </div>
          <div className="flex space-x-4">
            <img
              src={trashIcon}
              alt="Trash"
              className="w-6 h-6 cursor-pointer hover:brightness-0"
              onClick={handleOpenDeleteModal}
            />
            {errorFurniture === null && modelGenerated && (
              <img
                src={shareIcon}
                alt="Share"
                className="w-6 h-6 cursor-pointer hover:brightness-0"
                onClick={handleOpenShareModal}
              />
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isShareModalOpen && (
          <ShareFurnitureModal
            onClose={handleCloseShareModal}
            onShare={handleShare}
            furnitureId={furnitureId}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteFurnitureModal
            onClose={handleCloseDeleteModal}
            furnitureId={furnitureId}
            furnitureName={name}
            ownerId={ownerId}
            isOwner={ownerId === user?.sub}
            refetchFurniture={refetchFurniture}
            setIsSuccessDelete={setIsSuccessDelete}
            setIsErrorDelete={setIsErrorDelete}
            setIsErrorDeleteMessage={setIsErrorDeleteMessage}
            setIsSuccessDeleteMessage={setIsSuccessDeleteMessage}
          />
        )}

        {isShareDoneModalOpen && (
          <ShareFurnitureModalDone onClose={handleCloseShareDoneModal} />
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(FurnitureCard);
