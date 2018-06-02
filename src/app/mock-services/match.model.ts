import { Ball } from "../score/ball/ball";

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
    balls: Ball[];
    time: string;
    isTeamABatFirst: boolean;
    totalOvers: number;
}
