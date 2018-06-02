import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { HomeComponent }   from "./home/home.component";
import { NewMatchComponent }   from "./match/new-match/new-match.component";
import { EditScoreComponent } from "./score/edit_score/edit-score.component";
import { FullScoreCardComponent } from './score/full-score-card/full-score-card.component';

const appRoutes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    // { path: "", redirectTo: "full-score-card", pathMatch: "full" },
    // { path: "items", component: ItemsComponent },
    // { path: "item/:id", component: ItemDetailComponent },
    { path: "home", component: HomeComponent },
    // { path: "match", component: MatchScoreCardComponent },
    { path: "edit-score/:matchId", component: EditScoreComponent },
    { path: "full-score-card/:matchId", component: FullScoreCardComponent },
    // { path: "full-score-card", component: FullScoreCardComponent },
    // { path: "toggler", component: TogglerComponent },
    { path: "create_match", component: NewMatchComponent }
    // { path: "create_team", component: NewTeamComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}