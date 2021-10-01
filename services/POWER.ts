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

export class POWER implements IPOWER{
	getByParameters(params: POWERApiParams): Promise<any> {
		// TODO osama should implement this 
		throw new Error("Method not implemented.");
	}

}