import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-tournament',
	templateUrl: './tournament.component.html',
	styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

    espnId: string;
    tierAGolfers: string;

	constructor() { }

	ngOnInit() {
	}

	espnIdChange() {

    }

    golfersChanges(tier) {

    }
    
    submit() {

    }

}
