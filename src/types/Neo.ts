import { ApproachData } from "./ApproachData.ts";

export interface Neo {
  id: number;
  close_approach_data: ApproachData
  estimated_diameter: {
    kilometers: {
      estimated_diameter_max: number;
    }
  };
  is_potentially_hazardous_asteroid: boolean;
}
