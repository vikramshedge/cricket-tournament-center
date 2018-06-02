import { Injectable } from "@angular/core";

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Score } from "./score.model";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class MockScoreService {

    scoreCollection: AngularFirestoreCollection<Score>;
    scores: Observable<Score[]>;
    scoreDoc: AngularFirestoreDocument<Score>;
    scoresArray: Score[] = [];

    scoreSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    
    constructor(private afs: AngularFirestore){
        this.scoreCollection = this.afs.collection('scores');

        let tempInstance = this;
        this.scores = this.scoreCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Score;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );

        this.scores.subscribe(data=>{
            tempInstance.scoresArray = data;
            tempInstance.scoreSubject.next(1);
        });
    }

    getScores(){
        return this.scores;
    }

    getScore(scoreId: string) {
        // let match: Match;
        let thisScoreDoc: AngularFirestoreDocument<Score> = this.afs.doc<Score>(`scores/${scoreId}`);
        let score: Observable<Score> = thisScoreDoc.valueChanges();
        return score;
    }

    addScore(): Promise<string> {
        let tempInstance = this;
        let score: Score = {allBallS: [], balls: 0, ballsOfCurrentOver: 0, id: "defaultId", wickets: 0, overs: 0, runs: 0};
        let promise: Promise<string> = new Promise((resolve, reject)=>{
            tempInstance.scoreCollection.add(score).then(value => {
                let docId = value.id;
                score.id = docId;
                tempInstance.updateScore(score).then(value=>{
                    return resolve(docId);
                },reason => {
                    return reject(reason);
                });
            }, reason => {
                console.log("create new score error:", reason);
                return reject(reason);
            });
        });
        return promise;        
    }

    deleteScore(score: Score){
        this.scoreDoc = this.afs.doc(`scores/${score.id}`);
        this.scoreDoc.delete();
    }

    updateScore(score: Score): Promise<boolean> {
        this.scoreDoc = this.afs.doc(`scores/${score.id}`);
        let tempInstance = this;
        let promise: Promise<boolean> = new Promise((resolve, reject)=>{
            tempInstance.scoreDoc.update(score).then(value => {
                console.log("score updated successfully.");
                return resolve(true);
            }, reason => {
                console.log("score update failed:", reason);
                return reject(false);
            });
        });
        return promise;
    }

    getScoresWithValueChanges(){
        return this.scoreCollection.valueChanges();
    }

}