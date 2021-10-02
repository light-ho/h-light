import apiInstance from "../utils/api-instance";

// import apiInstance from "./api-instance";
export type TimeResolution = "hourly" | "daily" | "weekly" | "monthly";
export interface POWERApiParams {
  long: string;
  lat: string;
  from?: Date;
  to?: Date;
  resolution?: TimeResolution;
}

export interface IPOWER {
  getUpdatedUrl(params: POWERApiParams): Promise<any>;
}

export class POWER implements IPOWER {
  getUpdatedUrl(params: POWERApiParams): Promise<any> {
    let url = this.getApiUrl(params.resolution || "hourly");

    //change long
    url = this.changeParamters(params.long, url, "longitude") || url;
    //change lat
    url = this.changeParamters(params.lat, url, "latitude") || url;
    //change start
    url = this.changeParamters(params.from, url, "start") || url;
    //chnage end
    url = this.changeParamters(params.to, url, "end") || url;

    // TODO osama should implement this
    // return apiInstance. <Write your function here> using apiInstance.x instead of axios.x
    // and you can omit the base url "https://power.larc.nasa.gov/"
    // for example you should use "/api/temporal/hourly/point?parameters=T2M&community=SB&longitude=0&latitude=0&start=20170101&end=20170102&format=CSV "
    // instead of "https://power.larc.nasa.gov/api/temporal/hourly/point?parameters=T2M&community=SB&longitude=0&latitude=0&start=20170101&end=20170102&format=CSV"
    return this.getPowerData(url);
  }
  getApiUrl(time: TimeResolution) {
    let arr = {
      hourly:
        "/api/temporal/hourly/point?parameters=T2M&community=SB&longitude=0&latitude=0&start=20170101&end=20170102&format=JSON",
      daily:
        "/api/temporal/daily/point?parameters=T2M&community=SB&longitude=0&latitude=0&start=20170101&end=20170201&format=JSON",
      weekly: "",
      monthly:
        "/api/temporal/monthly/point?parameters=T2M,T2M_MAX&community=SB&longitude=0&latitude=0&format=JSON&start=2016&end=2017",
    };
    return arr[time];
  }
  changeParamters(value: any, url: string, paramName: string) {
    let val = value.toString(); //input can be dates,string,....
    if (val.length == 0)
      //if no parameter passed return
      return;

    let wLength = (paramName + "=").length;
    let startIndx = url.indexOf(paramName + "=");
    let i = startIndx;
    for (; i < url.length && url.charAt(i) != "&"; i++) {
      //just loop
    }
    let from = startIndx + wLength; // longitude=14558877& => start->1 ,end-> &
    url = url.replace(url.substring(startIndx, i), paramName + "=" + val);
    return url;
  }

  getPowerData(url: string) {
    return apiInstance
      .get(url, {})
      .then((res) => {
        const data = res.data;
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
