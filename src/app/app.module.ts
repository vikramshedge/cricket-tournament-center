import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';  



//functional components
// import { ItemsComponent } from "./item/items.component";
// import { ItemDetailComponent } from "./item/item-detail.component";
import { HomeComponent } from "./home/home.component";
import { MatchScoreCardComponent } from "./match/match-score-card/match-score-card.component";
import { ScoreBoardComponent } from "./score/score_board/score-board.component";
import { EditScoreComponent } from "./score/edit_score/edit-score.component";
// import { TogglerComponent } from "./components/toggler/toggler.component";
import { NewMatchComponent } from "./match/new-match/new-match.component";
// import { NewTeamComponent } from "./team/new-team.component";
// import { ModalViewComponent } from "./modal/modal-view.component";

//services
// import { ItemService } from "./item/item.service";
// import { ScoreService } from "./services/score.service";
// import { TeamService } from "./services/team.service";
// import { BallService } from "./services/ball.service";
// import { DbService } from "./services/db.service";
// import { MatchService } from "./services/match.service";

//moc services
import {MockScoreService} from "./mock-services/mock-score.service";
import {MockMatchService} from "./mock-services/mock-match.service";
import {MockTeamService} from "./mock-services/mock-team.service";


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    // ItemsComponent,
    // ItemDetailComponent,
    HomeComponent,
    MatchScoreCardComponent,
    ScoreBoardComponent,
    EditScoreComponent,
    // TogglerComponent,
    NewMatchComponent,
    // NewTeamComponent,
    // ModalViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
    // NgbModule.forRoot(),
  ],
  providers: [
    // ItemService,
    // MatchService,
    // ScoreService,
    // ModalDialogService,
    // TeamService,
    // DbService,
    MockScoreService,
    MockMatchService,
    MockTeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
