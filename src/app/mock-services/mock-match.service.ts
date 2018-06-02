import { Injectable } from "@angular/core";

import { Team } from "./../team/team";
import { TotalScore } from "./../score/total_score/total-score";
import { Result } from "./../services/result";
import { MatchDetails } from "./../match/match-details";

// import { DbService } from "./db.service";
import { MockTeamService } from "./mock-team.service";
import { MockScoreService } from "./mock-score.service";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";

export interface MatchIf { id: number, team_1_id: number, team_2_id: number, score_1_id: number, score_2_id: number, total_over: number, summary: string, time: any, isStarted: boolean, isEnded: boolean}
@Injectable()
export class MockMatchService {

    private sampleLiveMatch: MatchDetails;
    private currentMatches: MatchDetails[] = [];

    matchCollection: AngularFirestoreCollection<MatchIf>;
    // scoreCollection: AngularFirestoreCollection<ScoreIf>;

    // constructor(private _dbService: DbService, private _teamService: TeamService, private _scoreService: ScoreService){}
    constructor(private _teamService:MockTeamService, private _scoreService: MockScoreService, private afs: AngularFirestore){
        this.matchCollection = this.afs.collection('matches');
    }
        
    getSampleMatchDetails(){
        return "";
    }

    createMockMatches(): void {

        let matchCollection = this.afs.collection('matches');

        for (var i=0; i<4; i++){
            let newMatch: MatchIf = {id: i, team_1_id: 0, team_2_id: 1, score_1_id: 0, score_2_id: 1, total_over: 6, summary: "not started", isStarted: false, isEnded: false, time: ""};
            matchCollection.doc(i.toString()).set(newMatch);
        }
        


        // let tempInstance = this;
        // let teamA = new Team();
        // teamA.fullName = "Royal Challegers Banglore";
        // teamA.shortName = "RCB";
        // let teamB = new Team();
        // teamB.fullName = "Chennai Super Kings";
        // teamB.shortName = "CSK";
        
        // this.currentMatches = [];
        // for (let i = 0; i < 3; i++){
        //     this.createNewMatch(teamA, teamB, false).then(matchDetails => {
        //         console.log("Match created: "+ matchDetails.matchId);
        //     }).catch(error => {
        //         console.log("Error in creating match: " + error);
        //     });
        // }         
    }

    createNewMatch(teamA: Team, teamB: Team, matchStarted: boolean): Promise<MatchDetails>{
        let tempInstance = this;
        let scoreA: TotalScore, scoreB: TotalScore;
        
        let promise: Promise<MatchDetails>  = new Promise(function(resolve, reject) {
            tempInstance._scoreService.createNewScore().then((score: TotalScore) => {
                scoreA = score;
                tempInstance._scoreService.createNewScore().then((score: TotalScore)=>{
                    scoreB = score;
                    let matchId = tempInstance.currentMatches.length;
                    let newMatch: MatchDetails = new MatchDetails(matchId,teamA, teamB,scoreA, scoreB, matchStarted, false);
                    tempInstance.currentMatches[matchId] = newMatch;
                    return resolve(newMatch);
                }).catch(error => reject(error));
            }).catch(error => reject(error));
        });
        return promise;
    }

    getMatch(matchId: number): Promise<MatchDetails> {
        let tempInstance = this;
        let promise: Promise<MatchDetails> = new Promise(function(resolve, reject){
            let match: MatchDetails = tempInstance.currentMatches[matchId];
            return resolve(match);
        });
        return promise;
    }

    getAllMatches(): MatchDetails[] {
        let tempInstance = this;

        this.matchCollection.valueChanges().subscribe(data => {
            // console.log("In get all matches, subscribe:");
            // console.log(data);
        });
        let matches: MatchDetails[] = [];

        this.matchCollection.valueChanges().forEach(data => {
            console.log("In get all matches, forEach:");
            console.log(data[0].id);
            for (var i = 0; i < data.length; i++) {
                let teamA: Team = this._teamService.getTeam(data[i].team_1_id);
                let teamB: Team = this._teamService.getTeam(data[i].team_2_id);
                let scoreA: TotalScore = this._scoreService.getScore(data[i].score_1_id);
                let scoreB: TotalScore = this._scoreService.getScore(data[i].score_2_id);
                console.log("teamB.fullName:" + teamB.fullName + ">");
                let newMatch: MatchDetails = new MatchDetails(data[i].id, teamA, teamB, scoreA, scoreB, data[i].isStarted, data[i].isEnded );
                matches.push(newMatch);
            }
        });

        console.log("returning matches:");
        console.log(matches.length);
        return matches;

        // let promise: Promise<MatchDetails[]> = new Promise(function(resolve, reject){
        //     let matches: MatchDetails[] = tempInstance.currentMatches;
        //     return resolve(matches);
        // });
        // return promise;
    }
}