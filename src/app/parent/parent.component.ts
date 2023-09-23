import { Component, OnInit, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { TransactionService } from '../transaction.service';
import { interval, mergeMap, of } from 'rxjs';
import { ChildObj } from '../child/child';
;

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  childMessage!: string;
  child1Name: string = 'Jack';
  child1Money: number = 10;
  child2Name: string = 'Jill';
  child2Money: number = 15;

  @ViewChild('child1') child1!: ChildComponent;
  @ViewChild('child2') child2!: ChildComponent;
  selectedLayout: string = 'row'; 

  children: ChildObj[] = [
    new ChildObj(1, 'a'),
    new ChildObj(2, 'b'),
    new ChildObj(3, 'c'),
  ];
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {

    let a1 = [{a:1, b:'a', f:false}, {a:2, b:'b'}, {a:3, c:'c', f:0}];

a1.forEach(x => {
  if (!x.hasOwnProperty('b')) {
    x.b = 'A';
  }
  if (!x.hasOwnProperty('f')) {
    x.f = x.f === false ? false : 0; 
  }
});

let b1 = [{ a: 1, b: 'a' }, { a: 2, b: 'b' }, { a: 3, c: 'c' }];
let b2 = b1.map(x => ({ ...x, a: x.a + 1 })); 

console.log(b1); 
console.log(b2); 

    this.sendMoneyAutomatically();
  }

  receiveMessage(message: string): void {
    this.childMessage = message;
  }

  giveMoneyToChild1(): void {
    this.child1Money += 5;
  }

  giveMoneyToChild2(): void {
    this.child2Money += 5;
  }

  getMoneyFromChild1(): void {
    this.child1.getMoney();
  }

  getMoneyFromChild2(): void {
    this.child1.getMoney();
  }
  sendMoneyToChild1(): void {
    if (this.child1Money >= 10) {
      this.child1Money -= 10;
      this.child1.getMoneyFromParent(); 
    }
  }

  sendMoneyToChild2(): void {
    if (this.child2Money >= 10) {
      this.child2Money -= 10;
      this.child2.getMoneyFromParent();
    }
  }

  receiveMoneyFromChild(amount: number) {
    this.transactionService.receiveMoney(amount);
  }

   sendMoneyAutomatically() {
    interval(60000)
      .pipe(
        mergeMap(() => {
          const amountToSend = 10;
          if (this.transactionService.moneySubject.value >= amountToSend) {
            this.sendMoneyToChild(this.child1, amountToSend);
          }
          return of(null);
        })
      )
      .subscribe();
  }
  sendMoneyToChild(child: ChildComponent, amount: number) {
    if (this.transactionService.moneySubject.value >= amount) {
      child.receiveMoney(amount);
      this.transactionService.sendMoney(amount);
    }
  }

  
}
