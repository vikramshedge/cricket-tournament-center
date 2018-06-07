import { Injectable } from "@angular/core";
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from "angularfire2/firestore";
import { Match } from "./../model/match.model";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { MockScoreService } from "./mock-score.service";

@Injectable()
export class MockMatchService {

    matchCollection: AngularFirestoreCollection<Match>;
    matches: Observable<Match[]>;
    matchDoc: AngularFirestoreDocument<Match>;
    matchesArray: Match[] = [];

    matchSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    
    constructor(private afs: AngularFirestore, private _scoreService: MockScoreService){
        this.matchCollection = this.afs.collection('matches');

        let tempInstance = this;
        this.matches = this.matchCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Match;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
        
        this.matches.subscribe(data => {
            tempInstance.matchesArray = data;
            tempInstance.matchSubject.next(1);
        });
    }

    getMatches(){
        return this.matches;
    }

    getMatch(matchId: string) {
        // let match: Match;
        let thisMatchDoc: AngularFirestoreDocument<Match> = this.afs.doc<Match>(`matches/${matchId}`);
        let match: Observable<Match> = thisMatchDoc.valueChanges();
        return match;
    }

    getMatchesWithValueChanges(){
        return this.matchCollection.valueChanges();
    }

    addMatch(contestId: string, teamAid: string, teamBid: string, totalOvers: number): Promise<Match> {
        let scoreAid: string; let scoreBid: string;
        let tempInstance = this;
        let match: Match;

        let promise: Promise<Match> = new Promise((resolve, reject)=>{
            this._scoreService.addScore().then(id => {
                scoreAid = id;
                tempInstance._scoreService.addScore().then(id => {
                    scoreBid = id;
                    match  = {id: "default", contestId: contestId, isStarted: false, isEnded: false, scoreAid:scoreAid, scoreBid: scoreBid, summary:"", teamAid: teamAid, teamBid: teamBid, balls: [], time: "", isTeamABatFirst: true, totalOvers: totalOvers};
                    tempInstance.matchCollection.add(match).then(value => {
                        let docId = value.id;
                        match.id = docId;
                        tempInstance.updateMatch(match).then(value => {
                            return resolve(match); 
                        },reason => {
                            return reject(reason);
                        });
                    },reason => {
                        console.log("Create new match error:", reason);
                        reject(reason);
                    });
                }, reason => {
                    reject(reason);
                });
            }, reason => {
                reject(reason);
            });
        });

        return promise;
               
        
    }

    deleteMatch(match: Match){
        this.matchDoc = this.afs.doc(`matches/${match.id}`);
        this.matchDoc.delete();
    }

    updateMatch(match: Match): Promise<boolean> {
        this.matchDoc = this.afs.doc(`matches/${match.id}`);
        let tempInstance = this;
        let promise: Promise<boolean> = new Promise((resolve, reject) => {
            this.matchDoc.update(match).then(value => {
                console.log("Match updated:");
                console.log(value);
                return resolve(true);
            }).then(reason => {
                console.log("Match update rejected");
                console.log(reason);
                return reject(reason);
            });
        });
        return promise;
    }

}