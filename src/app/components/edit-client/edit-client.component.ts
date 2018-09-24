import { Component, OnInit } from '@angular/core';

import { ClientService } from "../../services/client.service";
import { Client } from "../../models/client";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  disableBalanceOnEdit: boolean;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.id).subscribe(client => this.client = client);
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}:{value: Client, valid: boolean}){
    if(!valid){
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }else{
      // update client
      value.id = this.id;
      this.clientService.updateClient(value);
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to dashboard
      this.router.navigate([`/client/${this.id}`]);
    }
  }

}
