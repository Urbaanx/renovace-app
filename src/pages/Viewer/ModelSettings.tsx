import { useState } from "react";
import { SplatModel } from "./SplatModel";
import rightExpand from "../../assets/chevron-right.svg";
import leftExpand from "../../assets/chevron-left.svg";
import visibleIcon from "../../assets/visible.svg";
import invisibleIcon from "../../assets/invisible.svg";
import deleteIcon from "../../assets/recycle_bin.svg";
import saveIcon from "../../assets/save.svg";
import Button from "../../components/Button/Button";
import closeIcon from "../../assets/x.svg";
import plusIcon from "../../assets/plus.svg";
import editIcon from "../../assets/edit.svg";
import NumberInput from "../../components/NumberInput/NumberInput";
import "../../styles.css";
import { v4 as uuidv4 } from "uuid";
import TextInput from "../../components/TextInput/TextInput";
import { UseQueryResult } from "react-query";
import { Renovation } from "../../api/endpoints/api.schemas";
import {
  getApiObjectModelId,
  usePutApiRenovationId,
} from "../../api/endpoints/api";

interface ModelSettingsProps {
  models: SplatModel[];
  updateModel: (id: string, updatedProps: Partial<SplatModel>) => void;
  removeModel: (id: string) => void;
  activeModel?: SplatModel;
  selectModel: (id: string) => void;
  handleAddModel: (
    id: string,
    modelId: string,
    name: string,
    url: string,
    isNewObject: boolean,
    isRoom: boolean
  ) => void;
  saveModelsToDatabase: () => void;
  renovationName: string | null | undefined;
  setRenovationName: (renovationName: string) => void;
  renovationRequest: UseQueryResult<Renovation, unknown>;
  furniture: object;
  renovationCanEdit: boolean;
  setIsFailed: (flag: boolean) => void;
  setErrorMessage: (text: string) => void;
}

