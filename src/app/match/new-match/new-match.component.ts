import { Component, OnInit, AfterViewInit, ViewContainerRef, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, Params, ParamMap } from "@angular/router";
import {switchMap} from 'rxjs/operators';

// import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";

// import { ModalViewComponent } from "./../../modal/modal-view.component";

import { MatchDetails } from "./../match-details";
import { TotalScore } from "./../../score/total_score/total-score";

// import { DbService } from "./../services/db.service";
// import { ScoreService } from "./../services/score.service";
// import { MatchService } from "./../services/match.service";

// Mock service
import { MockScoreService } from "./../../mock-services/mock-score.service";
import { MockMatchService } from "./../../mock-services/mock-match.service";
import { Subscription } from "rxjs";
import { MockTeamService } from "../../mock-services/mock-team.service";
import { Team } from "../../mock-services/team.model";
import { Match } from "../../mock-services/match.model";

@Component({
    selector: "new-match",
    templateUrl: "./new-match.component.html",
    styleUrls: ['./new-match.component.css']
})

export class NewMatchComponent implements OnInit, AfterViewInit, OnDestroy {

    matchDetails: MatchDetails;
    // contest: any = {id: "demo"};
    teamA: Team;
    teamB: Team;
    scoreA: TotalScore;
    scoreB: TotalScore;
    teams: Team[]=[];
    cbValue: boolean[]= new Array(8);
    teamSubscription: Subscription;
    contest: any = {id: "demo", totalOvers: 6};

    constructor(private router: Router, private _scoreService: MockScoreService, private _teamService: MockTeamService,
        private _matchService: MockMatchService, private vcRef: ViewContainerRef, private route: ActivatedRoute){

    }
    
    ngOnInit() {

        let tempInstance = this;
        try {
            tempInstance.teamSubscription.unsubscribe();
        }catch (ex){
            // do nothing
        }

        // this.teamSubscription = this._teamService.getTeams().subscribe(data => {
        //     this.teams = data;
        // });

        this.teamSubscription = this._teamService.teamSubject.subscribe(data => {
            tempInstance.teams = tempInstance._teamService.teamsArray;
        });
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

        this.createNewMatch(isStart);
    }

    createNewMatch(isStart: boolean){
        let tempInstance = this;
        let newMatch: Match;
        this._matchService.addMatch(this.contest.id, this.teamA.id, this.teamB.id, this.contest.totalOvers).then((match: Match) => {
            console.log("match created with id: ", match.id);
            if (isStart){
                tempInstance.router.navigate(["/edit-score", match.id]);
            } else {
                tempInstance.router.navigate(["/home"]);
            }
        });
    }

    cancel(){
    }

    ngOnDestroy(){
        try{
            this.teamSubscription.unsubscribe();
        }catch(e){
            //do nothing
        }
    }

}