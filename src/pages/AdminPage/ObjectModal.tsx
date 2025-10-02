import { useState } from "react";
import {
  usePostApiObject,
  usePutApiObjectId,
  useDeleteApiObjectId,
} from "../../api/endpoints/api";
import { Obj } from "../../api/endpoints/api.schemas";
import "../../styles.css";
import Modal from "../HomePage/subpages/Home/Modal";

interface ObjectModalProps {
  setIsOpen: (val: boolean) => void;
  values: Obj | undefined;
  refresh: () => void;
}

function ObjectModal({ setIsOpen, values, refresh }: ObjectModalProps) {
  const [objectId, setObjectId] = useState(
    values == undefined ? "" : values.objectId
  );
  const [videoUploaded, setvideoUploaded] = useState(
    values == undefined ? false : values.videoUploaded
  );
  const [modelGenerated, setModelGenerated] = useState(
    values == undefined ? false : values.modelGenerated
  );
  const [width, setWidth] = useState(values == undefined ? 0 : values.width);
  const [height, setHeight] = useState(values == undefined ? 0 : values.height);
  const [length, setLength] = useState(values == undefined ? 0 : values.length);
  const [name, setName] = useState(values == undefined ? "" : values.name);
  const [thumbnail, setThumbnail] = useState(
    values == undefined ? "" : values.thumbnail
  );
  const [type, setType] = useState(values?.type);
  const [purchaseLink, setPurchaseLink] = useState(values?.purchaseLink);
  const [generationDate, setGenerationDate] = useState(
    values == undefined ? "" : values.generationDate
  );
  const [creationDate, setCreationDate] = useState(
    values == undefined ? "" : values.creationDate
  );
  const [uploadDate, setUploadDate] = useState(
    values == undefined ? "" : values.uploadDate
  );
  const [modificationDate, setModificationDate] = useState(
    values == undefined ? "" : values.modifyDate
  );
  const [ownerId, setOwnerId] = useState(
    values == undefined ? "" : values.ownerId
  );
  const [publicValue, setPublicValue] = useState(
    values == undefined ? false : values.public
  );
  const [errorValue, setErrorValue] = useState(
    values == undefined ? "" : values.error
  );

  const updateQuery = usePutApiObjectId();
  const addQuery = usePostApiObject();
  const deleteQuery = useDeleteApiObjectId();

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
            <h1 className="text-xl text-center">Dodaj Obiekt</h1>
          )}
          {values != undefined && (
            <h1 className="text-xl text-center">Uaktualnij Obiekt</h1>
          )}
        </div>
        <label hidden={values == undefined} className="py-3 mx-3">
          objectId
        </label>
        <input
          value={objectId}
          required={true}
          hidden={values == undefined}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setObjectId(e.target.value)}
        ></input>

        <label hidden={values == undefined} className="py-3 mx-3">
          ownerId
        </label>
        <input
          value={ownerId ?? ""}
          required={true}
          hidden={values == undefined}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setOwnerId(e.target.value)}
        ></input>

        <label className="py-3 mx-3">videoUploaded</label>
        <input
          checked={videoUploaded}
          type="checkbox"
          className="col-span-2"
          onChange={(e) => setvideoUploaded(e.target.checked)}
        ></input>

        <label className="py-3 mx-3">modelGenerated</label>
        <input
          checked={modelGenerated}
          type="checkbox"
          className="col-span-2"
          onChange={(e) => setModelGenerated(e.target.checked)}
        ></input>

        <label className="py-3 mx-3">public</label>
        <input
          checked={publicValue}
          type="checkbox"
          className="col-span-2"
          onChange={(e) => setPublicValue(e.target.checked)}
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

        <label className="py-3 mx-3">type</label>
        <select
          className="col-span-2 p-3 mx-3 rounded-md"
          onChange={(e) => setType(Number(e.target.value) == 0 ? 0 : 1)}
          defaultValue={type}
        >
          <option value={0}>Personal</option>
          <option value={1}>Shop</option>
        </select>

        <label className="py-3 mx-3">purchaseLink</label>
        <input
          type="url"
          value={purchaseLink?.toString()}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setPurchaseLink(e.target.value)}
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

        <label hidden={values == undefined} className="py-3 mx-3">
          error
        </label>
        <input
          value={errorValue ?? ""}
          required={true}
          hidden={values == undefined}
          className="col-span-2 p-3 mx-3 text-backgroundComponents rounded-md"
          onChange={(e) => setErrorValue(e.target.value)}
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
            if (values?.objectId != undefined)
              await deleteQuery.mutateAsync({ id: values?.objectId });
            refresh();
            setIsOpen(false);
          }}
        >
          Usun
        </button>

        <button
          className="p-3 w-28 rounded-md bg-backgroundComponents border-1 border-backgroundComponents text-white text-center mx-auto hover:text-backgroundComponents hover:bg-brownlight"
          onClick={async () => {
            if (values != null && values.objectId != undefined) {
              await updateQuery.mutateAsync({
                data: {
                  objectId: objectId,
                  ownerId: ownerId,
                  videoUploaded: videoUploaded,
                  modelGenerated: modelGenerated,
                  width: width,
                  height: height,
                  length: length,
                  name: name,
                  thumbnail: thumbnail,
                  generationDate: generationDate,
                  creationDate: creationDate,
                  uploadDate: uploadDate,
                  modifyDate: modificationDate,
                  type: type,
                  purchaseLink: purchaseLink,
                  error: errorValue,
                  public: publicValue,
                },
                id: values.objectId,
              });
            } else {
              await addQuery.mutateAsync({
                data: {
                  videoUploaded: videoUploaded,
                  modelGenerated: modelGenerated,
                  width: width,
                  height: height,
                  length: length,
                  name: name,
                  thumbnail: thumbnail,
                  type: type,
                  purchaseLink: purchaseLink,
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

export default ObjectModal;
