import {BallProperty} from "./ball-property"

export class Ball {

    ballType: BallProperty;
    wkt: BallProperty;
    run: BallProperty;

    initiateBall(){
        this.ballType = new BallProperty([
            {"text": "Wide", "value": "wide", selected: false, "selectClass": "btn-danger", "unSelectClass": "btn-default"},
            {"text": "Okay", "value": "okay", selected: false, "selectClass": "btn-primary", "unSelectClass": "btn-default"},
            {"text": "No", "value": "no", selected: false, "selectClass": "btn-danger", "unSelectClass": "btn-default"}
        ],1);

        this.wkt = new BallProperty([
            {"text": "Out", "value": "out", selected: false, "selectClass": "btn-danger", "unSelectClass": "btn-default"},
            {"text": "Not Out", "value": "notOut", selected: false, "selectClass": "btn-success", "unSelectClass": "btn-default"}
        ], 1);

        let tempRunArray: any[] = [];
        for (let i=0; i<7; i++){
            tempRunArray.push({"text": i, "value": i, "selectClass": "btn-warning"});
            if (i>=4){
                tempRunArray[i].selectClass = "btn-success";
            }
        }
        this.run = new BallProperty(tempRunArray, 0);
    }

    constructor(){
        this.initiateBall();
    }

}