import { Component, OnInit,OnChanges, SimpleChanges, OnDestroy, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

import { Ball } from "./../ball/ball";
// import { MatchDetails } from "./../../match/match-details";
// import { Team } from "./../../team/team";
import { TotalScore } from "./../total_score/total-score";

//services
// import { MatchService } from "./../../services/match.service";
// import { ScoreService } from "./../../services/score.service";

//mock services
import { MockMatchService } from "./../../mock-services/mock-match.service";
import { MockScoreService } from "./../../mock-services/mock-score.service";
import { Match } from "../../model/match.model";
import { Subscription } from "rxjs";
import { Score } from "../../model/score.model";
import { MockTeamService } from "../../mock-services/mock-team.service";
import { Team } from "../../model/team.model";
import { MockBallService } from "../../mock-services/mock-ball.service";
import { Player } from "../../model/player.model";
import { MockPlayerService } from "../../mock-services/mock-player.service";
import { BallModel } from "../../model/ball.model";

@Component({
    selector : "edit-score",
    templateUrl: "./edit-score.component.html",
    styleUrls: ['./edit-score.component.css'],
    inputs:['match']
})

export class EditScoreComponent implements OnInit, OnDestroy, AfterViewInit {
    currentBall: Ball;
    matchId: string;
    // matchDetails: MatchDetails;
    battingTeam: Team;
    battingScore: Score;
    bowlingTeam: Team;
    bowlingScore: Score;
    previewScore: Score;
    scoreA: Score;
    scoreB: Score;
    teamA: Team;
    teamB: Team;
    currentBallLoaded: boolean = false;

    matchSubscriptoin: Subscription;
    bannerMatchSubscriptoin: Subscription;
    match: Match = null;

    onStrikeBatsman: Player = null;
    nonStrikeBatsman: Player = null;
    bowler: Player = null;
    nonStrickeBatsmanId: string = null;
    onStrickeBatsmanId: string = null;
    bowlerId: string = null;

    selectBatsmanOrBowler: number = 0;
    bannerMatch: Match;
    players: Player[]=[];
    playerSubscription: Subscription;

    thisOverBalls: String[] = [];

    @ViewChild("runToggleEle") tref: ElementRef;

    constructor(private _matchService: MockMatchService, private _scoreService: MockScoreService, 
        private _teamService: MockTeamService, private _ballService: MockBallService,
        private _route: ActivatedRoute, private _playerService: MockPlayerService){}

    ngOnInit(){
        console.log("In edit score component");
        this.matchId = this._route.snapshot.params['matchId'];
        console.log(this.matchId);

        let tempInstance = this;
        
        for(let i = 0; i < 6; i++){
            // let tmpBall: Ball = new Ball();
            this.thisOverBalls.push((i+1).toString());

        }

        try{
            this.matchSubscriptoin.unsubscribe();
            this.bannerMatchSubscriptoin.unsubscribe();
            tempInstance.playerSubscription.unsubscribe();
        }catch(e){
            //do nothing
        }

        this.matchSubscriptoin = this._matchService.getMatch(this.matchId).subscribe(data => {
            tempInstance.match = data;
            console.log("match found");
            tempInstance._teamService.getTeam(data.teamAid).subscribe(teamA => {
                console.log("tea A found");
                tempInstance.teamA = teamA;
                tempInstance._teamService.getTeam(data.teamBid).subscribe(teamB => {
                    console.log("tea B found");
                    tempInstance.teamB = teamB;
                    tempInstance._scoreService.getScore(data.scoreAid).subscribe(scoreA => {
                        console.log("score A found");
                        tempInstance.scoreA = scoreA;
                        tempInstance._scoreService.getScore(data.scoreBid).subscribe(scoreB => {
                            console.log("score B found");
                            tempInstance.scoreB = scoreB;
                            if (tempInstance.scoreA.allBallS.length > 0){
                                let lastBallId = tempInstance.scoreA.allBallS[tempInstance.scoreA.allBallS.length - 1];
                                let lastBall: BallModel = this._ballService.getBall(lastBallId);
                                tempInstance.nonStrickeBatsmanId = lastBall.nonStrickeBatsmanId;
                                tempInstance.onStrickeBatsmanId = lastBall.onStrickeBatsmanId;
                                tempInstance.bowlerId = lastBall.bowlerId;
                                tempInstance.getCurrentPlayersFromId();
                            } else {
                                console.log("Creating new ball");
                            }
                            tempInstance.currentBall = new Ball();
                            tempInstance.currentBallLoaded = true;
                            tempInstance.getCurrentTeam();
                            tempInstance.calculatePreviewScore();
                        });
                    });
                });
            });
        });

        this.playerSubscription = this._playerService.playerSubject.subscribe(data => {
            tempInstance.players = tempInstance._playerService.playersArray;
            tempInstance.getCurrentPlayersFromId();
        });
    }

    ngAfterViewInit(){

    }

    ballTypeToggle(event: any){
        let selectedBallType = event.target.getAttribute("val");
        this.currentBall.ballType.selectProperty(selectedBallType);
        this.calculatePreviewScore();
    }

    wicketToggle(event: any){
        let selectedWicket = event.target.getAttribute("val");
        this.currentBall.wkt.selectProperty(selectedWicket);
        this.calculatePreviewScore();
    }

    runToggle(event: any){
        let selectedRun = event.target.getAttribute("val");
        this.currentBall.run.selectProperty(selectedRun);
        this.calculatePreviewScore();
    }

    calculatePreviewScore(){
        this.previewScore = JSON.parse(JSON.stringify(this.battingScore));

        this.addBall(this.previewScore);
    }

    addBall(score: Score): boolean {
        // score.allBallS.push(this.currentBall);

        score.runs = score.runs + this.currentBall.run.selectedElement.value;
        score.runs = score.runs + (this.currentBall.ballType.selectedElement.value != 'okay' ? 1 : 0);
        score.balls = score.balls + (this.currentBall.ballType.selectedElement.value === 'okay' ? 1 : 0);
        score.wickets = score.wickets + (this.currentBall.wkt.selectedElement.value === 'out' ? 1 : 0);
        score.over = Math.floor(score.balls / 6);
        score.ballsOfCurrentOver = score.balls % 6;

        return true;
    }

    submitCurrentBall() {
        this.addBall(this.battingScore);
        
        let tempInstance = this;
        this._ballService.addBall(this.currentBall, this.match, this.onStrikeBatsman, this.nonStrikeBatsman, this.bowler, 1, 1.2).then(data => {
            console.log("Ball added with id: ", data);
            tempInstance.battingScore.allBallS.push(data);
            tempInstance._scoreService.updateScore(tempInstance.battingScore).then(value => {
                console.log("Score updated");
                tempInstance.currentBall = new Ball();
                tempInstance.calculatePreviewScore();
                console.log(this.tref.nativeElement.textContent);
                tempInstance.tref.nativeElement.firstElementChild.click();
            },reason => {
                console.log("Score update failed: ", reason);
            });
        });
    }

    getCurrentTeam(){
        if (this.scoreA.over < this.match.totalOvers) {
            this.battingTeam =  this.teamA;
            this.battingScore =  this.scoreA;

            this.bowlingTeam =  this.teamB;
            this.bowlingScore =  this.scoreB;
        } else {
            this.battingTeam =  this.teamB;
            this.battingScore =  this.scoreB;

            this.bowlingTeam =  this.teamA;
            this.bowlingScore =  this.scoreA;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    ngOnDestroy(){
        try{
            this.matchSubscriptoin.unsubscribe();
            this.bannerMatchSubscriptoin.unsubscribe();
            this.playerSubscription.unsubscribe();
        }catch(e){
            //do nothing
        }
    }

    selectPlayer(player: Player){
        if (this.selectBatsmanOrBowler == 0) {
            this.onStrikeBatsman = player;
        } else if (this.selectBatsmanOrBowler == 1) {
            this.nonStrikeBatsman = player;
        } else if (this.selectBatsmanOrBowler == 2) {
            this.bowler = player;
        }
    }

    getCurrentPlayersFromId(){
        if (this.onStrickeBatsmanId){
            for (let i = 0; i < this.players.length; i++){
                if (this.onStrickeBatsmanId == this.players[i].id){
                    this.onStrikeBatsman = this.players[i];
                }
            }
        }

        if (this.nonStrickeBatsmanId){
            for (let i = 0; i < this.players.length; i++){
                if (this.nonStrickeBatsmanId == this.players[i].id){
                    this.nonStrikeBatsman = this.players[i];
                }
            }
        }

        if (this.bowlerId){
            for (let i = 0; i < this.players.length; i++){
                if (this.bowlerId == this.players[i].id){
                    this.bowler = this.players[i];
                }
            }
        }
    }

}