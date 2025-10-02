import { useState } from "react";
import {
  usePostApiRenovation,
  usePutApiRenovationId,
  useDeleteApiRenovationId,
} from "../../api/endpoints/api";
import { Renovation } from "../../api/endpoints/api.schemas";
import "../../styles.css";
import Modal from "../HomePage/subpages/Home/Modal";

interface RenovationModalProps {
  setIsOpen: (val: boolean) => void;
  values: Renovation | undefined;
  refresh: () => void;
}

function RenovationModal({ setIsOpen, values, refresh }: RenovationModalProps) {
  const [renovationId, setRenovationId] = useState(
    values == undefined ? "" : values.renovationId
  );
  const [ownerId, setOwnerId] = useState(
    values == undefined ? "" : values.ownerId
  );
  const [publicValue, setPublicValue] = useState(
    values == undefined ? false : values.public
  );
  const [name, setName] = useState(values == undefined ? "" : values.name);
  const [modificationDate, setModificationDate] = useState(
    values == undefined ? "" : values.modificationDate
  );
  const [creationDate, setCreationDate] = useState(
    values == undefined ? "" : values.creationDate
  );
  const [type, setType] = useState(values?.type);
  const [roomId, setRoomId] = useState("");

  const updateQuery = usePutApiRenovationId();
  const addQuery = usePostApiRenovation();
  const deleteQuery = useDeleteApiRenovationId();

  return (
    <Modal
      isOpen={true}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <div className="mx-3 ml-0 h-auto overflow-y-scroll bg-mainColorText text-background scrollable-admin grid grid-cols-3 rounded-2xl gap-3 p-5 pt-0">
        <div className="sticky top-0 col-span-3 py-4 bg-mainColorText">
          {values == undefined && (
            <h1 className="text-xl text-center">Dodaj Renovation</h1>
          )}
          {values != undefined && (
            <h1 className="text-xl text-center">Uaktualnij Renovation</h1>
          )}
        </div>

        <label hidden={values == undefined} className="py-3 mx-3">
          renovationId
        </label>
        <input
          value={renovationId}
          hidden={values == undefined}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setRenovationId(e.target.value)}
        ></input>

        <label hidden={values != undefined} className="py-3 mx-3">
          roomId
        </label>
        <input
          value={roomId}
          hidden={values != undefined}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setRoomId(e.target.value)}
        ></input>

        <label hidden={values == undefined} className="py-3 mx-3">
          ownerId
        </label>
        <input
          value={ownerId ?? ""}
          hidden={values == undefined}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setOwnerId(e.target.value)}
        ></input>

        <label className="py-3 mx-3">public</label>
        <input
          checked={publicValue}
          type="checkbox"
          className="col-span-2"
          onChange={(e) => setPublicValue(e.target.checked)}
        ></input>

        <label className="py-3 mx-3">name</label>
        <input
          value={name?.toString()}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label className="py-3 mx-3">type</label>
        <select
          className="col-span-2 p-3 mx-3 rounded-md"
          onChange={(e) => setType(Number(e.target.value) == 0 ? 0 : 1)}
          defaultValue={type}
        >
          <option value={0}>Personal</option>
          <option value={1}>Decorator</option>
        </select>

        <label hidden={values == undefined} className="py-3 mx-3">
          modificationDate
        </label>
        <input
          value={modificationDate}
          hidden={values == undefined}
          type="datetime-local"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setModificationDate(e.target.value)}
        ></input>

        <label hidden={values == undefined} className="py-3 mx-3">
          creationDate
        </label>
        <input
          value={creationDate}
          hidden={values == undefined}
          type="datetime-local"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setCreationDate(e.target.value)}
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
            if (values?.renovationId != undefined)
              await deleteQuery.mutateAsync({ id: values?.renovationId });
            refresh();
            setIsOpen(false);
          }}
        >
          Usun
        </button>

        <button
          className="p-3 w-28 rounded-md bg-backgroundComponents border-1 border-backgroundComponents text-white text-center mx-auto hover:text-backgroundComponents hover:bg-brownlight"
          onClick={async () => {
            if (values != null && values.renovationId != undefined) {
              await updateQuery.mutateAsync({
                data: {
                  renovationId: renovationId,
                  ownerId: ownerId,
                  name: name,
                  public: publicValue,
                  modificationDate: modificationDate,
                  creationDate: creationDate,
                  type: type,
                },
                id: values.renovationId,
              });
            } else {
              await addQuery.mutateAsync({
                data: {
                  roomId: roomId,
                  public: publicValue,
                  name: name,
                  type: type,
                },
              });
            }

            setIsOpen(false);
            refresh();
          }}
        >
          {values == undefined ? "Dodaj" : "Uaktualnij"}
        </button>
      </div>
    </Modal>
  );
}

export default RenovationModal;
