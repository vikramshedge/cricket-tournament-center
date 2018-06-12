import { Component, OnInit,OnChanges, AfterViewInit, SimpleChanges, OnDestroy } from "@angular/core";
import {MockScoreService} from "./../.../../../mock-services/mock-score.service";
import {Score} from "./../../model/score.model";
import { MockTeamService } from "../../mock-services/mock-team.service";
import { Team } from "../../model/team.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Subscription } from "rxjs";
import { BallModel } from "../../model/ball.model";
import { MockBallService } from "../../mock-services/mock-ball.service";

@Component({
  selector: 'score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css'],
  inputs: ['teamId', 'scoreId', 'isPreview', 'previewScore', 'battingTeam']
})

export class ScoreBoardComponent implements OnInit, OnDestroy {
    teamId: string = "NoName";

    // scores: Score[] = [];
    // teams: Team[] = [];
    scoreId: string = "0";
    score: Score;
    team: Team;
    isPreview: boolean = false;
    previewScore: Score;
    battingTeam: Team;
    teamSumbscription: Subscription;
    socreSubscription: Subscription;
    ballSubscription: Subscription;
    

    scoreModel: Score = new Score();

    constructor(private _scoreSercie: MockScoreService, private _teamService: MockTeamService,
        private _ballService: MockBallService, private _route: ActivatedRoute){
        // console.log("score-board.component: constructor: teamId:" + this.teamId + ", scoreId:" + this.scoreId);
    }

    ngOnInit(){
        // console.log("score-board.component: ngOnInit: teamId:" + this.teamId + ", scoreId:" + this.scoreId);
        this.refresh();
    }

    refresh(){
        let tempInstance = this;
        try{
            tempInstance.teamSumbscription.unsubscribe();
            tempInstance.socreSubscription.unsubscribe();
            tempInstance.ballSubscription.unsubscribe
        }catch(e){
            //do nothing
        }

        if (this.isPreview){
            // this.score = this.previewScore;
            // this.team = this.battingTeam;
        } else {
            this.teamSumbscription = this._teamService.teamSubject.subscribe(data => {
                // tempInstance.teams = tempInstance._teamService.teamsArray;
                tempInstance.initialiseTeam();
            });

            this.socreSubscription = this._scoreSercie.scoreSubject.subscribe(data => {
                // tempInstance.scores = tempInstance._scoreSercie.scoresArray;
                tempInstance.initialiseScore();
            });

            this.ballSubscription = this._ballService.ballSubject.subscribe(data => {
                console.log("Ball subject data:", data);
                this.calculateScore();
            })
        }
    }

    initialiseScore(): void {
        // for (let i = 0; i < this.scores.length; i++){
        for (let i = 0; i < this._scoreSercie.scoresArray.length; i++){
            if (this.scoreId == this._scoreSercie.scoresArray[i].id){
                this.score = this._scoreSercie.scoresArray[i];
                this.calculateScore();
            }
        }
    }

    initialiseTeam(): void {
        for (let i = 0; i < this._teamService.teamsArray.length; i++){
            if (this.teamId == this._teamService.teamsArray[i].id){
                this.team = this._teamService.teamsArray[i];
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        // console.log("score-board.component: ngOnChanges");
        if (changes){
            if (changes['teamId']) {
                if (changes['teamId'].currentValue) {
                    this.teamId = changes['teamId'].currentValue;
                    this.initialiseTeam();
                }
            }
            if (changes['scoreId']) {
                if (changes['scoreId'].currentValue) {
                    this.scoreId = changes['scoreId'].currentValue;
                    this.initialiseScore();
                }
            }

            if (changes['isPreview']) {
                if (changes['isPreview'].currentValue) {
                    this.isPreview = changes['isPreview'].currentValue;
                }
            }

            if (changes['previewScore']) {
                if (changes['previewScore'].currentValue) {
                    this.score = changes['previewScore'].currentValue;
                }
            }

            if (changes['battingTeam']) {
                if (changes['battingTeam'].currentValue) {
                    this.team = changes['battingTeam'].currentValue;
                }
            }
        } 
    }

    calculateScore(){
        if (this.score){
            let balls: string[] = this.score.allBallS;
            this.scoreModel = new Score();
            for (let i = 0; i< balls.length; i++){
                for (let j=0; j<this._ballService.ballsArray.length; j++){
                    if (balls[i] == this._ballService.ballsArray[j].id){
                        this.scoreModel.runs += this._ballService.ballsArray[j].runs;
                        this.scoreModel.wickets += (this._ballService.ballsArray[j].wkt == "out" ? 1 : 0);
                        this.scoreModel.over = (this._ballService.ballsArray[j].over > this.scoreModel.over ? this._ballService.ballsArray[j].over : this.scoreModel.over)
                    }
                }
            }
            
            console.log("calculated runs:", this.scoreModel);
        }
    }

    ngOnDestroy(){
        try{
            this.teamSumbscription.unsubscribe();
            this.socreSubscription.unsubscribe();
            this.ballSubscription.unsubscribe();
        }catch(e){
            //do nothing
        }
    }
}