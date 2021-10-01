import apiInstance from "../utils/api-instance";

export type TimeResolution = "hourly" | "daily" | "weekly" | "monthly";

export interface POWERApiParams {
  long: string;
  lat: string;
  from: Date;
  to: Date;
  resolution?: TimeResolution;
}

export interface IPOWER {
  getByParameters(params: POWERApiParams): Promise<any>;
}

export class POWER implements IPOWER {
  getByParameters(params: POWERApiParams): Promise<any> {
    // TODO osama should implement this
    // return apiInstance. <Write your function here> using apiInstance.x instead of axios.x
    // and you can omit the base url "https://power.larc.nasa.gov/"
    // for example you should use "/api/temporal/hourly/point?parameters=T2M&community=SB&longitude=0&latitude=0&start=20170101&end=20170102&format=CSV "
    // instead of "https://power.larc.nasa.gov/api/temporal/hourly/point?parameters=T2M&community=SB&longitude=0&latitude=0&start=20170101&end=20170102&format=CSV"
    throw new Error("not implemented");
  }
}
