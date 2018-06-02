import { Player } from "./player";

export class Team {
    fullName: string;
    shortName: string;
    players: Player[];
    id: number;
    logo: string;

    constructor(id: number, fullName:string, shortName: string, players: Player[]){
        this.id = id;
        this.fullName = fullName;
        this.shortName = this.shortName;
        this.players = this.players;
    }
}