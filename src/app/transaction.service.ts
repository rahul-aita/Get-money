import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  public moneySubject = new BehaviorSubject<number>(0);

  constructor() {}

  money$: Observable<number> = this.moneySubject.asObservable();

  sendMoney(amount: number) {
    this.moneySubject.next(this.moneySubject.value - amount);
  }


  receiveMoney(amount: number) {
    this.moneySubject.next(this.moneySubject.value + amount);
  }
}
