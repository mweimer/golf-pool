import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service'

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
})

export class SignupComponent implements OnInit {

    name: string;
    email: string;
    password: string;
    confirmPassword: string;

    constructor(private route: Router, private authService: AuthService) {}

    ngOnInit(): void {
     
    }

    signup() {
        if (this.validate) {
            this.authService.signup(this.name, this.email, this.password).subscribe(user => {
                this.route.navigate(['/']);
            });
        }
        
    }

    private validate() {
        return this.name && this.email && this.password && this.confirmPassword && this.password === this.confirmPassword;
    }
  
}
