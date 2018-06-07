import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Player } from "./../model/player.model";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class MockPlayerService {

  playerCollection: AngularFirestoreCollection<Player>;
  players: Observable<Player[]>;
  playerDoc: AngularFirestoreDocument<Player>;
  playersArray: Player[] = [];
  playersMockArray: any[] = [
    {id:"ytungare", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"ranjemis", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"atoply", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"shobhkum", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"akshsha2", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"abkurup", outOrNot: "Not out", ballsFaced: 0, overs: 0, email: "abkurup@cisco.com"},
{id:"ashwipra", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"rishiksi", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"sasuryva", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"deveshku", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"amalawad", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"smanjare", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"kumasaur", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"bikbeher", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"Chichauh", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"alakka", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"tejagtap", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"atayshet", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"abrahang", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"pathakka", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"hsadapha", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"saketku", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"amalawad", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"manmantr", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"suramcha", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"pratikhe", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"vgondane", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"ashishk6", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"abhbisht", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"bchhatri", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"rajpati2", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"abhdixit", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"Askhande", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"anawagh", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"gnandosk", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"vipanick", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"sawasthi", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"vshedge", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"hbomble", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"kdange", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"bborse", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"sunagle", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"mahsoni", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"mukhandw", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"szokande", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"sreeknai", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"sunchava", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"akshsinh", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"nshanku", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"rdawooda", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"Pbhopi", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"shipawar", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"ravshin", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"jugeorg", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"smorya", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"dpamecha", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"hansari", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"sumane", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"ranjemis", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"vtangudu", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"bjadon", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"sajjacob", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"nvaradpa", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"namameht", outOrNot: "Not out", ballsFaced: 0, overs: 0},
{id:"avedwal", outOrNot: "Not out", ballsFaced: 0, overs: 0}
  ];


    playerSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    
    constructor(private afs: AngularFirestore){
        this.playerCollection = this.afs.collection('players');

        let tempInstance = this;
        this.players = this.playerCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Player;
                // const id = a.payload.doc.id;
                // return {id, ...data};
                return data;
            }))
        );

        this.players.subscribe(data=>{
            tempInstance.playersArray = data;
            tempInstance.playerSubject.next(1);
        });

        //Adding all mocks players to db
        // for (let i = 0; i< this.playersMockArray.length; i++) {
        //   this.updatePlayer(this.playersMockArray[i]).then(value => {
        //     console.log("Added");
        //   }, reason => {
        //     console.log("Player adding failed: ", reason);
        //   });
        // }
    }

    getPlayers(){
        return this.players;
    }

    getPlayer(playerId: string) {
        // let match: Match;
        let thisPlayerDoc: AngularFirestoreDocument<Player> = this.afs.doc<Player>(`players/${playerId}`);
        let player: Observable<Player> = thisPlayerDoc.valueChanges();
        return player;
    }

    addPlayer(player: Player): Promise<string> {
        let tempInstance = this;
        // let player: Player = {allBallS: [], balls: 0, ballsOfCurrentOver: 0, id: "defaultId", wickets: 0, overs: 0, runs: 0};
        let promise: Promise<string> = new Promise((resolve, reject)=>{
          tempInstance.playerCollection.doc(player.id.toString()).set(player).then(value => {
                console.log("Player added:", player.id);
            }, reason => {
                console.log("create new player error:", reason);
                return reject(reason);
            });
        });
        return promise;        
    }

    deletePlayer(player: Player){
        this.playerDoc = this.afs.doc(`players/${player.id}`);
        this.playerDoc.delete();
    }

    updatePlayer(player: Player): Promise<boolean> {
        this.playerDoc = this.afs.doc(`players/${player.id}`);
        let tempInstance = this;
        let promise: Promise<boolean> = new Promise((resolve, reject)=>{
            tempInstance.playerDoc.update(player).then(value => {
                console.log("player updated successfully.");
                return resolve(true);
            }, reason => {
                console.log("player update failed:", reason);
                return reject(false);
            });
        });
        return promise;
    }

    getPlayersWithValueChanges(){
        return this.playerCollection.valueChanges();
    }
}
