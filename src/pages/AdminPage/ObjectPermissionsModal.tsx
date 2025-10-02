import { useState } from "react";
import {
  usePostApiObjectPerms,
  usePutApiObjectPerms,
  useDeleteApiObjectPermsObjectIdUserId,
} from "../../api/endpoints/api";
import { ObjectPerms } from "../../api/endpoints/api.schemas";
import "../../styles.css";
import Modal from "../HomePage/subpages/Home/Modal";

interface ObjectPermissionsModalProps {
  setIsOpen: (val: boolean) => void;
  values: ObjectPerms | undefined;
  refresh: () => void;
}

function ObjectPermissionsModal({
  setIsOpen,
  values,
  refresh,
}: ObjectPermissionsModalProps) {
  const [objectId, setObjectId] = useState(
    values == undefined ? "" : values.objectId,
  );
  const [userId, setUserId] = useState(
    values == undefined ? "" : values.userId,
  );
  const [renovationOnly, setRenovationOnly] = useState(
    values == undefined ? false : values.renovationOnly,
  );
  const [canEdit, setCanEdit] = useState(
    values == undefined ? false : values.canEdit,
  );

  const updateQuery = usePutApiObjectPerms();
  const addQuery = usePostApiObjectPerms();
  const deleteQuery = useDeleteApiObjectPermsObjectIdUserId();

  return (
    <Modal
      isOpen={true}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <div className="mx-3 ml-0 h-auto overflow-y-scroll bg-mainColorText text-background scrollable-admin grid grid-cols-3 rounded-2xl gap-3 p-5 pt-0">
        <div className="sticky top-0 col-span-3 bg-mainColorText py-4">
          {values == undefined && (
            <h1 className="text-xl text-center">Dodaj Object Permission</h1>
          )}
          {values != undefined && (
            <h1 className="text-xl text-center">
              Uaktualnij Object Permission
            </h1>
          )}
        </div>

        <label className="py-3 mx-3">objectId</label>
        <input
          value={objectId}
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setObjectId(e.target.value)}
        ></input>

        <label className="py-3 mx-3">userId</label>
        <input
          value={userId?.toString()}
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setUserId(e.target.value)}
        ></input>

        <label className="py-3 mx-3">renovationOnly</label>
        <input
          type="checkbox"
          checked={renovationOnly}
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setRenovationOnly(e.target.checked)}
        ></input>

        <label className="py-3 mx-3">canEdit</label>
        <input
          type="checkbox"
          checked={canEdit}
          required={true}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setCanEdit(e.target.checked)}
        ></input>

        <button
          className="p-3 w-28 rounded-md bg-backgroundComponents border-1 border-backgroundComponents text-white text-center mx-auto hover:text-backgroundComponents hover:bg-brownlight"
          onClick={() => setIsOpen(false)}
        >
          Odrzuc
        </button>

        <button
          className="p-3 w-28 rounded-md bg-backgroundComponents border-1 border-backgroundComponents text-white text-center mx-auto hover:text-backgroundComponents hover:bg-brownlight"
          disabled={values == undefined}
          onClick={async () => {
            if (values?.objectId != undefined && values?.userId != undefined)
              await deleteQuery.mutateAsync({
                params: { objectId: values.objectId, userId: values.userId },
              });
            refresh();
            setIsOpen(false);
          }}
        >
          Usun
        </button>

        <button
          className="p-3 w-28 rounded-md bg-backgroundComponents border-1 border-backgroundComponents text-white text-center mx-auto hover:text-backgroundComponents hover:bg-brownlight"
          onClick={async () => {
            if (
              values != null &&
              values.objectId != undefined &&
              values.userId != undefined
            ) {
              await updateQuery.mutateAsync({
                data: {
                  userId: userId,
                  objectId: objectId,
                  renovationOnly: renovationOnly,
                  canEdit: canEdit,
                },
                params: {
                  objectId: values.objectId,
                  userId: values.userId,
                },
              });
            } else {
              await addQuery.mutateAsync({
                data: {
                  userId: userId,
                  objectId: objectId,
                  renovationOnly: renovationOnly,
                  canEdit: canEdit,
                },
              });
            }

            refresh();
            setIsOpen(false);
          }}
        >
          {values == undefined ? "Dodaj" : "Uaktualnij"}
        </button>
      </div>
    </Modal>
  );
}

export default ObjectPermissionsModal;
