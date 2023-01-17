import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients-options',
  templateUrl: './clients-options.component.html',
  styleUrls: ['./clients-options.component.css']
})

export class ClientsOptionsComponent implements OnInit {
  icon_profile: string = "../../../../assets/icons-menu/profile.gif";
  icon_update: string = "../../../../assets/icons-menu/settings.gif";
  icon_sale: string = "../../../../assets/icons-menu/sale.gif";
  icon_log_out: string = "../../../../assets/icons-menu/logout.png";


  ngOnInit() {

  }

}
