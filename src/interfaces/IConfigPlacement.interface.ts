import { ValidClassPlacement } from "@/helpers/consts";

export interface IConfigPlacement {
  id?: number;
  type: ValidClassPlacement;
  x: number;
  y: number;
}
