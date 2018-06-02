import { Component, OnInit,OnChanges, SimpleChanges } from "@angular/core";
import {TotalScore} from "./../total_score/total-score";
// import {Subscription} from "rxjs";
// import {ScoreService}     from "./../.../../../services/score.service";
import {MockScoreService} from "./../.../../../mock-services/mock-score.service";

@Component({
  selector: 'score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css'],
  inputs: ['teamName', 'totalScore']
})

export class ScoreBoardComponent implements OnInit {
    teamName: string = "NoName";
    runs: string = "0";
    wickets: string = "0";
    overs: string = "0";
    balls: string = "0";

    totalScore: TotalScore;

    // scoreChangedSubscription: Subscription;
    
    // constructor(private _scoreSercie: ScoreService){}
    constructor(private _scoreSercie: MockScoreService){}


    ngOnInit(){
        // this.scoreChangedSubscription = this._scoreSercie.scoreChanged$.subscribe((score: TotalScore) => {
        //     this.totalScore = score;
        // });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes){
            if (changes['teamName']) {
                if (changes['teamName'].currentValue) {
                    this.teamName = changes['teamName'].currentValue;
                }
            }
            if (changes['runs']) {
                if (changes['runs'].currentValue) {
                    this.runs = changes['runs'].currentValue;
                }
            }
            if (changes['overs']) {
                if (changes['overs'].currentValue) {
                    this.overs = changes['overs'].currentValue;
                }
            }
            if (changes['wickets']) {
                if (changes['wickets'].currentValue) {
                    this.wickets = changes['wickets'].currentValue;
                }
            }
            if (changes['balls']) {
                if (changes['balls'].currentValue) {
                    this.balls = changes['balls'].currentValue;
                }
            }
        } 
    }
}
