import { Component, NgZone, OnInit } from "@angular/core";
import * as moment from "moment";
import { BitcoinServiceService } from "src/app/services/bitcoin-service.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(
    private bitcoinService: BitcoinServiceService,
    public ngzone: NgZone
  ) {}

  public btc:any;
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
          this.btc = Intl.NumberFormat().format(res.bitcoin.usd);
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
              date_unix: prices[0],
              date: moment(moment.unix(prices[0]).unix()).format(
                "DD MMM YYYY hh:mm a"
              ),
              currenc: "USD",
              price: Intl.NumberFormat().format(Math.round(prices[1])),
            });
          }
          this.ngzone.run(()=>{
            this.detail_btc.sort(
              (a, b) => parseInt(a.date_unix) - parseInt(b.date_unix)
            );
          })
          
          console.log("detalle", this.detail_btc);
        });
    } catch (error) {}
  }
}
