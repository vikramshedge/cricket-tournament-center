import { Injectable } from "@angular/core";

import { Team } from "./../team/team";
import { TotalScore } from "./../score/total_score/total-score";
import { Result } from "./../services/result";
import { MatchDetails } from "./../match/match-details";

// import { DbService } from "./db.service";
import { MockScoreService } from "./mock-score.service";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";

export interface TeamInterface { id: number, fullname: string, shortname: string, players: any[]}
@Injectable()
export class MockTeamService {

    teamCollection: AngularFirestoreCollection<Team>;

    constructor(private afs: AngularFirestore){
        this.teamCollection = this.afs.collection('teams');
    }

    getTeam(id: number): Team {
        let newTeam: Team;
        this.teamCollection.doc(id.toString()).valueChanges().forEach(data => {
            newTeam = new Team(id, data[0].fullname, data[0].shortname, data[0].players);
        });
        return newTeam;
    }
}
