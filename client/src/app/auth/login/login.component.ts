import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

    email: string;
    password: string;

    constructor(private route: Router, private authService: AuthService) {}

    ngOnInit(): void {
     
    }

    login() {
        this.authService.login(this.email, this.password).subscribe((user) => {
            this.route.navigate(['/']);
        });
    }
  
}
