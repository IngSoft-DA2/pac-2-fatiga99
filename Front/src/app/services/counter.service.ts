import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private counter = 0;

  increment(): void {
    this.counter++;
  }

  getCount(): number {
    return this.counter;
  }

  reset(): void {
    this.counter = 0;
  }
}

