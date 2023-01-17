import { Component } from '@angular/core';

@Component({
  selector: 'app-adm-panel',
  templateUrl: './adm-panel.component.html',
  styleUrls: ['./adm-panel.component.css']
})
export class AdmPanelComponent {
  icon_profile: string = "../../../../assets/icons-menu/profile.gif";
  icon_update: string = "../../../../assets/icons-menu/settings.gif";
  icon_sale: string = "../../../../assets/icons-menu/sale.gif";
  icon_log_out: string = "../../../../assets/icons-menu/logout.png";
  icon_products:string ="../../../../assets/icons-menu/cutlery.gif";
}
