import { useState } from "react";
import { SplatModel } from "../SplatModel";
import rightExpand from "../../../assets/chevron-right.svg";
import leftExpand from "../../../assets/chevron-left.svg";
import visibleIcon from "../../../assets/visible.svg";
import invisibleIcon from "../../../assets/invisible.svg";
import Button from "../../../components/Button/Button";
import NumberInput from "../../../components/NumberInput/NumberInput";
import "../../../styles.css";

interface ModelSettingsPublicProps {
  models: SplatModel[];
  updateModel: (id: string, updatedProps: Partial<SplatModel>) => void;
  activeModel?: SplatModel;
  selectModel: (id: string) => void;
  type: string;
  objectName?: string;
  roomName?: string;
  renovationName?: string;
}

export default function ModelSettingsPublic({
  models,
  updateModel,
  activeModel,
  selectModel,
  type,
  objectName,
  roomName,
  renovationName,
}: ModelSettingsPublicProps) {
  const [isExpandedSettings, setIsExpandedSettings] = useState<boolean>(true);
  const [isExpandedAllModels, setIsExpandedAllModels] = useState<boolean>(true);

  function handleIsExpandedSettings() {
    setIsExpandedSettings(!isExpandedSettings);
  }
  function handleIsExpandedAllModels() {
    setIsExpandedAllModels(!isExpandedAllModels);
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
            className={`flex flex-col w-56 ${
              type != "renovations" ? "top-5 h-56" : "h-full"
            } rounded-sm bg-mainColorText text-center text-backgroundComponents font-bold justify-items-center absolute z-40 px-3 justify-between py-5 xl:py-12 pb-20 shadow-expandModels sm:pt-10 sm:pb-28 `}
          >
            <Button
              onClick={handleIsExpandedAllModels}
              className="absolute z-50 -right-5 top-12 bg-mainColorText border-2 border-backgroundComponents rounded hover:bg-graydark group hover:border-mainColorText "
            >
              <img
                src={leftExpand}
                className="w-8 h-8 brightness-0 group-hover:brightness-200"
              />
            </Button>
            <div
              className={`${
                type === "renovations" &&
                "overflow-y-auto scrollable-add-models"
              }`}
            >
              {type === "rooms" ? (
                <div className=" flex  text-center justify-center items-center xl:text-xl md:text-lg ">
                  <p className="w-2/3 break-all mx-2">
                    {roomName === null || roomName === undefined
                      ? "Pokój"
                      : roomName}
                  </p>
                </div>
              ) : type === "renovations" ? (
                <div className=" flex  text-center justify-center items-center xl:text-xl md:text-lg ">
                  <p className="w-2/3 mx-2 break-all">
                    {renovationName === null || renovationName === undefined
                      ? "Renowacja"
                      : renovationName}
                  </p>
                </div>
              ) : (
                <div className=" flex  text-center justify-center items-center xl:text-xl md:text-lg ">
                  <p className="w-2/3 mx-2 break-all">
                    {objectName === null || objectName === undefined
                      ? "Mebel"
                      : objectName}
                  </p>
                </div>
              )}
              <div>
                <div
                  className={`flex flex-col h-36 xl:h-96 lg:h-52 md:h-24 sm:h-12 pt-5 gap-3 text-start `}
                >
                  {models.map((model) => (
                    <div
                      key={model.id}
                      className={`flex flex-row justify-between gap-2 px-3 py-1  ${
                        activeModel == model ? " bg-graylight2 rounded" : ""
                      } `}
                    >
                      <Button
                        className="w-2/3 text-base break-all"
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Button
          onClick={handleIsExpandedAllModels}
          className=" absolute z-50 md:left-16 left-0 top-16 bg-backgroundComponents border-2 border-brown rounded hover:bg-graydark group hover:border-white"
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
