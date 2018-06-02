import { Component, OnInit,OnChanges, SimpleChanges } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

import { Ball } from "./../ball/ball";
import { MatchDetails } from "./../../match/match-details";
import { Team } from "./../../team/team";
import { TotalScore } from "./../total_score/total-score";

//services
// import { MatchService } from "./../../services/match.service";
// import { ScoreService } from "./../../services/score.service";

//mock services
import { MockMatchService } from "./../../mock-services/mock-match.service";
import { MockScoreService } from "./../../mock-services/mock-score.service";

@Component({
    selector : "edit-score",
    templateUrl: "./edit-score.component.html",
    styleUrls: ['./edit-score.component.css']
})

export class EditScoreComponent implements OnInit {
    currentBall: Ball;
    matchId: number;
    matchDetails: MatchDetails;
    battingTeam: Team;
    battingScore: TotalScore;
    bowlingTeam: Team;
    bowlingScore: TotalScore;
    previewScore: TotalScore;

    thisOverBalls: String[] = [];

    constructor(private _matchService: MockMatchService, private _scoreService: MockScoreService, private route: ActivatedRoute){}

    ngOnInit(){
        console.log("In edit score component");
        this.matchId = this.route.snapshot.params['matchId'];
        
        // for dev purpose
        for(let i = 0; i < 6; i++){
            let tmpBall: Ball = new Ball();
            this.thisOverBalls.push(i.toString());
        }

        let tempInstance = this;
        let tmpVar = this._matchService.getMatch(this.matchId).then((match: MatchDetails)=>{
            tempInstance.matchDetails = match;
            
            if (tempInstance.matchDetails.balls.length > 0) {
                tempInstance.currentBall = tempInstance.matchDetails.balls[tempInstance.matchDetails.balls.length-1];
            } else {
                console.log("Creating new ball");
                tempInstance.currentBall = new Ball();
            }

            tempInstance.getCurrentTeam();
            tempInstance.calculatePreviewScore();
        }).catch(error => {
            console.log("Unable to get match details in edit score: "+error);
        });
    }

    ballTypeToggled(event: any){
        this.calculatePreviewScore();
    }

    wicketToggled(event: any){
        this.calculatePreviewScore();
    }

    runToggled(event: any){
        this.calculatePreviewScore();
    }

    calculatePreviewScore(){
        this.previewScore = new TotalScore();
        this.previewScore.balls = this.battingScore.balls;
        this.previewScore.ballsOfCurrentOver = this.battingScore.ballsOfCurrentOver;
        this.previewScore.overs = this.battingScore.overs;
        this.previewScore.runs = this.battingScore.runs;
        this.previewScore.wickets = this.battingScore.wickets;

        this.previewScore.addBall(this.currentBall);
    }

    submitCurrentBall() {
        this.battingScore.addBall(this.currentBall);
        this._scoreService.updateScore(this.battingScore);
        this.currentBall = new Ball();
        this.calculatePreviewScore();
    }

    getCurrentTeam(){
        if (this.matchDetails.scoreA.overs < this.matchDetails.totalOver) {
            this.battingTeam =  this.matchDetails.teamA;
            this.battingScore =  this.matchDetails.scoreA;

            this.bowlingTeam =  this.matchDetails.teamB;
            this.bowlingScore =  this.matchDetails.scoreB;
        } else {
            this.battingTeam =  this.matchDetails.teamB;
            this.battingScore =  this.matchDetails.scoreB;

            this.bowlingTeam =  this.matchDetails.teamA;
            this.bowlingScore =  this.matchDetails.scoreA;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
    }
}