import { Injectable } from "@angular/core";

import { Result } from "./result";
import { TotalScore } from "./../score/total_score/total-score";
import { DbService } from "./db.service";

// import {Observable, Subject} from "rxjs";
@Injectable()
export class ScoreService {

    // private scoreChangedSource = new Subject<TotalScore>();
    // scoreChanged$ = this.scoreChangedSource.asObservable();
    constructor(private _dbService: DbService){}

    createNewScore(): Promise<TotalScore>{
        let tempInstance = this;
        let newScore: TotalScore = new TotalScore();
        let sqlStr: string = "INSERT INTO score_details (runs, wickets, balls, ballsOfCurrentOver, overs) VALUES ('"+newScore.runs+"', '"+newScore.wickets+"', '"+newScore.balls+"', '"+newScore.ballsOfCurrentOver+"', '"+newScore.overs+"')";
        let promise: Promise<TotalScore>  = new Promise(function(resolve, reject) {
            tempInstance._dbService.insert(sqlStr).then( id => {
                newScore.id = id;
                resolve(newScore);
            }).catch(error => {
                console.log("Error in creating score:" + error);
                return reject(error);
            });
        });
        return promise;
    }

    getScore(scoreId: number):Promise<TotalScore> {
        let tempInstance = this;
        let sqlStr = "SELECT * FROM score_details WHERE id = " + scoreId;
        let promise: Promise<TotalScore> = new Promise(function(resolve, reject) {
            tempInstance._dbService.fetch(sqlStr).then((result: Result) => {
                let newScore: TotalScore = new TotalScore();
                newScore.id = scoreId;
                newScore.runs = result.resultSet[0][1];
                newScore.wickets = result.resultSet[0][2];
                newScore.balls = result.resultSet[0][3];
                newScore.ballsOfCurrentOver = result.resultSet[0][4];
                newScore.overs = result.resultSet[0][5];
                return resolve(newScore);
            }).catch(error => {
                return reject(error);
            });
        });
        return promise;
    }

    updateScore(score: TotalScore): Promise<boolean> {
        let tempInstance = this;
        let sqlStr: string = "UPDATE score_details SET runs = "+ score.runs +", wickets = "+score.wickets+", balls = "+score.balls+", ballsOfCurrentOver = "+score.ballsOfCurrentOver+", overs = "+score.overs+" WHERE id = "+score.id+";";
        let promise: Promise<boolean> = new Promise(function(resolve, reject){
            tempInstance._dbService.insert(sqlStr).then(id => {
                return ((id > 0) ? resolve(true) : reject(false));
            }).catch(error=> reject(error));
        });
        return promise;
    }

    scoreChanged(score: TotalScore){
        // Notify score card component
        // this.scoreChangedSource.next(score);
    }
}