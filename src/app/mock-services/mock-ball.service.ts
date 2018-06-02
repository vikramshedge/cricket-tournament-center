import { Injectable } from "@angular/core";

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { BallModel } from "./ball.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Ball } from "../score/ball/ball";
import { Match } from "./match.model";
import { Player } from "./player.model";


@Injectable()
export class MockBallService {

    ballCollection: AngularFirestoreCollection<BallModel>;
    balls: Observable<BallModel[]>;
    ballsDoc: AngularFirestoreDocument<BallModel>;
    ballsArray: BallModel[] = [];
    
    constructor(private afs: AngularFirestore){
        this.ballCollection = this.afs.collection('balls');

        let tempInstance = this;
        this.balls = this.ballCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as BallModel;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );

        // this.scores.subscribe(data=>{
        //     tempInstance.scoresArray = data;
        // });
    }

    getBalls(){
        return this.balls;
    }

    getBall(ballId: string) {
        // let match: Match;
        let thisBallDoc: AngularFirestoreDocument<BallModel> = this.afs.doc<BallModel>(`balls/${ballId}`);
        let ball: Observable<BallModel> = thisBallDoc.valueChanges();
        return ball;
    }

    addBall(ball: Ball, match: Match, batsman: Player, bowler: Player): Promise<string> {
        let tempInstance = this;
        let newBall: BallModel = {
            id: "defaultId", ballType: ball.ballType.selectedElement.value, 
            runs: ball.run.selectedElement.value, wkt: ball.wkt.selectedElement.value,
            batsmanId: batsman.id, bowlerId: bowler.id, matchId: match.id
        };
        let promise: Promise<string> = new Promise((resolve, reject)=>{
            this.ballCollection.add(newBall).then(value => {
                let docId = value.id;
                newBall.id = docId;
                tempInstance.updateBall(newBall).then(value=>{
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

    deleteBall(ball: BallModel){
        let ballDoc = this.afs.doc(`balls/${ball.id}`);
        ballDoc.delete();
    }

    updateBall(ball: BallModel): Promise<boolean> {
        let ballDoc = this.afs.doc(`balls/${ball.id}`);
        let tempInstance = this;
        let promise: Promise<boolean> = new Promise((resolve, reject)=>{
            ballDoc.update(ball).then(value => {
                console.log("ball updated successfully.");
                return resolve(true);
            }, reason => {
                console.log("ball update failed:", reason);
                return reject(false);
            });
        });
        return promise;
    }

    getBallWithValueChanges(){
        return this.ballCollection.valueChanges();
    }

}