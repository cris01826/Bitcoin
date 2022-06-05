import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class BitcoinServiceService {
  constructor() {}

  getBitcoin(ids: string, vs_currencies: string) {
    return axios
      .get(
        environment.apiURL +
          "simple/price?ids=" +
          ids +
          "&vs_currencies=" +
          vs_currencies
      )
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }

  getHistoricalBitcoin(id: string) {
    return axios
      .get(
        environment.apiURL +
          "coins/" +
          id +
          "/market_chart?vs_currency=usd&days=15&interval=daily"
      )
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }

  getDetailBitcoin(date: string) {
    return axios
      .get(
        environment.apiURL +
          "coins/bitcoin/history?date=" +
          date +
          "&localization=false"
      )
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  }
}
