export interface SplatModel {
  id: string;
  modelId: string;
  idInRenovation: string | null;
  name: string;
  url: string;
  isNewObject: boolean;
  isRoom: boolean;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  visible: boolean;
}

export type Mode = "scale" | "translate" | "rotate";
