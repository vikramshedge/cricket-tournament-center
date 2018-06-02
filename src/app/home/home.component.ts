import { Component, OnInit, OnDestroy } from '@angular/core';

import { MockMatchService } from "./../mock-services/mock-match.service";
import { Match } from '../mock-services/match.model';
import { Router, NavigationEnd, Event, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  title = "Vikram's Match Center";
  varTime: string;
  typeOfMatches: any[] = [];
  onGoingMatches: Match[] = [];
  upComingMatches: Match[] = [];
  finishedMatches: Match[] = [];

  matchSubscription: Subscription;

  constructor(private _matchService: MockMatchService, private _router: Router, private _route: ActivatedRoute){
    console.log("home.component: constructor");
  }

  ngOnInit(): void {
    console.log("home.component: ngOnInit");
    // this.items = ['Live score here', 'recent results here', 'upcoming matches here'];
    let tempInstance = this;
    this._route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.refresh();
        return null;
      })
    );

    this.refresh();
  }

  scoreCardClicked(match: Match){
    console.log(match.id);
    this._router.navigate(["/edit-score", match.id]);
    // this._router.navigate(["/full-score-card", match.id]);
  }

  refresh(){
    console.log("in home component refresh");
    this.varTime = Date().toString();
    let tempInstance = this;
    
    try {
      this.matchSubscription.unsubscribe();
    }catch(e){
      console.log("Match subscription unsubscribe error caught ");
    }
    // this.matchSubscription = this._matchService.getMatches().subscribe(data => {
    //   console.log("in home component, subscribe getmatches");
    //   tempInstance.onGoingMatches = [];
    //   tempInstance.onGoingMatches = data;
    // });

    this.matchSubscription = this._matchService.matchSubject.subscribe(data => {
      tempInstance.onGoingMatches = [];
      tempInstance.onGoingMatches = tempInstance._matchService.matchesArray;
    })

    // this._matchService.getMatches().forEach(data => {
    //   console.log("in home component, foreach getmatches");
    //   tempInstance.onGoingMatches = data;
    //   tempInstance.finishedMatches = data;
    //   tempInstance.upComingMatches = data;
    // });

    // this.matchSubscription = this._matchService.getMatchesWithValueChanges().subscribe(data => {
    //   // console.log("in home component, valuchanges");
    //   tempInstance.onGoingMatches = [];
    //   tempInstance.onGoingMatches = data;
    // });
  }

  ngOnDestroy(){
    try{
      this.matchSubscription.unsubscribe();
    }catch(e){
      //do nothing
    }
  }
}
