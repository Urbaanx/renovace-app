import { useState } from "react";
import {
  usePostApiRoom,
  usePutApiRoomId,
  useDeleteApiRoomId,
} from "../../api/endpoints/api";
import { Room } from "../../api/endpoints/api.schemas";
import "../../styles.css";
import Modal from "../HomePage/subpages/Home/Modal";

interface ObjectModalProps {
  setIsOpen: (val: boolean) => void;
  values: Room | undefined;
  refresh: () => void;
}

function RoomModal({ setIsOpen, values, refresh }: ObjectModalProps) {
  const [roomId, setRoomId] = useState(
    values == undefined ? "" : values.roomId,
  );
  const [ownerId, setOwnerId] = useState(
    values == undefined ? "" : values.ownerId,
  );
  const [width, setWidth] = useState(values == undefined ? 0 : values.width);
  const [height, setHeight] = useState(values == undefined ? 0 : values.height);
  const [length, setLength] = useState(values == undefined ? 0 : values.length);
  const [videoUploaded, setVideoUploaded] = useState(
    values == undefined ? false : values.videoUploaded,
  );
  const [modelGenerated, setModelGenerated] = useState(
    values == undefined ? false : values.modelGenerated,
  );
  const [visibility, setVisibility] = useState(
    values == undefined ? false : values.visibility,
  );
  const [name, setName] = useState(values == undefined ? "" : values.name);
  const [thumbnail, setThumbnail] = useState(
    values == undefined ? "" : values.thumbnail,
  );
  const [generationDate, setGenerationDate] = useState(
    values == undefined ? "" : values.generationDate,
  );
  const [creationDate, setCreationDate] = useState(
    values == undefined ? "" : values.creationDate,
  );
  const [uploadDate, setUploadDate] = useState(
    values == undefined ? "" : values.uploadDate,
  );
  const [modificationDate, setModificationDate] = useState(
    values == undefined ? "" : values.modifyDate,
  );

  const updateQuery = usePutApiRoomId();
  const addQuery = usePostApiRoom();
  const deleteQuery = useDeleteApiRoomId();

  return (
    <Modal
      isOpen={true}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <div className="mx-3 ml-0 h-auto overflow-y-scroll bg-mainColorText text-background scrollable-admin grid grid-cols-3 rounded-2xl gap-3 p-5 pt-0">
        <div className="sticky top-0 col-span-3 bg-mainColorText py-4 ">
          {values == undefined && (
            <h1 className="text-xl text-center">Dodaj Room</h1>
          )}
          {values != undefined && (
            <h1 className="text-xl text-center">Uaktualnij Room</h1>
          )}
        </div>
        <label hidden={values == undefined} className="py-3 mx-3">
          roomId
        </label>
        <input
          value={roomId}
          required={true}
          hidden={values == undefined}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setRoomId(e.target.value)}
        ></input>

        <label hidden={values == undefined} className="py-3 mx-3">
          ownerId
        </label>
        <input
          value={ownerId?.toString()}
          hidden={values == undefined}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setOwnerId(e.target.value)}
        ></input>

        <label className="py-3 mx-3">width</label>
        <input
          value={width}
          type="number"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setWidth(Number(e.target.value))}
        ></input>

        <label className="py-3 mx-3">height</label>
        <input
          value={height}
          type="number"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setHeight(Number(e.target.value))}
        ></input>

        <label className="py-3 mx-3">length</label>
        <input
          value={length}
          type="number"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setLength(Number(e.target.value))}
        ></input>

        <label className="py-3 mx-3">videoUploaded</label>
        <input
          checked={videoUploaded}
          type="checkbox"
          className="col-span-2"
          onChange={(e) => setVideoUploaded(e.target.checked)}
        ></input>

        <label className="py-3 mx-3">modelGenerated</label>
        <input
          checked={modelGenerated}
          type="checkbox"
          className="col-span-2"
          onChange={(e) => setModelGenerated(e.target.checked)}
        ></input>

        <label className="py-3 mx-3">visibility</label>
        <input
          checked={visibility}
          type="checkbox"
          className="col-span-2"
          onChange={(e) => setVisibility(e.target.checked)}
        ></input>

        <label className="py-3 mx-3">name</label>
        <input
          value={name?.toString()}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label className="py-3 mx-3">thumbnail</label>
        <input
          value={thumbnail?.toString()}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setThumbnail(e.target.value)}
        ></input>

        <label hidden={values == undefined} className="py-3 mx-3">
          generationDate
        </label>
        <input
          value={generationDate != null ? generationDate : undefined}
          hidden={values == undefined}
          type="datetime-local"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setGenerationDate(e.target.value)}
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

        <label hidden={values == undefined} className="py-3 mx-3">
          uploadDate
        </label>
        <input
          value={uploadDate != null ? uploadDate : undefined}
          hidden={values == undefined}
          type="datetime-local"
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setUploadDate(e.target.value)}
        ></input>

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
            if (values?.roomId != undefined)
              await deleteQuery.mutateAsync({ id: values?.roomId });
            refresh();
            setIsOpen(false);
          }}
        >
          Usun
        </button>

        <button
          className="p-3 w-28 rounded-md bg-backgroundComponents border-1 border-backgroundComponents text-white text-center mx-auto hover:text-backgroundComponents hover:bg-brownlight"
          onClick={async () => {
            if (values != null && values.roomId != undefined) {
              await updateQuery.mutateAsync({
                data: {
                  roomId: roomId,
                  ownerId: ownerId,
                  width: width,
                  height: height,
                  length: length,
                  videoUploaded: videoUploaded,
                  modelGenerated: modelGenerated,
                  visibility: visibility,
                  name: name,
                  thumbnail: thumbnail,
                  generationDate: generationDate,
                  creationDate: creationDate,
                  uploadDate: uploadDate,
                  modifyDate: modificationDate,
                },
                id: values.roomId,
              });
            } else {
              await addQuery.mutateAsync({
                data: {
                  width: width,
                  height: height,
                  length: length,
                  videoUploaded: videoUploaded,
                  modelGenerated: modelGenerated,
                  visibility: visibility,
                  name: name,
                  thumbnail: thumbnail,
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

export default RoomModal;
