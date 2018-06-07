import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockMatchService } from '../../mock-services/mock-match.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from '../../model/match.model';
import { MockPlayerService } from '../../mock-services/mock-player.service';
import { Player } from '../../model/player.model';
import { MockTeamService } from '../../mock-services/mock-team.service';
import { Team } from '../../model/team.model';

@Component({
  selector: 'app-full-score-card',
  templateUrl: './full-score-card.component.html',
  styleUrls: ['./full-score-card.component.css']
})
export class FullScoreCardComponent implements OnInit, OnDestroy {

  matchSubscriptoin: Subscription;
  playerSubscription: Subscription;
  teamSumbscription: Subscription;

  matchId: string;
  match: Match;
  players: Player[] = []
  teamAplayers: Player[] = [];
  teamBplayers: Player[] = []
  teamA: Team = new Team();
  teamB: Team = new Team();

  constructor(private _matchService: MockMatchService, private _route: ActivatedRoute,
          private _router: Router, private _playerService: MockPlayerService, private _teamService: MockTeamService) { }

  ngOnInit() {
    this.matchId = this._route.snapshot.params['matchId'];
    // this.matchId = "L0WT3vZowcQecnarGJCP";
    console.log(this.matchId);

    let tempInstance = this;

    try{
        this.matchSubscriptoin.unsubscribe();
        this.playerSubscription.unsubscribe();
        this.teamSumbscription.unsubscribe();
    }catch(e){
        //do nothing
    }

    this.matchSubscriptoin = this._matchService.getMatch(this.matchId).subscribe(data => {
        tempInstance.match = data;
        console.log("match found");
        tempInstance.teamSumbscription = this._teamService.getTeam(data.teamAid).subscribe(team => {
          tempInstance.teamA = team;
          tempInstance._teamService.getTeam(data.teamBid).subscribe(team => {
            tempInstance.teamB = team;
          });
        });
    });

    this.playerSubscription = this._playerService.playerSubject.subscribe(data => {
      tempInstance.players = tempInstance._playerService.playersArray;
      tempInstance.teamAplayers = tempInstance.players.slice(0,4);
      tempInstance.teamBplayers = tempInstance.players.slice(10,13);
    });

  }

  editMatch() {
    this._router.navigate(["/edit-score", this.match.id]);
  }

  ngOnDestroy(){
    try{
      this.matchSubscriptoin.unsubscribe();
      this.playerSubscription.unsubscribe();
      this.teamSumbscription.unsubscribe();
    }catch(e){
      // do nothing
    }
  }

}
