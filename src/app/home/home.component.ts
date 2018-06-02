import { Component, OnInit } from '@angular/core';
import { MatchDetails } from "./../match/match-details";

import { MockMatchService } from "./../mock-services/mock-match.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = "Vikram's Match Center";
  varTime: string;
  typeOfMatches: any[] = [];
  onGoingMatches: MatchDetails[];
  upComingMatches: MatchDetails[];
  finishedMatches: MatchDetails[];

  constructor(private _matchService: MockMatchService){};

  ngOnInit(): void {
      // this._matchService.createMockMatches();
      this.refresh();
      
  }

  scoreCardClicked(match: MatchDetails){
    console.log(match.matchId);
  }

  refresh(){
    // this.items = ['Live score here', 'recent results here', 'upcoming matches here'];
    this.varTime = Date().toString();
    let tempInstance = this;
    // this._matchService.getAllMatches().then((matches: MatchDetails[])=>{
    //      tempInstance.onGoingMatches = matches;
    //     tempInstance.upComingMatches = matches;
    //     tempInstance.finishedMatches = matches;

    //     tempInstance.typeOfMatches[0] = {"label":"Live", "matches": tempInstance.onGoingMatches};
    //     tempInstance.typeOfMatches[1] = {"label":"Fixtures", "matches": tempInstance.upComingMatches};
    //     tempInstance.typeOfMatches[2] = {"label":"Resuts", "matches": tempInstance.finishedMatches};
    //     console.log("Count of matches: "+ tempInstance.onGoingMatches.length);
    // }).catch(error => {
    //     console.log("Home.component.ts: Unable to get all matches! Error: " + error );
    // });
    let matches: MatchDetails[] = this._matchService.getAllMatches();
    console.log("get all matches in home comp:");
    console.log(matches.length);
    this.onGoingMatches = matches;
    this.upComingMatches = matches;
    this.finishedMatches = matches;

    tempInstance.typeOfMatches[0] = {"label":"Live", "matches": tempInstance.onGoingMatches};
    tempInstance.typeOfMatches[1] = {"label":"Fixtures", "matches": tempInstance.upComingMatches};
    tempInstance.typeOfMatches[2] = {"label":"Resuts", "matches": tempInstance.finishedMatches};
    console.log("Count of matches: "+ tempInstance.onGoingMatches.length);

  }
}
