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
}
