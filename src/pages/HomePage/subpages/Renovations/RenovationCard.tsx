import { useState, useEffect, memo } from "react";
import trashIcon from "../../../../assets/trash.svg";
import shareIcon from "../../../../assets/share.svg";
import Badge from "../../../../components/BadgeRenovation/BadgeRenovation";
import BadgeShared from "../../../../components/BadgeShared/BadgeShared";
import { useNavigate } from "react-router-dom";
import formatDate from "../../../../components/DateFormater/formatDate";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../../../components/Button/Button";
import homeListCards from "../homeListCardsFunction";
import ShareRenovationModal from "./ShareRenovationModal";
import ShareRenovationModalDone from "./ShareRenovationModalDone";
import { useGetApiRenovationShareGetUsers } from "../../../../api/endpoints/api";
import Thumbnail from "../../../../components/Thumbnail/Thumbnail";
import { useGetApiRenovationShareGetOwnerInfo } from "../../../../api/endpoints/api";
import BadgeSharedBy from "../../../../components/BadgeSharedBy/BadgeSharedBy";
import { AnimatePresence } from "framer-motion";
import DeleteRenovationModal from "./DeleteRenovationModal";

interface RenovationCardProps {
  roomId: string | null;
  name: string;
  creationDate: string;
  renovationsId: string;
  ownerId: string | null;
  setIsSuccessDelete: (value: boolean) => void;
  setIsErrorDelete: (value: boolean) => void;
  setIsErrorDeleteMessage: (value: string) => void;
  setIsSuccessDeleteMessage: (value: string) => void;
  refetchRenovations?: () => void;
  type?: number | null;
}

function RenovationCard({
  name,
  creationDate,
  renovationsId,
  ownerId,
  refetchRenovations,
  setIsSuccessDelete,
  setIsErrorDelete,
  setIsErrorDeleteMessage,
  setIsSuccessDeleteMessage,
  type,
}: RenovationCardProps) {
  const { user } = useAuth0();

  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isShareDoneModalOpen, setIsShareDoneModalOpen] = useState(false);
  const [isBadgeSharedOpen, setIsBadgeSharedOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [renovationOwner, setRenovationOwner] = useState<any>(null);

  const handleOpenShareModal = () => setIsShareModalOpen(true);
  const handleCloseShareModal = () => setIsShareModalOpen(false);
  const handleCloseShareDoneModal = () => setIsShareDoneModalOpen(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const [sharedUsers, setSharedUsers] = useState<any[]>([]);

  const getSharedUsersQuery = useGetApiRenovationShareGetUsers({
    renovationId: renovationsId,
  });

  useEffect(() => {
    if (
      getSharedUsersQuery.isFetched &&
      Array.isArray(getSharedUsersQuery.data)
    ) {
      setSharedUsers(getSharedUsersQuery.data);
    }
  }, [getSharedUsersQuery]);

  const getOwnerInfoQuery = useGetApiRenovationShareGetOwnerInfo({
    renovationId: renovationsId,
  });

  useEffect(() => {
    if (getOwnerInfoQuery.isFetched) {
      const response = getOwnerInfoQuery.data;
      if (response) {
        setRenovationOwner(response);
        setIsOwner(ownerId === user?.sub);
      } else {
        setRenovationOwner(null);
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
        className={`w-90 bg-mainColorText shadow-md rounded-xl p-4 relative transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
          isBadgeSharedOpen ? "z-50" : "z-10"
        }`}
      >
        <Badge />
        {sharedUsers.length > 0 && (
          <BadgeShared
            id={renovationsId}
            sharedUsers={sharedUsers}
            modelType="renovation"
            setIsBadgeSharedOpen={setIsBadgeSharedOpen}
          />
        )}

        {!isOwner && renovationOwner && (
          <BadgeSharedBy email={renovationOwner} />
        )}
        <div className="w-full h-40 rounded-lg overflow-hidden border text-background border-brown relative">
          <Button
            className="w-full h-40"
            onClick={() => {
              if (type === 0 || type === undefined) {
                homeListCards(
                  renovationsId,
                  "add",
                  ownerId,
                  ownerId === user?.sub,
                  name,
                  creationDate,
                  "renovation",
                  false,
                  null
                );
              }
              navigate(`/renovations/${renovationsId}`);
            }}
          >
            <Thumbnail
              name={name}
              id={renovationsId}
              type="renovation"
              modelGenerated={true}
              error={null}
            />
          </Button>
        </div>
        <div className="mt-4 text-left flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-background">{name}</h3>
            <p className="text-xs text-background font-semibold opacity-60">
              Data wygenerowania: {formatDate(creationDate)}
            </p>
          </div>
          <div className="flex space-x-4">
            <img
              src={trashIcon}
              alt="Trash"
              className="w-6 h-6 cursor-pointer hover:brightness-0"
              onClick={handleOpenDeleteModal}
            />
            <img
              src={shareIcon}
              alt="Share"
              className="w-6 h-6 cursor-pointer hover:brightness-0"
              onClick={handleOpenShareModal}
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isShareModalOpen && (
          <ShareRenovationModal
            onClose={handleCloseShareModal}
            onShare={handleShare}
            renovationId={renovationsId}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteRenovationModal
            onClose={handleCloseDeleteModal}
            renovationId={renovationsId}
            renovationName={name}
            ownerId={ownerId}
            isOwner={ownerId === user?.sub}
            setIsSuccessDelete={setIsSuccessDelete}
            setIsErrorDelete={setIsErrorDelete}
            setIsErrorDeleteMessage={setIsErrorDeleteMessage}
            setIsSuccessDeleteMessage={setIsSuccessDeleteMessage}
            refetchRenovations={refetchRenovations}
          />
        )}

        {isShareDoneModalOpen && (
          <ShareRenovationModalDone onClose={handleCloseShareDoneModal} />
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(RenovationCard);
