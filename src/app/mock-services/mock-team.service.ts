import { Injectable } from "@angular/core";
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from "angularfire2/firestore";
import { Team } from "./../model/team.model";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class MockTeamService {


    teamCollection: AngularFirestoreCollection<Team>;
    teams: Observable<Team[]>;
    teamDoc: AngularFirestoreDocument<Team>;
    teamsArray: Team[]=[];

    teamSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    
    constructor(private afs: AngularFirestore){
        this.teamCollection = this.afs.collection('teams');

        let tempInstance = this;
        this.teams  = this.teamCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Team;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );

        this.teams.subscribe(data=>{
            tempInstance.teamsArray = data;
            tempInstance.teamSubject.next(1);
        });
    }

    getTeams(){
        return this.teams;
    }

    getTeam(teamId: string) {
        // let match: Match;
        let thisTeamDoc: AngularFirestoreDocument<Team> = this.afs.doc<Team>(`teams/${teamId}`);
        let team: Observable<Team> = thisTeamDoc.valueChanges();
        return team;
    }

    addTeam(team: Team){
        this.teamCollection.add(team);
    }

    deleteTeam(team: Team){
        this.teamDoc = this.afs.doc(`teames/${team.id}`);
        this.teamDoc.delete();
    }

    updateTeam(team: Team){
        this.teamDoc = this.afs.doc(`teames/${team.id}`);
        this.teamDoc.update(team);
    }

    getTeamsWithValueChanges(){
        return this.teamCollection.valueChanges();
    }

}
