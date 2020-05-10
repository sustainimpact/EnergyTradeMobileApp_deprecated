import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { TimeService } from 'src/app/services/time.service';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { ADMIN_ROLE, ACTION_CREATE, ACTION_EDIT } from 'src/app/environments/environments';
import { PickerOptions } from '@ionic/core';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-total-sell-leads',
  templateUrl: './total-sell-leads.page.html',
  styleUrls: ['./total-sell-leads.page.scss'],
})
export class TotalSellLeadsPage implements OnInit {

  allSellLeads: any;
  monthFilterKey;
  displayLeads: any;
  locationFilterKey: any;
  selectedLead: any;

  constructor(private router: Router
    , private route: ActivatedRoute
    , private adminService: AdminService
    , private timeService: TimeService
    , private pickerCtrl: PickerController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.allSellLeads = this.adminService.allSellLeads;
    this.displayLeads = this.allSellLeads;
  }

  formatTime(ts, type) {
    if (type == 't')
      return moment(ts).format("hh:mm A");
    else if (type == 'd')
      return moment(ts).format("Do MMM");
  }

  getDuration(startTime: string, endTime: string) {
    return this.timeService.getDuration(startTime, endTime, ADMIN_ROLE);
  }

  selectSellLead(sellLead: any) {
    this.router.navigate(['/profile'], {
      queryParams: {
        userId: sellLead.sellerId,
        flow: 'ADMIN'
      }
    });
  }

  selectLead() {
    if (this.selectedLead != null) {
      this.displayLeads = this.allSellLeads.filter(sellLead => sellLead.sellOrderId == this.selectedLead);
    }
  }

  async filterByMonth() {
    console.log("Apply Month Filter");
    let opts: PickerOptions = {
      buttons: [{ text: 'Ok', role: 'done' }, { text: 'Cancel', role: 'cancel' }],
      columns: [{
        name: "monthOptions",
        options: [{ text: "January", value: "1" }
          , { text: "February", value: "2" }
          , { text: "March", value: "3" }
          , { text: "April", value: "4" }
          , { text: "May", value: "5" }
          , { text: "June", value: "6" }
          , { text: "July", value: "7" }
          , { text: "August", value: "8" }
          , { text: "September", value: "9" }
          , { text: "October", value: "10" }
          , { text: "November", value: "11" }
          , { text: "December", value: "12" }]
      }]
    }
    let picker = await this.pickerCtrl.create(opts)
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('monthOptions');
      this.monthFilterKey = col.options[col.selectedIndex].value;
      this.displayLeads = this.allSellLeads.filter(order => moment(order.transferStartTs).format('M') == this.monthFilterKey);
    }
    );
  }

  async filterByLocation() {
    console.log("Apply Location Filter");
    let opts: PickerOptions = {
      buttons: [{ text: 'Ok', role: 'done' }],
      columns: [{
        name: "monthOptions",
        options: [{ text: "Tarnaka", value: "Tarnaka" }
          , { text: "Nizamabad", value: "Nizamabad" }
          , { text: "Shimachalam", value: "Shimachalam" }
          , { text: "Lingampalli", value: "Lingampalli" }
          , { text: "All", value: "All" }
        ]
      }]
    }
    let picker = await this.pickerCtrl.create(opts)
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('monthOptions');
      this.locationFilterKey = col.options[col.selectedIndex].value;
      if (this.locationFilterKey != 'All') {
        this.displayLeads = this.allSellLeads.filter(order => order.localityName == this.locationFilterKey);
      } else {
        this.displayLeads = this.allSellLeads;
      }
    });
  }
}
