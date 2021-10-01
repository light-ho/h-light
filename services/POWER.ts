export type TimeResolution = "hourly" | "daily" | "weekly" | "monthly";

export interface POWERApiParams {
  long: string;
  lat: string;
  from?: Date;
  to?: Date;
  resolution?: TimeResolution;
}

export interface IPOWER {
  getByParameters(params: POWERApiParams): Promise<any>;
}
