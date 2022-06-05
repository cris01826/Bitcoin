import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { BitcoinServiceService } from "src/app/services/bitcoin-service.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private bitcoin: BitcoinServiceService
  ) {}
  loading = false;
  public date;
  public usd: any = 0;
  public cop: any = 0;
  public eur: any = 0;
  ngOnInit() {
    this.getdesatils();
  }

  async getdesatils() {
    try {
      this.loading = true;
      var date_unix: any = this.route.snapshot.paramMap.get("date");
      this.date = moment(moment.unix(date_unix).unix()).format("DD-MM-YYYY");
      await this.bitcoin.getDetailBitcoin(this.date).then((res: any) => {
        console.log(res);

        this.usd = Intl.NumberFormat().format(
          Math.round(res.market_data.current_price.usd)
        );
        this.eur = Intl.NumberFormat().format(
          Math.round(res.market_data.current_price.eur)
        );
        this.loading = false;
      });
    } catch (error) {}
  }
}
