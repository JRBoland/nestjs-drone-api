export interface Pilot {
  name: string;
  age: number;
  flights_recorded?: number;
}

export interface PilotResponse {
  message: string;
  pilot: Pilot;
}
