import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ReservationsService } from 'src/app/services/reservations.service';
import { EquipementsService } from 'src/app/services/equipements.service';

@Component({
  selector: 'app-list-demandes',
  templateUrl: './list-demandes.component.html',
  styleUrls: ['./list-demandes.component.scss']
})
export class ListDemandesComponent implements OnInit {
  demandeur: any;
  id: number;
  reservations; any;
  searchEquipementSubject: any;
  searchEtatSubject: any;
  searchObjetSubject: any;
  equipements: any;
  constructor(private authservice: AuthService,
              private router: ActivatedRoute,
              private reservationsService: ReservationsService,
              private equipementService: EquipementsService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    console.log(this.id);
    this.reservationsService.getReservationsByDemandeur(this.id).subscribe(
          res => {
            this.reservations = res;
            console.log(this.reservations);
          }, err => console.log(err)
    );
    this.equipementService.getEquipements().subscribe(
      resp => {
        this.equipements = resp;
        console.log(this.equipements);
      }
    );
  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
    month = '0' + month;
    }
    if (day.length < 2) {
    day = '0' + day;
    }

    return [year, month, day].join('-');
  }
}
