import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  signInform: FormGroup;
  errorMessage: string;
  message: any;
  gestionnaire: any;
  currentUser: any;
  role: void;

  constructor(private formbuilder: FormBuilder,
              private authservice: AuthService,
              private router: Router) {
               }


  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.signInform = this.formbuilder.group(
      {
        username: [ '' , [ Validators.required]],
        password: [ '' , [Validators.required] ]
      }
    );
  }
  onSubmit() {
    const username = this.signInform.get('username').value;
    const password = this.signInform.get('password').value;
    const resp = this.authservice.login(username, password);
    // tslint:disable-next-line: no-shadowed-variable
    resp.subscribe( resp => {
      const jwtToken = resp.headers.get('authorization');
      this.authservice.saveToken(jwtToken);
      this.router.navigate(['/equipements']);
      this.authservice.getGestionnaire(username).subscribe(res => {
         this.gestionnaire = res;
         localStorage.setItem('gestionnaire', JSON.stringify(res));
         localStorage.setItem('etat', res.roles[0].role);
         console.log(this.gestionnaire);
        }, err => {
          console.log(err);
        }
        );
    }, err => {
      this.errorMessage = 'uncorrect! try again';
       }
    );

  }

}
