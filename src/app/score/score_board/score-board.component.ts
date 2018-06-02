import { Component, OnInit,OnChanges, AfterViewInit, SimpleChanges, OnDestroy } from "@angular/core";
import {MockScoreService} from "./../.../../../mock-services/mock-score.service";
import {Score} from "./../../mock-services/score.model";
import { MockTeamService } from "../../mock-services/mock-team.service";
import { Team } from "../../mock-services/team.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: 'score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css'],
  inputs: ['teamId', 'scoreId', 'isPreview', 'previewScore', 'battingTeam']
})

export class ScoreBoardComponent implements OnInit, OnDestroy {
    teamId: string = "NoName";

    scores: Score[] = [];
    teams: Team[] = [];
    scoreId: string = "0";
    score: Score;
    team: Team;
    isPreview: boolean = false;
    previewScore: Score;
    battingTeam: Team;
    teamSumbscription: Subscription;
    socreSubscription: Subscription;

    constructor(private _scoreSercie: MockScoreService, private _teamService: MockTeamService, private _route: ActivatedRoute){
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
            // tempInstance.scoreSubjectSubscription.unsubscribe();
        }catch(e){
            //do nothing
        }

        if (this.isPreview){
            // this.score = this.previewScore;
            // this.team = this.battingTeam;
        } else {
            this.teamSumbscription = this._teamService.teamSubject.subscribe(data => {
                tempInstance.teams = tempInstance._teamService.teamsArray;
                tempInstance.initialiseTeam();
            });

            this.socreSubscription = this._scoreSercie.scoreSubject.subscribe(data => {
                tempInstance.scores = tempInstance._scoreSercie.scoresArray;
                tempInstance.initialiseScore();
            });
        }
    }

    initialiseScore(): void {
        for (let i = 0; i < this.scores.length; i++){
            if (this.scoreId == this.scores[i].id){
                this.score = this.scores[i];
            }
        }
    }

    initialiseTeam(): void {
        for (let i = 0; i < this.teams.length; i++){
            if (this.teamId == this.teams[i].id){
                this.team = this.teams[i];
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

    ngOnDestroy(){
        try{
            this.teamSumbscription.unsubscribe();
            this.socreSubscription.unsubscribe();
            // this.scoreSubjectSubscription.unsubscribe();
        }catch(e){
            //do nothing
        }
    }
}