import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandeService } from '../services/demande.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit {

  demandeForm: FormGroup;
  @Input() demandeurNom;
  @Input() demandeurId;
  errorMessage: string;
  message: any;
  constructor(private formbuilder: FormBuilder,
              private router: Router,
              private demandeSrevice: DemandeService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.demandeForm = this.formbuilder.group({
      typeEvent: [ '' , [Validators.required] ],
      dateReservation: ['', [Validators.required]],
      objet: ['', [Validators.required]],
      equipement: ['', [Validators.required]],
      nombreInvite: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }
  onSubmit() {
    const typeEvent = this.demandeForm.get('typeEvent').value;
    const dateReservation = this.demandeForm.get('dateReservation').value;
    const objet = this.demandeForm.get('objet').value;
    const equipement = this.demandeForm.get('equipement').value;
    const nombrePresent = this.demandeForm.get('nombreInvite').value;
    const dateDemande = new Date();
    const description = this.demandeForm.get('comment').value;
    const demande = {
      typeEvent, dateReservation, objet, equipement, nombrePresent, dateDemande, description
    };
    this.demandeSrevice.addDemande(demande).subscribe(
      resp => {
        console.log(resp);
      }, err => {
        console.log(err);
      }
    );


  }

}