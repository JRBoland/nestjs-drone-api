export interface Drone {
  name: string;
  weight: number;
}

export interface DroneResponse {
  message: string;
  drone: Drone;
}
