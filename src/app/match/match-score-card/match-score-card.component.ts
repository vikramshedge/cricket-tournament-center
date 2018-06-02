import { Component, OnInit, Output, EventEmitter, SimpleChanges, OnChanges } from "@angular/core";
import { Match } from "../../mock-services/match.model";
import { MockMatchService } from "../../mock-services/mock-match.service";

@Component({
    selector: "match-score-card",
    templateUrl: "./match-score-card.component.html",
    styleUrls: ['./match-score-card.component.css'],
    inputs: ['match']
})

export class MatchScoreCardComponent implements OnInit {

    matchId: String = "0";
    matches: Match[] = [];
    match: Match = null;

    @Output() tap: EventEmitter<any> = new EventEmitter();
    
    constructor(private _matchService: MockMatchService){
        // console.log("match-score-card.component: constructor");
    }
    
    ngOnInit() {
        // console.log("match-score-card.component: ngOnInit");
        /* this._matchService.getMatches().subscribe(data => {
            this.matches = data;
            this.initializeMatch();
        }); */
    }

    initializeMatch(): void {
        for (let i = 0; i < this.matches.length; i++){
            if (this.matchId == this.matches[i].id){
                this.match = this.matches[i];
                console.log(this.match.summary);
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        // console.log("match-score-card.component: ngOnChanges");
        if (changes){
            if (changes['match']) {
                if (changes['match'].currentValue) {
                    this.match = changes['match'].currentValue;
                    // this.initializeMatch();
                }
            }
        } 
    }

    clickEventHandler(event){
        this.tap.emit(this);
        console.log("Score card clicked");
    }
}