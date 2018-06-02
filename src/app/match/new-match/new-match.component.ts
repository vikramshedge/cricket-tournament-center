import { Component, OnInit, AfterViewInit, ViewContainerRef } from "@angular/core";
import { Router, ActivatedRoute, Params, ParamMap } from "@angular/router";
import {switchMap} from 'rxjs/operators';

// import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";

// import { ModalViewComponent } from "./../../modal/modal-view.component";

import { MatchDetails } from "./../match-details";
import { TotalScore } from "./../../score/total_score/total-score";
import { Team } from "./../../team/team";

// import { DbService } from "./../services/db.service";
// import { ScoreService } from "./../services/score.service";
// import { MatchService } from "./../services/match.service";

// Mock service
import { MockScoreService } from "./../../mock-services/mock-score.service";
import { MockMatchService } from "./../../mock-services/mock-match.service";

@Component({
    selector: "new-match",
    templateUrl: "./new-match.component.html",
    styleUrls: ['./new-match.component.css']
})

export class NewMatchComponent implements OnInit, AfterViewInit {

    matchDetails: MatchDetails;
    teamA: Team;
    teamB: Team;
    scoreA: TotalScore;
    scoreB: TotalScore;
    teams: Team[]=[];
    cbValue: boolean[]= new Array(8);
    
    constructor(private router: Router, private _scoreService: MockScoreService,
        private _matchService: MockMatchService, private vcRef: ViewContainerRef, private route: ActivatedRoute){

    }
    
    ngOnInit() {
        //create sample team
        for (let i = 0; i<8; i++){
            let tmpTeam: Team = new Team(i,"","",[]);
            tmpTeam.id = i;
            tmpTeam.fullName = "Sample team " + (i+1);
            tmpTeam.shortName = "Team-" + (i+1);
            this.teams[i] = tmpTeam;
        }
        console.log("In new match component");
        let data = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
            console.log("Edit score: activatedRouteParams: ");
            return params['data'];
        }));
        // console.log(data);        
        
    }

    teamListSelectionChange(eventObj: any){
        console.log(eventObj.target.checked);
        console.log(this.cbValue);
        this.selectTeams();
    }

    selectTeams() {
        let team: Team;
        this.teamA = null; this.teamB = null;
        let k = 0;
        for (let i = 0; i<this.teams.length; i++){
            if (this.cbValue[i]){
                this.teamA = this.teams[i]
                k = i;
                break;
            }
        }

        if (this.teamA){
            for (let i = k+1; i<this.teams.length; i++){
                if (this.cbValue[i]){
                    this.teamB = this.teams[i]
                    break;
                }
            }
        }
    }

    ngAfterViewInit() {
        // this.refreshTeams();
    }

    submit(isStart: boolean) {
        if (this.teamA == null || this.teamB == null) {
            alert("Please select the teams!");
            return 0;
        }

        if (this.teamA.shortName == this.teamB.shortName) {
            alert("TEam A & Team B can not be same");
            return 0;
        }

        this.createNewMatch(isStart);
    }

    createNewMatch(isStart: boolean){
        let tempInstance = this;
        this._matchService.createNewMatch(tempInstance.teamA, tempInstance.teamB, true).then(matchDetails => {
            tempInstance.matchDetails = matchDetails;
            console.log("Match created, id: "+ matchDetails.matchId);
            if (isStart){
                tempInstance.router.navigate(["edit_score", {"data":matchDetails}]);
            }
        }).catch(error => {
            console.log("Error in creating match: " + error);
        });
    }

    cancel(){
    }

}