import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { MatchDetails } from "./match/match-details";

import { MockMatchService } from "./mock-services/mock-match.service";
import { Team } from './team/team';
import { TotalScore } from './score/total_score/total-score';
import { MockScoreService } from './mock-services/mock-score.service';

import { Observable } from 'rxjs';

interface MatchIF {
  id: number,
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Vikram's Match Center";
  varTime: string;
  onGoingMatches: MatchDetails[];
  upComingMatches: MatchDetails[];
  finishedMatches: MatchDetails[];
  teamA: Team; teamB: Team;
  score: TotalScore;
  match: MatchDetails;
  matches: MatchDetails[] = [];

  matchCollection: AngularFirestoreCollection<MatchIF>;
  fireMatches: Observable<MatchIF[]>;
  fireSnapShot: Observable<any[]>;

  constructor(private _matchService: MockMatchService, private afs: AngularFirestore){}

  ngOnInit(): void {
    // this._matchService.createMockMatches();

    this.matchCollection = this.afs.collection('matches');
    this.fireMatches = this.matchCollection.valueChanges();
    // let fireSnapShot = this.matchCollection.ref.doc('InvGNtiBsuj10kLHXlsG').id ;//.snapshotChanges();
    // console.log("fireSnapShot:");console.log(fireSnapShot);
    let tempInstance = this;
    this.matchCollection.ref.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id);//, " => ", doc.data());
            if (Number(doc.id) > 4){
              console.log("Dalete this");
              tempInstance.matchCollection.ref.doc(doc.id).delete().then(function(){
                console.log("deleted");
              },
              function(err){
                console.log("not deleted");
              });
            }
        });
    });

    // this.afs.doc<MatchIF>('matches/M2TUfd0cyfkDjnYoT8i8') //z0sXDIYQi3SpP1B5Evui

    console.log("Fire matches:");
    console.log(this.fireMatches);
  }
  
}
