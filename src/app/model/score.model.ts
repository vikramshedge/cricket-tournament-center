import { Ball } from "../score/ball/ball";

export class Score {

    id: string;
    allBallS: string[];
    runs: number;
    wickets: number;
    balls: number;
    ballsOfCurrentOver: number;
    over: number;

    constructor(){
        this.runs = 0;
        this.wickets = 0;
        this.balls = 0;
        this.ballsOfCurrentOver = 0;
        this.over = 0;
    }

}
