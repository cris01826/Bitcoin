import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { BitcoinServiceService } from "src/app/services/bitcoin-service.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private bitcoinService: BitcoinServiceService) {}

  public btc = 0;
  public detail_btc = [];
  ngOnInit() {
    this.getBitcoin();
    this.gethistoricalBitcoin();
    setInterval(() => {
      this.getBitcoin();
    }, 60000);
  }

  async getBitcoin() {
    try {
      await this.bitcoinService
        .getBitcoin("bitcoin", "usd")
        .then((res: any) => {
          console.log(res);
          this.btc = res.bitcoin.usd;
        });
    } catch (error) {}
  }

  async gethistoricalBitcoin() {
    try {
      await this.bitcoinService
        .getHistoricalBitcoin("bitcoin")
        .then((res: any) => {
          console.log(res);
          for (let i = 0; i < res.prices.length; i++) {
            const prices = res.prices[i];
            this.detail_btc.push({
              date: moment(moment.unix(prices[0]).unix()).format(
                "DD MMM YYYY hh:mm a"
              ),
              currenc: "USD",
              price: prices[1],
            });
          }
          console.log("detalle", this.detail_btc);
        });
    } catch (error) {}
  }
}
