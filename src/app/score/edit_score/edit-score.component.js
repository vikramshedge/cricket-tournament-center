"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ball_1 = require("./../ball/ball");
var total_score_1 = require("./../total_score/total-score");
var match_service_1 = require("./../../services/match.service");
var score_service_1 = require("./../../services/score.service");
var EditScoreComponent = (function () {
    function EditScoreComponent(_matchService, _scoreService, route) {
        this._matchService = _matchService;
        this._scoreService = _scoreService;
        this.route = route;
    }
    EditScoreComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("In edit score component");
        this.matchId = this.route.snapshot.params['matchId'];
        var tmpVar = this._matchService.getMatch(this.matchId).then(function (match) {
            _this.matchDetails = match;
            if (_this.matchDetails.balls.length > 0) {
                _this.currentBall = _this.matchDetails.balls[_this.matchDetails.balls.length - 1];
            }
            else {
                console.log("Creating new ball");
                _this.currentBall = new ball_1.Ball();
            }
            _this.getCurrentTeam();
            _this.calculatePreviewScore();
        }).catch(function (error) {
            console.log("Unable to get match details in edit score: " + error);
        });
    };
    EditScoreComponent.prototype.ballTypeToggled = function (event) {
        this.calculatePreviewScore();
    };
    EditScoreComponent.prototype.wicketToggled = function (event) {
        this.calculatePreviewScore();
    };
    EditScoreComponent.prototype.runToggled = function (event) {
        this.calculatePreviewScore();
    };
    EditScoreComponent.prototype.calculatePreviewScore = function () {
        this.previewScore = new total_score_1.TotalScore();
        this.previewScore.balls = this.battingScore.balls;
        this.previewScore.ballsOfCurrentOver = this.battingScore.ballsOfCurrentOver;
        this.previewScore.overs = this.battingScore.overs;
        this.previewScore.runs = this.battingScore.runs;
        this.previewScore.wickets = this.battingScore.wickets;
        this.previewScore.addBall(this.currentBall);
    };
    EditScoreComponent.prototype.submitCurrentBall = function () {
        this.battingScore.addBall(this.currentBall);
        this._scoreService.updateScore(this.battingScore);
        this.currentBall = new ball_1.Ball();
        this.calculatePreviewScore();
    };
    EditScoreComponent.prototype.getCurrentTeam = function () {
        if (this.matchDetails.scoreA.overs < this.matchDetails.totalOver) {
            this.battingTeam = this.matchDetails.teamA;
            this.battingScore = this.matchDetails.scoreA;
            this.bowlingTeam = this.matchDetails.teamB;
            this.bowlingScore = this.matchDetails.scoreB;
        }
        else {
            this.battingTeam = this.matchDetails.teamB;
            this.battingScore = this.matchDetails.scoreB;
            this.bowlingTeam = this.matchDetails.teamA;
            this.bowlingScore = this.matchDetails.scoreA;
        }
    };
    EditScoreComponent.prototype.ngOnChanges = function (changes) {
    };
    return EditScoreComponent;
}());
EditScoreComponent = __decorate([
    core_1.Component({
        selector: "edit-score",
        moduleId: module.id,
        templateUrl: "./edit-score.component.html",
        styleUrls: ['./edit-score.component.css']
    }),
    __metadata("design:paramtypes", [match_service_1.MatchService, score_service_1.ScoreService, router_1.ActivatedRoute])
], EditScoreComponent);
exports.EditScoreComponent = EditScoreComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zY29yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlZGl0LXNjb3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRTtBQUMzRSwwQ0FBaUQ7QUFFakQsdUNBQXNDO0FBR3RDLDREQUEwRDtBQUUxRCxnRUFBOEQ7QUFDOUQsZ0VBQThEO0FBUzlELElBQWEsa0JBQWtCO0lBVTNCLDRCQUFvQixhQUEyQixFQUFVLGFBQTJCLEVBQVUsS0FBcUI7UUFBL0Ysa0JBQWEsR0FBYixhQUFhLENBQWM7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO0lBQUUsQ0FBQztJQUV0SCxxQ0FBUSxHQUFSO1FBQUEsaUJBa0JDO1FBakJHLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBbUI7WUFDNUUsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFFMUIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENB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SUFDbEMsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FBQyxBQWhGRCxJQWdGQztBQWhGWSxrQkFBa0I7SUFQOUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRyxZQUFZO1FBQ3ZCLFFBQVEsRUFBRyxNQUFNLENBQUMsRUFBRTtRQUNwQixXQUFXLEVBQUUsNkJBQTZCO1FBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0tBQzVDLENBQUM7cUNBWXFDLDRCQUFZLEVBQXlCLDRCQUFZLEVBQWlCLHVCQUFjO0dBVjFHLGtCQUFrQixDQWdGOUI7QUFoRlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLy4uL2JhbGwvYmFsbFwiO1xyXG5pbXBvcnQgeyBNYXRjaERldGFpbHMgfSBmcm9tIFwiLi8uLi8uLi9tYXRjaC9tYXRjaC1kZXRhaWxzXCI7XHJcbmltcG9ydCB7IFRlYW0gfSBmcm9tIFwiLi8uLi8uLi90ZWFtL3RlYW1cIjtcclxuaW1wb3J0IHsgVG90YWxTY29yZSB9IGZyb20gXCIuLy4uL3RvdGFsX3Njb3JlL3RvdGFsLXNjb3JlXCI7XHJcblxyXG5pbXBvcnQgeyBNYXRjaFNlcnZpY2UgfSBmcm9tIFwiLi8uLi8uLi9zZXJ2aWNlcy9tYXRjaC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNjb3JlU2VydmljZSB9IGZyb20gXCIuLy4uLy4uL3NlcnZpY2VzL3Njb3JlLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3IgOiBcImVkaXQtc2NvcmVcIixcclxuICAgIG1vZHVsZUlkIDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9lZGl0LXNjb3JlLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9lZGl0LXNjb3JlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEVkaXRTY29yZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBjdXJyZW50QmFsbDogQmFsbDtcclxuICAgIG1hdGNoSWQ6IG51bWJlcjtcclxuICAgIG1hdGNoRGV0YWlsczogTWF0Y2hEZXRhaWxzO1xyXG4gICAgYmF0dGluZ1RlYW06IFRlYW07XHJcbiAgICBiYXR0aW5nU2NvcmU6IFRvdGFsU2NvcmU7XHJcbiAgICBib3dsaW5nVGVhbTogVGVhbTtcclxuICAgIGJvd2xpbmdTY29yZTogVG90YWxTY29yZTtcclxuICAgIHByZXZpZXdTY29yZTogVG90YWxTY29yZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXRjaFNlcnZpY2U6IE1hdGNoU2VydmljZSwgcHJpdmF0ZSBfc2NvcmVTZXJ2aWNlOiBTY29yZVNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKXt9XHJcblxyXG4gICAgbmdPbkluaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkluIGVkaXQgc2NvcmUgY29tcG9uZW50XCIpO1xyXG4gICAgICAgIHRoaXMubWF0Y2hJZCA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zWydtYXRjaElkJ107XHJcbiAgICAgICAgbGV0IHRtcFZhciA9IHRoaXMuX21hdGNoU2VydmljZS5nZXRNYXRjaCh0aGlzLm1hdGNoSWQpLnRoZW4oKG1hdGNoOiBNYXRjaERldGFpbHMpPT57XHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2hEZXRhaWxzID0gbWF0Y2g7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5tYXRjaERldGFpbHMuYmFsbHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QmFsbCA9IHRoaXMubWF0Y2hEZXRhaWxzLmJhbGxzW3RoaXMubWF0Y2hEZXRhaWxzLmJhbGxzLmxlbmd0aC0xXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgbmV3IGJhbGxcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCYWxsID0gbmV3IEJhbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5nZXRDdXJyZW50VGVhbSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVByZXZpZXdTY29yZSgpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmFibGUgdG8gZ2V0IG1hdGNoIGRldGFpbHMgaW4gZWRpdCBzY29yZTogXCIrZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJhbGxUeXBlVG9nZ2xlZChldmVudDogYW55KXtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVByZXZpZXdTY29yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHdpY2tldFRvZ2dsZWQoZXZlbnQ6IGFueSl7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVQcmV2aWV3U2NvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBydW5Ub2dnbGVkKGV2ZW50OiBhbnkpe1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlUHJldmlld1Njb3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlUHJldmlld1Njb3JlKCl7XHJcbiAgICAgICAgdGhpcy5wcmV2aWV3U2NvcmUgPSBuZXcgVG90YWxTY29yZSgpO1xyXG4gICAgICAgIHRoaXMucHJldmlld1Njb3JlLmJhbGxzID0gdGhpcy5iYXR0aW5nU2NvcmUuYmFsbHM7XHJcbiAgICAgICAgdGhpcy5wcmV2aWV3U2NvcmUuYmFsbHNPZkN1cnJlbnRPdmVyID0gdGhpcy5iYXR0aW5nU2NvcmUuYmFsbHNPZkN1cnJlbnRPdmVyO1xyXG4gICAgICAgIHRoaXMucHJldmlld1Njb3JlLm92ZXJzID0gdGhpcy5iYXR0aW5nU2NvcmUub3ZlcnM7XHJcbiAgICAgICAgdGhpcy5wcmV2aWV3U2NvcmUucnVucyA9IHRoaXMuYmF0dGluZ1Njb3JlLnJ1bnM7XHJcbiAgICAgICAgdGhpcy5wcmV2aWV3U2NvcmUud2lja2V0cyA9IHRoaXMuYmF0dGluZ1Njb3JlLndpY2tldHM7XHJcblxyXG4gICAgICAgIHRoaXMucHJldmlld1Njb3JlLmFkZEJhbGwodGhpcy5jdXJyZW50QmFsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0Q3VycmVudEJhbGwoKSB7XHJcbiAgICAgICAgdGhpcy5iYXR0aW5nU2NvcmUuYWRkQmFsbCh0aGlzLmN1cnJlbnRCYWxsKTtcclxuICAgICAgICB0aGlzLl9zY29yZVNlcnZpY2UudXBkYXRlU2NvcmUodGhpcy5iYXR0aW5nU2NvcmUpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEJhbGwgPSBuZXcgQmFsbCgpO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlUHJldmlld1Njb3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudFRlYW0oKXtcclxuICAgICAgICBpZiAodGhpcy5tYXRjaERldGFpbHMuc2NvcmVBLm92ZXJzIDwgdGhpcy5tYXRjaERldGFpbHMudG90YWxPdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGluZ1RlYW0gPSAgdGhpcy5tYXRjaERldGFpbHMudGVhbUE7XHJcbiAgICAgICAgICAgIHRoaXMuYmF0dGluZ1Njb3JlID0gIHRoaXMubWF0Y2hEZXRhaWxzLnNjb3JlQTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYm93bGluZ1RlYW0gPSAgdGhpcy5tYXRjaERldGFpbHMudGVhbUI7XHJcbiAgICAgICAgICAgIHRoaXMuYm93bGluZ1Njb3JlID0gIHRoaXMubWF0Y2hEZXRhaWxzLnNjb3JlQjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmJhdHRpbmdUZWFtID0gIHRoaXMubWF0Y2hEZXRhaWxzLnRlYW1CO1xyXG4gICAgICAgICAgICB0aGlzLmJhdHRpbmdTY29yZSA9ICB0aGlzLm1hdGNoRGV0YWlscy5zY29yZUI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJvd2xpbmdUZWFtID0gIHRoaXMubWF0Y2hEZXRhaWxzLnRlYW1BO1xyXG4gICAgICAgICAgICB0aGlzLmJvd2xpbmdTY29yZSA9ICB0aGlzLm1hdGNoRGV0YWlscy5zY29yZUE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIH1cclxufSJdfQ==