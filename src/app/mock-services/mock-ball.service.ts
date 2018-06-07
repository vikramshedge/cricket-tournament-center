import { Injectable } from "@angular/core";

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { BallModel } from "./../model/ball.model";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { Ball } from "../score/ball/ball";
import { Match } from "./../model/match.model";
import { Player } from "./../model/player.model";


@Injectable()
export class MockBallService {

    ballCollection: AngularFirestoreCollection<BallModel>;
    balls: Observable<BallModel[]>;
    ballsDoc: AngularFirestoreDocument<BallModel>;
    ballsArray: BallModel[] = [];

    ballSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    
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

        this.balls.subscribe(data=>{
            tempInstance.ballsArray = data;
            tempInstance.ballSubject.next(1);
        });
    }

    getBalls(){
        return this.balls;
    }

    getBall(ballId: string): BallModel {
        let ball: BallModel = new BallModel();
        for (let i = 0; i < this.ballsArray.length; i++) {
            if (ballId == this.ballsArray[i].id){
                ball = this.ballsArray[i];
            }
        }
        return ball;
    }

    addBall(ball: Ball, match: Match, onStrickeBatsman: Player, nonStrickeBatsman: Player, bowler: Player): Promise<string> {
        let tempInstance = this;
        let newBall: BallModel = {
            id: "defaultId", ballType: ball.ballType.selectedElement.value, 
            runs: ball.run.selectedElement.value, wkt: ball.wkt.selectedElement.value,
            wktType: ball.wktType.selectedElement.value, onStrickeBatsmanId: onStrickeBatsman.id,
            nonStrickeBatsmanId: nonStrickeBatsman.id, bowlerId: bowler.id, matchId: match.id
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