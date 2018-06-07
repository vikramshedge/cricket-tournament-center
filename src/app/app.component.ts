import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { MatchDetails } from "./match/match-details";

import { MockMatchService } from "./mock-services/mock-match.service";
import { Team } from './team/team';
import { TotalScore } from './score/total_score/total-score';
import { MockScoreService } from './mock-services/mock-score.service';

import { Observable } from 'rxjs';
import { Match } from './model/match.model';
import { MockBallService } from './mock-services/mock-ball.service';

interface MatchIF {
  id: number,
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Vikram's Match Center";
  varTime: string;
  onGoingMatches: MatchDetails[];
  upComingMatches: MatchDetails[];
  finishedMatches: MatchDetails[];
  teamA: Team; teamB: Team;
  score: TotalScore;
  match: MatchDetails;
  // matches: MatchDetails[] = [];

  matchCollection: AngularFirestoreCollection<MatchIF>;
  fireMatches: Observable<Match[]>;
  matches: Match[]

  constructor(private _matchService: MockMatchService, private _ballService: MockBallService,
     private afs: AngularFirestore){}

  ngOnInit(): void {
    /*
    this._matchService.getMatches().subscribe( data => {
      this.matches = data;
    });
    */
  }
  
}
