import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => { 
      this.clients = clients;
      this.totalOwed = this.getTotalOwed();
    });
  }

  getTotalOwed(){
    const total = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    },0);
    return total;
  }
}
