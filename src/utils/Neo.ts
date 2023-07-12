import {Neo} from "../types/Neo.ts";

export const getHazardousAsteroidAmount = (neoArray: Neo[]) => {
  let hazardousAsteroidAmount = 0;

  for (const neo of neoArray) {
    if (neo.is_potentially_hazardous_asteroid) {
      hazardousAsteroidAmount++;
    }
  }

  return hazardousAsteroidAmount;
}

export const getClosestNeo = (neoArray: Neo[]) => {
  return neoArray.sort((firstNeo, secondNeo) => {
    const { kilometers: firstNeoDistance } = firstNeo.close_approach_data[0].miss_distance;
    const { kilometers: secondNeoDistance } = secondNeo.close_approach_data[0].miss_distance;

    return firstNeoDistance - secondNeoDistance;
  })[0].close_approach_data[0].miss_distance.kilometers;
}

export const getFastestNeo = (neoArray: Neo[]) => {
  return neoArray.sort((firstNeo, secondNeo) => {
    const { kilometers_per_hour: firstNeoSpeed } = firstNeo.close_approach_data[0].relative_velocity;
    const { kilometers_per_hour: secondNeoSpeed } = secondNeo.close_approach_data[0].relative_velocity;

    return secondNeoSpeed - firstNeoSpeed
  })[0].close_approach_data[0].relative_velocity.kilometers_per_hour;
}

export const getMaxDiameter = (neoArray: Neo[]) => {
  return neoArray.sort((firstNeo, secondNeo) => {
    const { estimated_diameter_max: firstNeoDiameter} = firstNeo.estimated_diameter.kilometers;
    const { estimated_diameter_max: secondNeoDiameter} = secondNeo.estimated_diameter.kilometers;

    return firstNeoDiameter - secondNeoDiameter;
  })[0].estimated_diameter.kilometers.estimated_diameter_max;
}
