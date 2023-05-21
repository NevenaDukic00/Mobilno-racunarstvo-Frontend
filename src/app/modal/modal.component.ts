import { Component, Input, OnInit, Output} from "@angular/core";
import { ModalController } from "@ionic/angular";
import { EventEmitter } from "stream";

@Component({
    selector: 'app-modal',
    templateUrl:`modal.component.html`
})

export class ModalComponent{

    // @Output() priceFromModul = new EventEmitter<{ticketPrice:Number}>();
    price: Number;

    constructor(private modalCont: ModalController){}

    confirm(){
        console.log("Iz Modala se salje za home cena: ", this.price);
        // this.priceFromModul.emit({ticketPrice: this.price});
        this.modalCont.dismiss({
            price: this.price
        });
        //return this.modalCont.dismiss(this.price, 'confirm');
    }


    cancel(){
        return this.modalCont.dismiss(null, 'cancel');
    }
}