export default function ModelSettings({
  models,
  updateModel,
  removeModel,
  activeModel,
  selectModel,
  handleAddModel,
  saveModelsToDatabase,
  renovationName,
  setRenovationName,
  renovationRequest,
  furniture,
  renovationCanEdit,
  setIsFailed,
  setErrorMessage,
}: ModelSettingsProps) {
  const [isExpandedSettings, setIsExpandedSettings] = useState<boolean>(true);
  const [isExpandedAddModel, setIsExpandedAddModel] = useState<boolean>(false);
  const [isExpandedAllModels, setIsExpandedAllModels] = useState<boolean>(true);
  const [isNameEditing, setIsNameEditing] = useState<boolean>(false);

  const updateRenovationName = usePutApiRenovationId();

  function handleIsExpandedSettings() {
    setIsExpandedSettings(!isExpandedSettings);
  }
  function handleIsExpandedAllModels() {
    setIsExpandedAllModels(!isExpandedAllModels);
  }

  const fetchObjectModel = async (id: string) => {
    const response = await getApiObjectModelId(id);

    if (!response) {
      setIsFailed(true);
      setErrorMessage("Błąd podczas dodania modelu mebla!");
      throw new Error("Network response was not ok");
    }
    return response;
  };

  async function addObjectModel(modelId: string, name: string) {
    const objectModelData = await fetchObjectModel(modelId);

    if (objectModelData) {
      const url = await objectModelData.text();

      handleAddModel(uuidv4(), modelId, name, url, true, false);
    }
  }

  async function handleChangeRenovationName() {
    if (renovationName !== "") {
      setIsNameEditing(false);
      if (renovationRequest && renovationRequest.data) {
        const currentRoom = renovationRequest.data;
        await updateRenovationName.mutateAsync({
          id: renovationRequest.data.renovationId || "",
          data: {
            ...currentRoom,
            name: renovationName,
          },
        });
      }
    }
  }

  const settings = activeModel && activeModel.visible && (
    <>
      {isExpandedSettings ? (
        <>
          <Button
            onClick={handleIsExpandedSettings}
            className="absolute right-40 border-2 border-brown bg-backgroundComponents rounded top-12 z-50 hover:bg-graydark group hover:border-white hidden md:block"
          >
            <img
              src={rightExpand}
              className="w-8 h-8 group-hover:brightness-200"
            />
          </Button>
          <div className="absolute place-items-center right-0 lg:top-7 w-44 h-auto bg-background border-2 border-brown z-40 text-mainColorText px-5 gap-1 pb-5 pt-5 rounded hidden md:block">
            <p className="lg:text-lg md:text-xs font-bold">
              {activeModel.name}
            </p>
            <p className="lg:my-5 md:my-2">Ustaw mebel</p>
            <div className="flex flex-col xl:gap-2 md:gap-1 xl:text-lg lg:text-md md:text-xs">
              <label>Skala:</label>
              <NumberInput
                className="w-full bg-graydark rounded-sm pl-1"
                min={0}
                value={activeModel.scale}
                onChange={(e) =>
                  updateModel(activeModel.id, {
                    scale: parseFloat(e.target.value),
                  })
                }
              />
              <label>Pozycja:</label>
              <div className="flex flex-col gap-4">
                <div className="flex flex-row">
                  <label className="mr-2">x:</label>
                  <NumberInput
                    className="w-full bg-graydark rounded-sm pl-1"
                    value={activeModel.position[0]}
                    onChange={(e) =>
                      updateModel(activeModel.id, {
                        position: [
                          parseFloat(e.target.value),
                          activeModel.position[1],
                          activeModel.position[2],
                        ],
                      })
                    }
                  />
                </div>
                <div className="flex flex-row">
                  <label className="mr-2">y:</label>
                  <NumberInput
                    className="w-full bg-graydark rounded-sm pl-1"
                    value={activeModel.position[1]}
                    onChange={(e) =>
                      updateModel(activeModel.id, {
                        position: [
                          activeModel.position[0],
                          parseFloat(e.target.value),
                          activeModel.position[2],
                        ],
                      })
                    }
                  />
                </div>
                <div className="flex flex-row">
                  <label className="mr-2 ">z:</label>
                  <NumberInput
                    className="w-full bg-graydark rounded-sm pl-1"
                    value={activeModel.position[2]}
                    onChange={(e) =>
                      updateModel(activeModel.id, {
                        position: [
                          activeModel.position[0],
                          activeModel.position[1],
                          parseFloat(e.target.value),
                        ],
                      })
                    }
                  />
                </div>
              </div>
              <label>Rotacja:</label>
              <div className="flex flex-col gap-4">
                <div className="flex flex-row">
                  <label className="mr-2 ">x:</label>
                  <NumberInput
                    className="w-full bg-graydark rounded-sm pl-1"
                    value={activeModel.rotation[0]}
                    onChange={(e) =>
                      updateModel(activeModel.id, {
                        rotation: [
                          parseFloat(e.target.value),
                          activeModel.rotation[1],
                          activeModel.rotation[2],
                        ],
                      })
                    }
                  />
                </div>
                <div className="flex flex-row">
                  <label className="mr-2 ">y:</label>
                  <NumberInput
                    className="w-full bg-graydark rounded-sm pl-1"
                    value={activeModel.rotation[1]}
                    onChange={(e) =>
                      updateModel(activeModel.id, {
                        rotation: [
                          activeModel.rotation[0],
                          parseFloat(e.target.value),
                          activeModel.rotation[2],
                        ],
                      })
                    }
                  />
                </div>
                <div className="flex flex-row">
                  <label className="mr-2 ">z:</label>
                  <NumberInput
                    className="w-full bg-graydark rounded-sm pl-1"
                    value={activeModel.rotation[2]}
                    onChange={(e) =>
                      updateModel(activeModel.id, {
                        rotation: [
                          activeModel.rotation[0],
                          activeModel.rotation[1],
                          parseFloat(e.target.value),
                        ],
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Button
          onClick={handleIsExpandedSettings}
          className=" absolute z-50 right-0 top-12 bg-backgroundComponents border-2 border-brown rounded hover:bg-graydark group hover:border-white"
        >
          <img
            src={leftExpand}
            className="w-8 h-8 group-hover:brightness-200"
          />
        </Button>
      )}
    </>
  );
  return (
    <>
      {isExpandedAllModels ? (
        <>
          <div
            className={`flex flex-col w-56  h-full bg-mainColorText text-center text-backgroundComponents font-bold justify-items-center absolute z-40 px-3 justify-normal py-5 xl:py-12 pb-20 shadow-expandModels sm:pt-10 sm:pb-28 ${
              isExpandedAddModel ? "shadow-expandModels" : ""
            } `}
          >
            {!isExpandedAddModel && (
              <Button
                onClick={handleIsExpandedAllModels}
                className="absolute z-50 -right-5 top-12 bg-mainColorText border-2 border-backgroundComponents rounded hover:bg-graydark group hover:border-mainColorText "
              >
                <img
                  src={leftExpand}
                  className="w-8 h-8 brightness-0 group-hover:brightness-200"
                />
              </Button>
            )}
            <div className="overflow-y-auto scrollable-add-models">
              <div className=" flex  text-center justify-center items-center xl:text-xl md:text-lg ">
                {isNameEditing ? (
                  <TextInput
                    className={`w-1/2 text-center rounded-sm mx-2 ${
                      renovationName === "" && "border-2 border-red-600"
                    }`}
                    value={renovationName || "Renowacja"}
                    onChange={(e) => {
                      setRenovationName(e.target.value);
                    }}
                  />
                ) : (
                  <p className="w-2/3 break-all">
                    {renovationName === null || renovationName === undefined
                      ? "Renowacja"
                      : renovationName}
                  </p>
                )}
                {!isNameEditing ? (
                  <Button
                    className={null}
                    onClick={() => setIsNameEditing(true)}
                  >
                    <img src={editIcon} />
                  </Button>
                ) : (
                  <Button className={null} onClick={handleChangeRenovationName}>
                    <img src={saveIcon} />
                  </Button>
                )}
              </div>

              <div className="w-full  min-h-24 ">
                <p className="xl:text-lg md:text-md xl:pb-7 md:pb-5 xl:pt-8 sm:pt-4 py-5 ">
                  Dodane meble
                </p>
                <div
                  className={`flex flex-col gap-3 text-start ${
                    models.length > 2
                      ? "overflow-y-auto scrollbar-thin scrollbar-thumb-brown scrollbar-track-transparent"
                      : ""
                  }`}
                  style={{
                    maxHeight: "calc(100vh - 400px)",
                    minHeight: "50px",
                  }}
                >
                  {models.map((model) => (
                    <div
                      key={model.id}
                      className={`flex flex-row justify-between gap-2 px-3 py-1  ${
                        activeModel == model ? " bg-graylight2 rounded" : ""
                      } `}
                    >
                      <Button
                        className="w-1/2  break-all text-base"
                        onClick={() => selectModel(model.id)}
                      >
                        {model.name}
                      </Button>
                      <div className="flex flex-row gap-2">
                        <Button
                          className={null}
                          onClick={() =>
                            updateModel(model.id, {
                              visible: model.visible ? false : true,
                            })
                          }
                        >
                          {model.visible ? (
                            <img src={visibleIcon} />
                          ) : (
                            <img src={invisibleIcon} />
                          )}
                        </Button>
                        <Button
                          className="disabled:opacity-50"
                          disabled={model.isRoom}
                          onClick={() => removeModel(model.id)}
                        >
                          <img src={deleteIcon} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex lg:flex-col sm:flex-row flex-col place-items-center gap-3 pt-10 ">
                {renovationCanEdit && (
                  <>
                    <Button
                      className=" w-36 h-12 bg-backgroundComponents text-mainColorText font-semibold rounded text-sm border-2 border-brown shadow-buttons"
                      onClick={() => {
                        setIsExpandedAddModel(true);
                      }}
                    >
                      Dodaj mebel
                    </Button>
                    <Button className={null} onClick={saveModelsToDatabase}>
                      <img className="w-8" src={saveIcon} />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          {isExpandedAddModel && (
            <div className="absolute flex flex-col md:left-56 lg:left-72 z-40 h-screen   w-64 pr-2 bg-brown text-backgroundComponents font-bold text-center justify-items-center py-12 pb-24 ">
              <p className="text-xl pb-8">Lista mebli:</p>
              {Array.isArray(furniture) && furniture.length == 0 ? (
                <p>
                  Nie posiadasz żadnych mebli. Wróć do mebli i stwórz własny
                  mebel.
                </p>
              ) : (
                <div
                  className={`flex flex-col h-screen gap-3 text-start ${
                    Array.isArray(furniture) && furniture.length > 3
                      ? "overflow-y-scroll scrollable-add-models"
                      : ""
                  }`}
                  style={{
                    maxHeight: "calc(100vh - 400px)",
                    minHeight: "50px",
                  }}
                >
                  {Array.isArray(furniture) &&
                    furniture.map(
                      (model: { objectId: string; name: string }) => (
                        <div
                          key={model.objectId}
                          className="flex flex-row justify-between px-6 items-center justify-center"
                        >
                          <p className="break-words max-w-32 ">{model.name}</p>
                          <Button
                            onClick={async () => {
                              await addObjectModel(model.objectId, model.name);
                            }}
                            className="w-6 h-6 bg-backgroundComponents rounded  flex items-center justify-center group "
                          >
                            <img
                              src={plusIcon}
                              className="group-hover:brightness-200 transition-all duration-150 "
                            />
                          </Button>
                        </div>
                      )
                    )}
                </div>
              )}

              <Button
                className="absolute right-3 top-3 border-2 border-backgroundComponents bg-backgroundComponents rounded hover:bg-brown hover:border-backgroundComponents group"
                onClick={() => {
                  setIsExpandedAddModel(false);
                }}
              >
                <img
                  src={closeIcon}
                  className=" group-hover:brightness-0 transition-all duration-150"
                />
              </Button>
            </div>
          )}
        </>
      ) : (
        <Button
          onClick={handleIsExpandedAllModels}
          className=" absolute z-50 lg:left-16 left-0 top-12 bg-backgroundComponents border-2 border-brown rounded hover:bg-graydark group hover:border-white"
        >
          <img
            src={rightExpand}
            className="w-8 h-8 group-hover:brightness-200"
          />
        </Button>
      )}
      {settings}
    </>
  );
}
