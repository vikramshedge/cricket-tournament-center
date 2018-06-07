import { Ball } from "../score/ball/ball";
import { BallModel } from "./ball.model";

export class Match {
    id: string;
    contestId: string;
    teamAid: string;
    teamBid: string;
    scoreAid: string;
    scoreBid: string;
    summary: string;
    isStarted: boolean;
    isEnded: boolean;
    balls: BallModel[];
    time: string;
    isTeamABatFirst: boolean;
    totalOvers: number;
}
