import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {
  @Input() childName!: string;
  @Input() childMoney!: number;
  @Output() messageEvent = new EventEmitter<string>();
  @Output() getMoneyEvent = new EventEmitter<void>(); 
  @Output() sendMoneyEvent = new EventEmitter<number>();
  @Output() receiveMoneyEvent = new EventEmitter<number>();


  getMoneyFromParent(): void {
    this.getMoneyEvent.emit();
  }

  getMoney(): void {
    if (this.childMoney >= 10) {
      this.childMoney -= 10;
    }
  }
  
  sendMessage(): void {
    this.messageEvent.emit('Hello from the Child Component!');
  }

  sendMoney(amount: number) {
    this.sendMoneyEvent.emit(amount);
  }

  receiveMoney(amount: number) {
    this.receiveMoneyEvent.emit(amount);
  }
}
