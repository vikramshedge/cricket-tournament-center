import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatchDetails } from "./../match-details";

@Component({
    selector: "match-score-card",
    templateUrl: "./match-score-card.component.html",
    styleUrls: ['./match-score-card.component.css'],
    inputs: ['matchDetails']
})

export class MatchScoreCardComponent implements OnInit {

    matchDetails: MatchDetails;
    @Output() tap: EventEmitter<any> = new EventEmitter();
    
    ngOnInit() {
        
    }

    clickEventHandler(event){
        this.tap.emit(this);
        console.log("Score card clicked");
    }
}