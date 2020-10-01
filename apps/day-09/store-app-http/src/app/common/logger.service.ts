import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(message: string) {
    console.log('LoggerService.log():', message);
  }
}

// 1000 lines of code - webpack