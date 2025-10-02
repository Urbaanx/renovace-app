import { useState, useEffect, memo } from "react";
import trashIcon from "../../../../assets/trash.svg";
import shareIcon from "../../../../assets/share.svg";
import Badge from "../../../../components/BadgeRooms/BadgeRooms";
import BadgeShared from "../../../../components/BadgeShared/BadgeShared";
import { useNavigate } from "react-router";
import formatDate from "../../../../components/DateFormater/formatDate";
import Button from "../../../../components/Button/Button";
import homeListCards from "../homeListCardsFunction";
import { useAuth0 } from "@auth0/auth0-react";
import { MoonLoader } from "react-spinners";
import ShareRoomModal from "./ShareRoomModal";
import ShareRoomModalDone from "./ShareRoomModalDone";
import { useGetApiRoomShareGetUsers } from "../../../../api/endpoints/api";
import Thumbnail from "../../../../components/Thumbnail/Thumbnail";
import { useGetApiRoomShareGetOwnerInfo } from "../../../../api/endpoints/api";
import BadgeSharedBy from "../../../../components/BadgeSharedBy/BadgeSharedBy";
import DeleteRoomModal from "./DeleteRoomModal";
import { AnimatePresence } from "framer-motion";

interface RoomCardProps {
  name: string;
  creationDate: string;
  roomId: string;
  ownerId: string;
  modelGenerated: boolean;
  errorRoom: any;
  setIsSuccessDelete: (value: boolean) => void;
  setIsErrorDelete: (value: boolean) => void;
  setIsErrorDeleteMessage: (value: string) => void;
  setIsSuccessDeleteMessage: (value: string) => void;
  refetchRooms?: () => void;
}

function RoomCard({
  name,
  creationDate,
  roomId,
  ownerId,
  modelGenerated,
  errorRoom,
  refetchRooms,
  setIsSuccessDelete,
  setIsErrorDelete,
  setIsErrorDeleteMessage,
  setIsSuccessDeleteMessage,
}: RoomCardProps) {
  const { user } = useAuth0();

  const navigate = useNavigate();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isShareDoneModalOpen, setIsShareDoneModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isBadgeSharedOpen, setIsBadgeSharedOpen] = useState(false);
  const [roomOwner, setRoomOwner] = useState<any>(null);
  const [isOwner, setIsOwner] = useState(false);

  const handleOpenShareModal = () => setIsShareModalOpen(true);
  const handleCloseShareModal = () => setIsShareModalOpen(false);
  const handleOpenShareDoneModal = () => setIsShareDoneModalOpen(true);
  const handleCloseShareDoneModal = () => setIsShareDoneModalOpen(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const [sharedUsers, setSharedUsers] = useState<any[]>([]);

  const getSharedUsersQuery = useGetApiRoomShareGetUsers({ roomId: roomId });

  useEffect(() => {
    if (
      getSharedUsersQuery.isFetched &&
      Array.isArray(getSharedUsersQuery.data)
    ) {
      setSharedUsers(getSharedUsersQuery.data);
    }
  }, [getSharedUsersQuery]);

  const getOwnerInfoQuery = useGetApiRoomShareGetOwnerInfo({ roomId: roomId });

  useEffect(() => {
    if (getOwnerInfoQuery.isFetched) {
      const response = getOwnerInfoQuery.data;
      if (response) {
        setRoomOwner(response);
        setIsOwner(ownerId === user?.sub);
      } else {
        setRoomOwner(null);
        console.error("Unexpected response format");
      }
    }
  }, [getOwnerInfoQuery.isFetched, getOwnerInfoQuery.data, ownerId, user?.sub]);

  const handleShare = async () => {
    handleCloseShareModal();
    handleOpenShareDoneModal();
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
            id={roomId}
            sharedUsers={sharedUsers}
            modelType="room"
            setIsBadgeSharedOpen={setIsBadgeSharedOpen}
          />
        )}

        {!isOwner && roomOwner && <BadgeSharedBy email={roomOwner} />}

        <div className="w-full h-40 rounded-lg overflow-hidden border border-brown relative">
          {errorRoom ? (
            <div className="flex items-center justify-center h-full text-red-500 font-semibold">
              Błąd generowania pokoju!
            </div>
          ) : !modelGenerated ? (
            <div className="flex flex-col h-40 place-items-center items-center place-content-center gap-5 text-background">
              <MoonLoader size={40} />
              <p>Trwa generowanie pokoju...</p>
            </div>
          ) : (
            <Button
              className="w-full h-40"
              onClick={() => {
                homeListCards(
                  roomId,
                  "add",
                  ownerId,
                  ownerId === user?.sub,
                  name,
                  creationDate,
                  "room",
                  modelGenerated,
                  errorRoom
                );
                navigate(`/rooms/${roomId}`);
              }}
            >
              <Thumbnail
                name={name}
                id={roomId}
                type="room"
                modelGenerated={modelGenerated}
                error={errorRoom}
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
            {errorRoom === null && modelGenerated && (
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
          <ShareRoomModal
            onClose={handleCloseShareModal}
            onShare={handleShare}
            roomId={roomId}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteRoomModal
            onClose={handleCloseDeleteModal}
            roomId={roomId}
            roomName={name}
            ownerId={ownerId}
            isOwner={ownerId === user?.sub}
            refetchRooms={refetchRooms}
            setIsSuccessDelete={setIsSuccessDelete}
            setIsErrorDelete={setIsErrorDelete}
            setIsErrorDeleteMessage={setIsErrorDeleteMessage}
            setIsSuccessDeleteMessage={setIsSuccessDeleteMessage}
          />
        )}

        {isShareDoneModalOpen && (
          <ShareRoomModalDone onClose={handleCloseShareDoneModal} />
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(RoomCard);
