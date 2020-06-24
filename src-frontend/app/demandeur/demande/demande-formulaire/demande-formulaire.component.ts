import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Demandeur } from 'src/app/models/utilisateur.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DemandeService } from 'src/app/services/demande.service';
import { AuthService } from 'src/app/services/auth.service';
import { EquipementsService } from 'src/app/services/equipements.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Reservation } from 'src/app/models/reservation.model';

@Component({
  selector: 'app-demande-formulaire',
  templateUrl: './demande-formulaire.component.html',
  styleUrls: ['./demande-formulaire.component.scss']
})
export class DemandeFormulaireComponent implements OnInit {
  demandeForm: FormGroup;
  errorMessage: string;
  message: any;
  user: Demandeur;
  userSubjection: Subscription;
  username: string;
  id: number;
  obligationScanne: any;
  constructor(private formbuilder: FormBuilder,
              private demandeSrevice: DemandeService,
              private authService: AuthService,
              private equipementService: EquipementsService,
              private reservationService: ReservationsService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.user);
    this.initForm();
  }

  initForm() {
    this.demandeForm = this.formbuilder.group({
      typeEvent: [ '' , [Validators.required] ],
      dateReservation: ['', [Validators.required]],
      objet: ['', [Validators.required]],
      equipement: ['', [Validators.required]],
      nombrePresent: ['', [Validators.required]],
      description: ['', [Validators.required]],
      demandeur: [this.user],
      dateDemande: [new Date()]
    });
  }
  saveObligation(event) {
    this.obligationScanne = event.target.files[0];
    console.log(this.obligationScanne);
  }
  onSubmit() {
    //  const form = this.demandeForm.value;
    const uploadData = new FormData();
    uploadData.append('obligationScanne', this.obligationScanne, this.obligationScanne.name);
    console.log(this.obligationScanne);
    console.log(this.demandeForm.get('demandeur').value);
    let demande: any;
    this.demandeSrevice.addDemande(this.demandeForm.value).subscribe(
      resp => {
        demande = resp;
        this.addReservation(resp);
        console.log(resp);
        this.demandeSrevice.addfileToDemande(uploadData, demande.id).subscribe(
          res => {
            localStorage.setItem('demande', JSON.stringify(res));
          }, err => console.log(err)
        );
      }, err2 => {
        console.log(err2);
      }
    );


  }
  addReservation(demand: any) {
    const id = this.demandeForm.get('equipement').value;
  //  let equipement: any;
    this.equipementService.getEquipement(id).subscribe(
      res => {
        localStorage.setItem('equipement', JSON.stringify(res));
  //      equipement = res;
  //      console.log(equipement);
        const equipement = res;
        const demande = demand;
        const etat = 'initial';
        const reservation = {
          demande,
          equipement,
          etat
        };
        console.log(equipement);
        this.reservationService.addReservation(reservation).subscribe(
          resp => {
            console.log(resp);
          }, err => {
            console.log(err);
          }
        );
      }
    );
}
}
