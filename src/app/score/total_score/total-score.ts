import { Ball } from "./../ball/ball";

export class TotalScore {
    id: number;
    allBallS: Ball[] = [];
    runs: number = 0;
    wickets: number = 0;
    balls: number = 0;
    ballsOfCurrentOver: number = 0;
    overs: number = 0;

    constructor() {}

    addBall(newBall: Ball) {
        this.allBallS.push(newBall);
        this.runs = this.runs + newBall.run.selectedElement.value;
        this.runs = this.runs + (newBall.ballType.selectedElement.value != 'okay' ? 1 : 0);
        this.balls = this.balls + (newBall.ballType.selectedElement.value === 'okay' ? 1 : 0);
        this.wickets = this.wickets + (newBall.wkt.selectedElement.value === 'out' ? 1 : 0);
        this.updateOvers();
    }

    updateOvers() {
        this.overs = Math.floor(this.balls / 6);
        this.ballsOfCurrentOver = this.balls % 6;
    }
    
}