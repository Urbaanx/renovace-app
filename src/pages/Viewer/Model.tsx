import { Splat } from "@react-three/drei";
import { useCallback, useEffect } from "react";
import { useRef } from "react";
import { Mode, SplatModel } from "./SplatModel";
import { TransformControls } from "@react-three/drei";

export default function Model({
  model,
  isActive,
  activeModelId,
  onSelect,
  updateModel,
  mode,
  orbitControlsRef,
}: {
  model: SplatModel;
  isActive: boolean;
  activeModelId?: string;
  onSelect: () => void;
  mode: Mode;
  updateModel: (updatedProps: Partial<SplatModel>) => void;
  orbitControlsRef: any;
}) {
  const transformControlsRef = useRef<any>(null);
  const lastScaleRef = useRef<number>(model.scale);

  const handlePointerUp = useCallback(() => {
    if (transformControlsRef.current) {
      const transformObject = transformControlsRef.current?.object;
      const maxPosition = 50;
      const minPosition = -50;
      if (transformObject && activeModelId) {
        if (mode == "translate") {
          const { x, y, z } = transformObject.position;
          const translateX = Number(
            Math.min(Math.max(x, minPosition), maxPosition).toFixed(2)
          );
          const translateY = Number(
            Math.min(Math.max(y, minPosition), maxPosition).toFixed(2)
          );
          const translateZ = Number(
            Math.min(Math.max(z, minPosition), maxPosition).toFixed(2)
          );
          updateModel({
            position: [translateX, translateY, translateZ],
          });
          transformObject.position.set(translateX, translateY, translateZ);
        }
        if (mode == "rotate") {
          const { x, y, z } = transformObject.rotation;
          const rotateX = Number(x.toFixed(2));
          const rotateY = Number(y.toFixed(2));
          const rotateZ = Number(z.toFixed(2));
          updateModel({
            rotation: [rotateX, rotateY, rotateZ],
          });
        }
        if (mode == "scale") {
          const { x, y, z } = transformObject.scale;
          const lastScale = lastScaleRef.current;
          let newScale = x;
          if (Math.abs(x - lastScale) > 0.01) newScale = x;
          else if (Math.abs(y - lastScale) > 0.01) newScale = y;
          else if (Math.abs(z - lastScale) > 0.01) newScale = z;
          newScale = Number(newScale.toFixed(2));
          transformObject.scale.set(newScale, newScale, newScale);
          lastScaleRef.current = newScale;
          updateModel({
            scale: newScale,
          });
        }
      }
    }
  }, [activeModelId, mode, updateModel]);

  useEffect(() => {
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (transformControlsRef.current) {
      const controls = transformControlsRef.current;
      const handleDraggingChanged = (event: any) => {
        if (orbitControlsRef.current) {
          orbitControlsRef.current.enabled = !event.value;
        }
      };
      controls.addEventListener("dragging-changed", handleDraggingChanged);
      return () => {
        controls.removeEventListener("dragging-changed", handleDraggingChanged);
      };
    }
  }, [orbitControlsRef, transformControlsRef]);

  return (
    <>
      <TransformControls
        key={model.id}
        ref={transformControlsRef}
        enabled={isActive}
        mode={mode}
        position={model.position}
        rotation={model.rotation}
        scale={model.scale}
        visible={model.visible}
        showX={model.visible}
        showY={model.visible}
        showZ={model.visible}
      >
        <Splat
          alphaTest={0.1}
          src={model.url}
          onClick={onSelect}
          frustumCulled={false}
        />
      </TransformControls>
    </>
  );
}
