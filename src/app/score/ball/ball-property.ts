export class BallProperty {
    elementList: PropertyElement[] = [];
    selectedElement: PropertyElement;
    selectedIndex: number;

    constructor(list: any[], index: number){
        
        if (list.length>0){
            for (let i=0; i<list.length; i++){
                this.elementList.push(new PropertyElement(list[i].text, list[i].value, list[i].selectClass));
            }
            this.selectProperty(index);
        }
    }

    selectProperty(index: number){
        this.selectedIndex = index;
        this.selectedElement = this.elementList[index];
        for (let i=0; i<this.elementList.length; i++){
            this.elementList[i].isSelected = (i===index);
        }
    }
}

export class PropertyElement {
    text: string;
    value: any;
    isSelected: boolean;
    selectClass: string;
    unSelectClass: string;

    constructor(text: string, value: any, selectClass: string){
        this.text = text;
        this.value = value;
        this.isSelected = false;
        this.selectClass = selectClass;
        this.unSelectClass = 'btn-default';
    }
}