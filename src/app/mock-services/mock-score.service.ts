import { Injectable } from "@angular/core";

import { Result } from "./../services/result";
import { TotalScore } from "./../score/total_score/total-score";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
// import { DbService } from "./db.service";

// import {Observable, Subject} from "rxjs";
@Injectable()
export class MockScoreService {

    // private scoreChangedSource = new Subject<TotalScore>();
    // scoreChanged$ = this.scoreChangedSource.asObservable();
    private currentScores: TotalScore[] = [];
    scoreCollection: AngularFirestoreCollection<TotalScore>;
    
    constructor(private afs: AngularFirestore){

    }

    createNewScore(): Promise<TotalScore>{
        let tempInstance = this;
        let promise: Promise<TotalScore>  = new Promise(function(resolve, reject) {
            let newScore: TotalScore = new TotalScore();
            newScore.id = tempInstance.currentScores.length;
            tempInstance.currentScores[newScore.id] = newScore;
            resolve(newScore);
        });
        return promise;
    }

    getScore(scoreId: number): TotalScore {
        let newScore: TotalScore;
        this.afs.collection('teams').doc(scoreId.toString()).valueChanges().forEach(data => {
            newScore = new TotalScore();
            newScore.id = data[0].id;
            newScore.allBallS = data[0].allBallS;
            newScore.runs = data[0].runs;
            newScore.wickets = data[0].wickets;
            newScore.balls = data[0].balls;
            newScore.ballsOfCurrentOver = data[0].ballsOfCurrentOver;
            newScore.overs = data[0].overs;
        });
        return newScore;

        // let tempInstance = this;
        // let promise: Promise<TotalScore> = new Promise(function(resolve, reject) {
        //     let newScore = tempInstance.currentScores[scoreId];
        //     return resolve(newScore);
        // });
        // return promise;
    }

    updateScore(score: TotalScore): Promise<boolean> {
        let tempInstance = this;
        let promise: Promise<boolean> = new Promise(function(resolve, reject){
            let newScore = tempInstance.currentScores[score.id];
            newScore.runs = score.runs;
            newScore.wickets = score.wickets;
            newScore.balls = score.balls;
            newScore.ballsOfCurrentOver = score.ballsOfCurrentOver;
            newScore.overs = score.overs;
            resolve(true);
        });
        return promise;
    }

    scoreChanged(score: TotalScore){
        // Notify score card component
        // this.scoreChangedSource.next(score);
    }
}